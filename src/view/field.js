'use strict'

import Layout from 'material/src/layout.js'
import Component from 'material/src/component.js'
import Container from 'material/src/container.js'
import Button from 'material/src/button.js'
// controls
import Toolbar from 'material/src/toolbar.js'
import Textfield from 'material/src/textfield.js'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var layout = new Layout([Component, 'checkbox-view', {},
    [Container, 'hero', {},
      [Textfield, '', { label: 'Textfield' }]
    ],
    [Container, 'footer', {},
      [Button, 'toggleBtn', { label: 'Toggle check' }],
      [Button, 'enableBtn', { label: 'Enable', checked: true }],
      [Button, 'disableBtn', { label: 'Disable', disabled: true }]
    ],
    [Container, 'default-container', {},
      [Textfield, 'default', { label: 'Textfield' }],
      [Textfield, 'uncheck', { label: 'Textfield', checked: true }],
      [Textfield, 'disabled', { label: 'Disabled', disabled: true }]
    ],
    [Container, 'dark-container', { css: 'dark-theme' },
      [Textfield, '', { label: 'Textfield' }],
      [Textfield, '', { label: 'Textfield', checked: true }],
      [Textfield, '', { label: 'Disabled', disabled: true }]
    ]
  ], body)

  layout.get('toggleBtn').on('click', () => {
    layout.get('default').toggle()
  }).insert(layout.get('container'))

  layout.get('enableBtn').on('click', () => {
    layout.get('disabled').enable()
    layout.get('disabled').label('Enabled')
  }).insert(layout.get('container'))

  layout.get('disableBtn').on('click', () => {
    layout.get('disabled').disable()
    layout.get('disabled').label('Disabled')
  }).insert(layout.get('container'))
}
