'use strict'

import {
  Component,
  Checkbox,
  Container,
  Toolbar,
  Button,
  Layout
} from 'material'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  var layout = new Layout([Component, 'checkbox-view', {},
    [Container, 'hero', {},
      [Checkbox, '', { label: 'Checkbox' }]
    ],
    [Toolbar, 'footer', {},
      [Button, 'toggleBtn', { label: 'Toggle check' }],
      [Button, 'enableBtn', { label: 'Enable', checked: true }],
      [Button, 'disableBtn', { label: 'Disable', disabled: true }]
    ],
    [Container, 'default-container', {},
      [Checkbox, 'default', { label: 'Checkbox' }],
      [Checkbox, 'uncheck', { label: 'Checkbox', checked: true }],
      [Checkbox, 'disabled', { label: 'Disabled', disabled: true }]
    ],
    [Container, 'dark-container', { css: 'dark-theme' },
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