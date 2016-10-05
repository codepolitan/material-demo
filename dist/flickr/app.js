'use strict';

var	Emitter = require("material/lib/module/emitter");

//var Controller = require('material/lib/module/controller.js');
// main component
var Component = require('material/lib/component.js');
var defaults = require('./options');

// var Container = require('material/lib/container.js');
var Layout = require('material/lib/layout.js');
var List = require('material/lib/list.js');

// controls
var Button = require('material/lib/control/button.js');

/**
 * @class
 */
class Demo extends Emitter{

	//mixin: [Options, Emitter],

	/**
	 * @constructor
	 * @param  {Object} options - The application options
	 * @return {Object} this
	 */
	constructor(options) {
		super();

		//console.log('ready', document.body);
		this.options = [ defaults, options ].reduce(Object.assign, {});

		this.layout = new Layout(this.options.layout).insert(document.body);
		this.initNaviView();
		this.initMainView();
		
		this.initData((list) => {
			console.log(list.photos.photo.length);
			this.mainView.set('list', list.photos.photo);
		});
	}

	/**
	 * [initData description]
	 * @return {[type]} [description]
	 */
	initData(callback) {
		console.log('initData');

		var flickrAPI = "";
		flickrAPI += "https://api.flickr.com/services/rest/?";
		flickrAPI += "&method=flickr.photos.search";
		flickrAPI += "&api_key=9012151640d5486e63780579ff3b9cae";
		flickrAPI += "&tags=Altuve";
		flickrAPI += "&per_page=5";
		flickrAPI += "&page=1";
		flickrAPI += "&format=json";

		// UPDATE: Request plain old JSON
		flickrAPI += "&nojsoncallback=1";

		var xhr= new XMLHttpRequest();
		xhr.open("GET", flickrAPI, true);
		xhr.send();

		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
				var object = JSON.parse(xhr.responseText);
				console.log('xhr response', object);
				callback(object);
			} 
		};
	}

	/**
	 * [initNaviView description]
	 * @return {Object} this - This class instance
	 */
	initNaviView() {
		var navi = this.layout.navi;
		var head = this.layout.c.head;

		var toolbar = new Component({
			class: 'ui-toolbar'
		}).insert(head);

		let button = new Button({
			icon: 'mdi-navigation-menu',
			type: 'action',
			label: null
		}).insert(toolbar);

		button.on('press', function(e) {
			console.log('press', e);
			navi.toggle(e);
		});

		this.initNaviList();
	}

	/**
	 * Init Navigation view
	 * @return {Object} this - This class instance
	 */
	initNaviList() {

		var listView = new List({
			component: ['head', 'body'],
			container: this.layout.navi.c.body,
			render: function(info) {
				//console.log('render', info);
				var item;

				if (info.type === 'separator') {
					item = new Component({
						css: 'ui-separator'
					});
				} else {
					item = new Button({
						label: info.name,
						icon: info.icon,
						css: 'icon-text'
					});
				}

				return item;
			}
		});

		listView.set('list', [
			{ name: 'Inbox', icon: 'mdi-content-inbox' },
			{ name: 'Snoozed', icon: 'mdi-action-query-builder' },
			{ name: 'Done', icon: 'mdi-action-done' },
			{ type: 'separator' },
			{ name: 'Draft', icon: 'mdi-content-draft' },
			{ name: 'Sent', icon: 'mdi-content-send' }
		]);

		listView.on('selected', function(item) {
			console.log('item selected', item);
		});

		return this;
	}

	/**
	 * initSideView
	 * @return {instance} The class instance
	 */
	initMainView() {
		this.mainView = new List({
			component: ['head', 'body'],
			container: this.layout.main.c.body,
			render: function(info) {
				//console.log('render', info);
				var item;

				if (info.type === 'separator') {
					item = new Component({
						css: 'ui-separator'
					});
				} else {
					item = new Button({
						label: info.title,
						css: 'icon-text'
					});
				}

				return item;
			}
		});

		return this;
	}
}

module.exports = Demo;
