'use strict';

// switch
import Layout from 'material/src/layout.js';
import Container from 'material/src/container.js';

import Switch from 'material/src/control/switch.js';
import Button from 'material/src/control/button.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {

  var layout = new Layout({
    components: [{
      name: 'container',
      component: Container,
      components: [{
        name: 'default',
        component: Switch,
        options: {
          label: 'Switch',
        }
      }, {
        name: 'disabled',
        component: Switch,
        options: {
          label: 'Disabled',
          disabled: true
        }
      }]
    }]
  }).insert(body);

  console.log('layout', layout);
  new Button({
    //primary: true,
    //type: 'raised',
    label: 'toggle',
  }).on('press', function() {
    layout.component.default.toggle();
    console.log('switch state', layout.component.default.get());
  }).insert(layout.component.container);


  new Button({
    //primary: true,
    //type: 'raised',
    label: 'enable',
  }).on('press', function() {
    layout.component.disabled.enable();
  }).insert(layout.component.container);

  new Button({
    //primary: true,
    //type: 'raised',
    label: 'disable',
  }).on('press', function() {
    layout.component.disabled.disable();
  }).insert(layout.component.container);
};
