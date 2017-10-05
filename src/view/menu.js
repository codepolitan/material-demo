'use strict'

import Layout from 'material/src/layout.js'
import Menu from 'material/src/menu.js'

import component from 'material/src/component.js'
import container from 'material/src/container.js'
import button from 'material/src/button.js'
import Text from 'material/src/text.js'
// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  var list = [{
    name: 'Undo'
  }, {
    name: 'Redo'
  }, {
    type: 'divider'
  }, {
    name: 'Cut'
  }, {
    name: 'Copy'
  }, {
    name: 'Paste'
  }, {
    type: 'divider'
  }, {
    name: 'Find'
  }]

  var layout = new Layout([component, 'demo-button', {},
    [container, 'hero', {},
      [button, 'first', { text: 'Flat' }],
      [button, 'second', { text: 'Raised', type: 'raised', color: 'primary' }]
    ]
  ], body)
};