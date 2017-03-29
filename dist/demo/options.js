'use strict';

import Component from 'material/src/component';
import Button from 'material/src/control/button';
import List from 'material/src/list';
import Text from 'material/src/text';
import Switch from 'material/src/control/switch';
// defaults options

/**
 * Element options
 * @type {Object} The Element default options
 */
var options = {
  layout: {
    component: Component,
    name: 'demo',
    display: 'flex',
    direction: 'vertical',
    components: [{
      name: 'head',
      display: 'flex',

      components: [{
        flex: 1,
        display: 'flex',
        direction: 'horizontal',
        name: 'toolbar',
        component: Component,
        options: {
          class: 'material-toolbar'
        },
        components: [{
          name: 'mainmenu',
          component: Button,
          options: {
            icon: 'mdi-navigation-menu',
            type: 'action',
            label: null
          }
        }, {
          name: 'apptitle',
          component: Text,
          text: 'Material Components',

        }]
      }, {
        name: 'desk',
        component: Component,
        options: {
          class: 'material-toolbar'
        },
        components: [{
          name: 'apps',
          component: Button,
          options: {
            icon: 'mdi-navigation-apps',
            type: 'action',
            label: null
          }
        }, {
          name: 'account',
          component: Button,
          options: {
            icon: 'mdi-action-account',
            type: 'action',
            label: null
          }
        }]
      }]
    }, {
      name: 'body',
      display: 'flex',
      direction: 'horizontal',
      flex: '1',
      components: [{
        name: 'navi',
        component: List,
        size: 320
      }, {
        component: Component,
        name: 'main',
        flex: '1'
      }, {
        component: Component,
        name: 'side',
        //flex: '1',
        size: 320
      }]
    }]
  },
  components: [
    { name: 'Typography', icon: 'mdi-content-inbox' },
    { type: 'separator' },
    { name: 'Button', icon: 'mdi-content-inbox' },
    { name: 'Button2', icon: 'mdi-content-inbox' },
    { name: 'Checkbox', icon: 'mdi-action-done' },
    { name: 'Switch', icon: 'mdi-action-done' },
    { name: 'Field', icon: 'mdi-action-query-builder' },
    { name: 'Slider', icon: 'mdi-action-query-builder' },
    { name: 'Menu', icon: 'mdi-action-query-builder' },
    { type: 'separator' },
    { name: 'List', icon: 'mdi-action-query-builder' },
    { name: 'Form', icon: 'mdi-action-query-builder' }
  ]
};

module.exports = options;
