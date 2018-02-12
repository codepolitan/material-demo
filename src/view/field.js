'use strict'

import Layout from 'material/src/layout.js'
import Component from 'material/src/component.js'
import Checkbox from 'material/src/checkbox.js'
import Container from 'material/src/container.js'
import View from 'material/src/view.js'
import Button from 'material/src/button.js'
// controls
import Toolbar from 'material/src/toolbar.js'
import Textfield from 'material/src/textfield.js'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var layout = new Layout([View, 'checkbox-view', {},
    [Container, 'hero', {},
      [Textfield, '', { label: 'Textfield' }]
    ],
    [Container, 'checkbox-options', {},
      [Textfield, 'default', { label: 'Textfield' }],
      [Checkbox, 'disabled', { label: 'Disabled', style: 'dense' }],
      [Checkbox, 'dense', { label: 'Dense', style: 'dense' }],
      [Checkbox, 'required', { label: 'Required', style: 'dense' }]
    ]
  ], body)

  layout.get('disabled').on('change', (state) => {
    console.log('disabled', state)
    if (state) {
      layout.get('default').set('disabled', true)
    } else {
      layout.get('default').set('disabled', false)
    }
  }).insert(layout.get('container'))
}
