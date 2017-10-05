'use strict'

import Layout from 'material/src/layout.js'
import component from 'material/src/component.js'
import container from 'material/src/container.js'
import button from 'material/src/button.js'
// controls
import Toolbar from 'material/src/toolbar.js'
import Textfield from 'material/src/textfield.js'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  var layout = new Layout([component, 'checkbox-view', {},
    [container, 'hero', {},
      [Textfield, '', { label: 'Textfield' }]
    ],
    [container, 'footer', {},
      [button, 'toggleBtn', { label: 'Toggle check' }],
      [button, 'enableBtn', { label: 'Enable', checked: true }],
      [button, 'disableBtn', { label: 'Disable', disabled: true }]
    ],
    [container, 'default-container', {},
      [Textfield, 'default', { label: 'Textfield' }],
      [Textfield, 'uncheck', { label: 'Textfield', checked: true }],
      [Textfield, 'disabled', { label: 'Disabled', disabled: true }]
    ],
    [container, 'dark-container', { css: 'dark-theme' },
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
  }).insert(layout.component.container)

  layout.get('disableBtn').on('click', () => {
    layout.get('disabled').disable()
    layout.get('disabled').label('Disabled')
  }).insert(layout.component.container)
}