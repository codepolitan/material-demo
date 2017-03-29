'use strict';

import Emitter from 'material / src /
module/emitter';

import Component from 'material/src/component';
import Item from 'material/src/list/item';
import defaults from './options';

// import Container from 'material/src/container';
import Layout from 'material/src/layout';
import View from 'material/src/view';
import Button from 'material/src/control/button';

// demo
import typography from './view/typography';
import button from './view/button';
import button2 from './view/button2';
import checkbox from './view/checkbox';
import switchc from './view/switch';
import field from './view/field';
import slider from './view/slider';
import list from './view/list';
import form from './view/form';
import tree from './view/tree';

var demos = {
  typography,
  button,
  button2,
  checkbox,
  switch: switchc,
  field,
  slider,
  list,
  form,
  tree
};

/**
 * @class
 */
class Demo {

  /**
   * @constructor
   * @param  {Object} options - The application options
   * @return {Object} this
   */
  constructor(options) {
    this.options = [defaults, options].reduce(Object.assign, {});

    //console.log('ready', document.body);
    this.init(options);

    // this.initDemo(this.layout.component.main);
    // this.controller = new Controller();
  }

  init(options) {
    this.initLayout();
    this.initNaviView();
  }

  initDemo(body) {

    demos.button(body);
  }

  initLayout() {
    this.options.layout.element = document.body;
    this.layout = new Layout(this.options.layout);

    console.log('layout', this.layout);

  }

  /**
   * [initNaviView description]
   * @return {Object} this - This class instance
   */
  initNaviView() {
    var navi = this.layout.component.navi;

    this.layout.component.mainmenu.on('press', function(e) {
      navi.toggle(e);
    });

    this.initNaviList();
  }

  /**
   * Init Navigation view
   * @return {Object} this - This class instance
   */
  initNaviList() {

    var listView = this.layout.component.navi;

    console.log('list object', listView);
    var object = {
      render: (info) => {
        //console.log('render', info);
        var item;

        if (info.type === 'separator') {
          item = new Component({
            class: 'ui-separator'
          });
        } else {
          var item = new Item({
            name: info.name,
            text: info.name
          });
        }

        return item;
      },
      select: (item, ev) => {
        console.log('select', item);
        var name = item.innerText.toLowerCase();
        this.updateDemoView(name);
      }
    }

    Object.assign(listView, object);

    listView.set('list', this.options.components);

    return this;
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


  updateDemoView(name) {
    //console.log('updateDemoView', name);
    this.layout.component.main.empty();

    if (demos[name]) {
      demos[name](this.layout.component.main);
    } else {
      console.info('demo view ' + name + ' not found!');
    }
  }
}

module.exports = Demo;
