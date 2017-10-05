'use strict'

import Switch from 'material/src/switch.js'

import Layout from 'material/src/layout.js'
import component from 'material/src/component.js'
import container from 'material/src/container.js'

// toolbar
import Toolbar from 'material/src/toolbar.js'
import button from 'material/src/button.js'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  var layout = new Layout([component, 'checkbox-view', {},
    [container, 'hero', {},
      [Switch, '', { label: 'Switch' }]
    ],
    [Toolbar, 'footer', {},
      [button, 'toggleBtn', { label: 'Toggle check' }],
      [button, 'enableBtn', { label: 'Enable', checked: true }],
      [button, 'disableBtn', { label: 'Disable', disabled: true }]
    ],
    [container, 'default-container', {},
      [Switch, 'default', { label: 'Switch' }],
      [Switch, 'uncheck', { label: 'Switch', checked: true }],
      [Switch, 'disabled', { label: 'Disabled', disabled: true }]
    ],
    [container, 'dark-container', { css: 'dark-theme' },
      [Switch, '', { label: 'Switch' }],
      [Switch, '', { label: 'Switch', checked: true }],
      [Switch, '', { label: 'Disabled', disabled: true }]
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