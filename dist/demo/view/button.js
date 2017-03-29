'use strict';

// controls
import Layout from 'material/src/layout.js';
import Container from 'material/src/container.js';
import Component from 'material/src/Component.js';
import Text from 'material/src/text.js';

import Button from 'material/src/control/button.js';
// import Field from 'material/src/control/textfield';
// import Switch from 'material/src/control/switch.js';
// import Checkbox from 'material/src/control/checkbox.js';
// import Slider from 'material/src/control/slider.js';


/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {

  console.log('container', body);

  var layout = new Layout({
    name: 'demo-button',
    components: [{
      component: Container,
      name: 'buttons',
      components: [{
        component: Text,
        type: 'title',
        text: 'Button'
      }, {
        name: 'buttons-container',
        component: Container,
        components: [{
          name: 'click',
          component: Button,
          type: 'title',
          text: 'Default'
        }, {
          component: Button,
          text: 'Raised',
          options: {
            type: 'raised'
          }
        }, {
          component: Button,
          text: 'Dense Default'
        }]
      }]
    }, {
      component: Container,
      name: 'buttons',
      components: [{
        component: Text,
        type: 'title',
        text: 'Button'
      }, {
        name: 'buttons-container',
        component: Container,
        components: [{
          component: Button,
          type: 'title',
          text: 'Default'
        }, {
          component: Button,
          text: 'Raised',
          options: {
            type: 'raised'
          }
        }, {
          component: Button,
          text: 'Dense Default'
        }]
      }]
    }]
  }).insert(body);

  layout.component.click.on('press', function() {
    console.log('switch state', alert('hello'));
  });


  // var button1 = new Button({
  //   name: 'hello',
  //   //type: 'action',
  //   label: 'Flat'
  // }).insert(body);

  // console.log('button1', button1);

  // new Button({
  //   label: 'Raised',
  //   type: 'raised',
  //   primary: true
  // }).on('press', function(e) {
  //   console.log('press', e);
  //   // fieldIdx++;
  //   // new Field({
  //   //   label: 'field' + fieldIdx,
  //   //   name: 'field'
  //   // }).insert(body);

  // }).insert(body);

  // new Button({
  //   icon: 'mdi-content-inbox',
  //   label: 'Inbox',
  //   css: 'icon-text'
  // }).insert(body);

  // console.log('---', button1);

  // new Button({
  //   icon: 'mdi-content-send',
  //   type: 'action'
  // }).insert(body);

};
