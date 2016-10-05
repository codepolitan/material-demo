'use strict';

//var Emitter = require("material/lib/module/emitter");

//var Controller = require('material/lib/module/controller.js');
// main component
var Component = require('material/lib/component.js');
var defaults = require('./options');

// var Container = require('material/lib/container.js');
var Layout = require('material/lib/layout.js');
var View = require('material/lib/view.js');
var List = require('material/lib/list.js');
var Form = require('material/lib/form.js');


// controls
var Button = require('material/lib/control/button.js');
var Switch = require('material/lib/control/switch.js');
// var Item = require('material/lib/item.js');
var Field = require('material/lib/control/field.js');

var contactTemplate = require('../info/contact-template.js');
var contactInfo = require('../info/contact-sample.js');

/**
 * @class
 */
class Demo {

	//mixin: [Options, Emitter],

	/**
	 * @constructor
	 * @param  {Object} options - The application options
	 * @return {Object} this
	 */
	constructor(options) {
		//super();

		this.init(options);

		//this.controller = new Controller();
	}

	/**
	 * init
	 * @return {Object} [description]
	 */
	init(options) {

		//console.log('ready', document.body);
		this.options = [ defaults, options ].reduce(Object.assign, {});

		this.initLayout();
		this.initViews();

		this.initTest();

		//console.log('layout', layout);
	}

	/**
	 * [initLayout description]
	 * @return {Object} this
	 */
	initLayout() {
		//console.log('initLayout', this.options.layout);

		this.layout = new Layout(this.options.layout).inject(document.body);

		return this;
	}

	/**
	 * Initilaize Application Views
	 * @return {Object} This
	 */
	initViews() {
		this.initNaviView();
		this.initSideView();
		//this.initMapView();

		return this;
	}

	/**
	 * [initNaviView description]
	 * @return {Object} this - This class instance
	 */
	initNaviView() {
		var navi = this.layout.navi;
		var head = this.layout.c.head;

		var toolbar = new Component({
			css: 'ui-toolbar'
		}).inject(head);

		var button = new Button({
			icon: 'mdi-navigation-menu',
			type: 'action',
			label: null
		}).on('press', function(e) {
			console.log('toggle', navi, e);
			navi.toggle();
		}).inject(toolbar);

		//console.log('instance', typeof button);

		this.initNaviList();
	}

	/**
	 * [initMapView description]
	 * @return {instance} Map view instance
	 */
	initMapView() {
		var mapView = new Map({
			component: ['head', 'body'],
			container: this.layout.main.c.body,
		});

		return mapView;
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
			//console.log('item selected', item);
		});

		return this;
	}

	/**
	 * initSideView
	 * @return {instance} The class instance
	 */
	initSideView() {
		//console.log('initSideView contact', contactInfo, contactTemplate);

		//console.log(this.layout.side);

		var form = new Form({
			template: contactTemplate,
			component: ['head', 'body'],
			container: this.layout.side.content,
		});

  		form.setInfo(contactInfo);

  		return this;
	}

	/**
	 * [initTest description]
	 * @return {instance} The class instance
	 */
	initTest() {
		//return;
		var mainbody = this.layout.main.content;
		var main = this.layout.main.content;
		var fieldIdx = 0;

		var view = new View({
			comp: ['body']
		}).inject(mainbody);

		var body = view.content;

		var switchControl = new Switch({
			label: 'Switch',
			value: true
		}).on('change',function(value) {
			//console.log('checked', value);
		}).inject(body);

		new Switch({
			label: 'Disabled',
			disabled: true
		}).inject(body);

		new Field({
			label: 'material',
			name: 'field'
		}).inject(body);

		new Button({
			//type: 'action',
			label: 'Flat'
		}).inject(body);

		new Button({
			label: 'Raised',
			type: 'raised',
			primary: true,
			css: 'is-primary'
		}).on('press', function(e) {
			console.log('press', e);
			fieldIdx++;
			var field = new Field({
				label: 'field'+fieldIdx,
				name: 'field'
			}).inject(body);
		}).inject(body);

		new Button({
			icon: 'mdi-content-inbox',
			label: 'Inbox',
			css: 'icon-text'
		}).inject(body);

		var primaryButton = new Button({
			type: 'action',
			primary: true,
			css: 'is-primary'
		}).on('press', function() {
			console.log('switch state', switchControl.get());
		}).inject(body);

		//console.log('---', primaryButton.style());

		new Button({
			icon: 'mdi-content-send',
			type: 'action'
		}).inject(body);

		return this;
	}

}

module.exports = Demo;
