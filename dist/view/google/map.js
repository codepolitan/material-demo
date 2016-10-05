/*
	Script: Map.js
		Encapsulate Google Map
 */

/**
* Search List Class
*
* @class list.search
* @extends {View}
* @author Jerome Vial
*/"use strict"

var prime = require('prime/index'),
	Google = require('./google'),
	Options = require('prime-util/prime/options'),
	Emitter = require("prime/emitter"),
	merge = require("deepmerge");

var _log = __debug('material:view-google-map');
	_log.defineLevel('DEBUG');

var Map = new prime({

	inherits: Google,

	mixin: [Emitter, Options],

	name: 'map',

	options: {
		name: 'map',
		prefix: 'ui-',
		base: 'view',
		content: true,
		zoom: 16,
		tag: 'div',
		coor: {
			lat: '46.799404',
			lng: '7.149892'
		}
	},

	/**
	 * [constructor description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	constructor: function(options){
		_log.debug('constructor', options);
		this.options = merge(Map.parent.options, this.options);
		this.setOptions(options);

		_log.debug('options', this.options);

		this.init();
		
		// if (this.options.bind) {
		// 	this.bind(this.options.bind);
		// }

		return this;
	},

	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	init: function() {
		_log.debug('init', this.container);

		Map.parent.init.call(this);

		window.initializeGoogleMap = this.build.bind(this);

		if (!document.getElementById("google#map")) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.id = 'google#map';
			script.src = 'https://maps.googleapis.com/maps/api/js?callback=initializeGoogleMap';
			document.body.appendChild(script);
		}

		return this;
	},

	/**
	 * [_initMap description]
	 * @return {[type]} [description]
	 */
	build: function() {
		_log.debug('build', this);

		Map.parent.build.call(this);

		var self = this,
			opts = this.options;

		console.log('window.google', window.google, this.c.body.dom);

		var container = this.element.dom[0];

		console.log('map container', container);

		var mapOptions = {
			zoom: opts.zoom,
			center: new window.google.maps.LatLng(opts.coor.lat, opts.coor.lng),
			sensor: false,
			mapTypeId: window.google.maps.MapTypeId.ROADMAP
		};

		this.map = new window.google.maps.Map(container, mapOptions);

		this.marker = new window.google.maps.Marker({
			position: self.map.getCenter(),
			map: self.map,
			draggable: true,
			title: 'Click to zoom'
		});

		window.google.maps.event.addListener(this.marker, 'dragend', function() {
			_log.debug('end');
		});

		this.on('resize', function() {
			_log.debug('resize');

			window.google.maps.event.trigger(self.map, 'resize');
			self.map.setCenter(self.map.getCenter());
		});
	},

	/**
	 * [panTo description]
	 * @param  {[type]} location [description]
	 * @return {[type]}          [description]
	 */
	panTo: function(location) {

		if (!window.google || !window.google.maps || !window.google.maps.LatLng) {
			_log.warn('missing google');
			return;
		}

		var latLng = new window.google.maps.LatLng(location.lat, location.lng);
		this.map.panTo(latLng);
		this.marker.setPosition(latLng);
	},

	/**
	 * [getLocationByAddress description]
	 * @param  {[type]} obj [description]
	 * @return {[type]}     [description]
	 */
	getLocationByAddress: function(obj) {
		_log.debug('getLocationByAddress', obj);

		var self = this;
		var address = null;

		for (var prop in obj) {
			if(obj.hasOwnProperty(prop)) {
				var value = obj[prop];

				if (address) {
					address = address + ', ' + value;
				} else {
					address = value;
				}
			}
		}

		if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
			_log.warn('missing google');
			return;
		}

		_log.info('get location for address', address);

		var geo = new window.google.maps.Geocoder;
		geo.geocode({'address':address}, function(results, status){
			if (status === window.google.maps.GeocoderStatus.OK) {

				var location = {
					lat: results[0].geometry.location.lat(),
					lng: results[0].geometry.location.lng()
				};

				self.panTo(location);
				self.emit('locationUpdated', location);
			} else {
				_log.warn("location not found for:", address);
			}
		});
	}

});

module.exports = Map;
