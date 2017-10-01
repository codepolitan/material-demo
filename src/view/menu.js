'use strict'

import Layout from 'material/src/layout.js'
import Menu from 'material/src/menu.js'

import Component from 'material/src/component.js'
import Container from 'material/src/container.js'
import Button from 'material/src/button.js'
import Text from 'material/src/text.js'
// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
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

  var layout = new Layout([Component, 'demo-button', {},
    [Container, 'hero', {},
      [Button, 'first', { text: 'Flat' }],
      [Button, 'second', { text: 'Raised', type: 'raised', color: 'primary' }]
    ]
  ], body)
};
