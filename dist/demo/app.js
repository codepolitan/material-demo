'use strict';

import Emitter from 'material/lib/module/emitter';

import Component from 'material/lib/component';
import defaults from './options';

// import Container from 'material/lib/container';
import Layout from 'material/lib/layout';
import View from 'material/lib/view';
import List from 'material/lib/list';
import Button from 'material/lib/control/button';

// demo
import button from './view/button';
import checkbox from './view/checkbox';
import switchc from './view/switch';
import field from './view/field';

var demos = {
  button,
  checkbox,
  switch: switchc,
  field
};

/**
 * @class
 */
class Demo extends Emitter {

  /**
   * @constructor
   * @param  {Object} options - The application options
   * @return {Object} this
   */
  constructor(options) {
    super();

    //console.log('ready', document.body);
    this.options = [defaults, options].reduce(Object.assign, {});

    this.layout = new Layout(this.options.layout).insert(document.body);
    this.initNaviView();
    this.initMainView();
    this.initSideView();

    this.initDemo(this.body);

    //this.controller = new Controller();
  }

  initDemo(body) {

    demos.button(body);
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
      render: (info) => {
        //console.log('render', info);
        var item;

        if (info.type === 'separator') {
          item = new Component({
            class: 'ui-separator'
          });
        } else {
          var item = new Button({
            label: info.name,
            icon: info.icon,
            css: 'icon-text'
          }).on('press', () => {
            var name = item.label.text().toLowerCase();
            this.updateDemoView(name);
          });
        }

        return item;
      }
    });

    listView.set('list', this.options.components);

    listView.on('selected', function(item) {
      console.log('item selected', item);
    });

    return this;
  }

  updateDemoView(name) {
    //console.log('updateDemoView', name);
    this.body.empty();

    if (demos[name]) {
      demos[name](this.body);
    }
  }

  /**
   * initSideView
   * @return {instance} The class instance
   */
  initSideView() {
    //console.log('initSideView contact', contactInfo, contactTemplate);

    return this;
  }

  /**
   * [initTest description]
   * @return {instance} The class instance
   */
  initMainView() {
    //return;
    var mainbody = this.layout.main;
    var fieldIdx = 0;

    var view = new View({
      comp: ['body']
    }).insert(mainbody);

    var body = this.body = view.c.body;

    return this;
  }

}

module.exports = Demo;
