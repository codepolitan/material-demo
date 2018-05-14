'use strict'

import Switch from 'material/src/switch.js'

import Layout from 'material/src/layout.js'
import View from 'material/src/view.js'
import Container from 'material/src/container.js'

// toolbar
import Toolbar from 'material/src/toolbar.js'
import Button from 'material/src/button.js'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var layout = new Layout([View, 'checkbox-view', {},
    [Container, 'hero', {},
      [Switch, 'main-switch', { label: 'Switch' }]
    ],
    [Toolbar, 'footer', {},
      [Button, 'toggleBtn', { label: 'Toggle check' }],
      [Button, 'enableBtn', { label: 'Enable', checked: true }],
      [Button, 'disableBtn', { label: 'Disable', disabled: true }]
    ],
    [Container, 'default-container', {},
      [Switch, 'default', { label: 'Switch' }],
      [Switch, 'check', { label: 'Checked', checked: true }],
      [Switch, 'disabled', { label: 'Disabled', disabled: true }]
    ],
    [Container, 'dark-container', { css: 'dark-theme' },
      [Switch, 'dark-default', { label: 'Switch' }],
      [Switch, 'dark-uncheck', { label: 'Checked', checked: true }],
      [Switch, 'dark-disabled', { label: 'Disabled', disabled: true }]
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
