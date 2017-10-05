'use strict'

import {
  component,
  Checkbox,
  container,
  Toolbar,
  button,
  Layout
} from 'material'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  console.log('checkbox', Checkbox)
  var layout = new Layout([component, 'checkbox-view', {},
    [container, 'hero', {},
      [Checkbox, '', { label: 'Checkbox' }]
    ],
    [Toolbar, 'footer', {},
      [button, 'toggleBtn', { label: 'Toggle check' }],
      [button, 'enableBtn', { label: 'Enable', checked: true }],
      [button, 'disableBtn', { label: 'Disable', disabled: true }]
    ],
    [container, 'default-container', {},
      [Checkbox, 'default', { label: 'Checkbox' }],
      [Checkbox, 'uncheck', { label: 'Checkbox', checked: true }],
      [Checkbox, 'disabled', { label: 'Disabled', disabled: true }]
    ],
    [container, 'dark-container', { css: 'dark-theme' },
      [Checkbox, '', { label: 'Checkbox' }],
      [Checkbox, '', { label: 'Checkbox', checked: true }],
      [Checkbox, '', { label: 'Disabled', disabled: true }]
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