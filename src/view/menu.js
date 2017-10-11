'use strict'

import Layout from 'material/src/layout.js'
import Menu from 'material/src/menu.js'

import View from 'material/src/view.js'
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

  var layout = new Layout([View, 'demo-button', {},
    [Container, 'hero', {},
      [Button, 'openmenu', { text: 'Menu' }],
      [Menu, 'menu', { list: list }]
    ]
  ], body)

  console.log('obuttn', layout, layout.get('openmenu'))

  layout.get('openmenu').on('click', (e) => {
    console.log('menu', layout.get('menu'))
    layout.get('menu').show(e)
  })
}
