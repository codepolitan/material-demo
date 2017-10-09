'use strict'

import Dialog from 'material/src/dialog.js'

import Component from 'material/src/component.js'
import Container from 'material/src/container.js'
import Button from 'material/src/button.js'
import Text from 'material/src/text.js'
import List from 'material/src/list.js'
import Item from 'material/src/item.js'
import event from 'material/src/element/event.js'

import countries from '../data/countries.json'

// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  var container = new Container({
    container: body,
    css: 'view-dialog'
  })

  var layout = [Component, 'simple-dialog', { display: 'flex', direction: 'vertical' },
    [Component, 'body', { display: 'flex', direction: 'vertical', flex: '1' },
      [Text, 'text', { text: 'Title', type: 'title' }],
      [Text, 'text', { text: 'This is a subheadubg 2', type: 'subheading2' }]
    ],
    [Component, 'action', { display: 'flex', direction: 'vertical', flex: '1' },
      [Button, 'cancel', { text: 'continue', flex: 'none' }],
      [Button, 'continue', { text: 'cancel', flex: 'none' }]
    ]
  ]

  var layout2 = [Component, 'list-dialog', { display: 'flex', direction: 'vertical' },
    [Component, 'head', { display: 'flex', direction: 'vertical', flex: '1' },
      [Text, 'text', { text: 'Choose a country', type: 'title' }]
    ],
    [List, 'list', { flex: '1' }],
    [Component, 'action', { display: 'flex', direction: 'vertical', flex: '1' },
      [Button, 'decline', { text: 'decline', flex: 'none' }],
      [Button, 'accept', { text: 'accept', flex: 'none' }]
    ]
  ]

  var dialog = new Dialog({
    class: 'simple-dialog',
    layout: layout
  }).insert(container)

  console.log('button continue', dialog.layout.get('continue'))

  dialog.layout.get('continue').on('click', function() {
    dialog.close()
  })

  dialog.layout.get('cancel').on('click', function() {
    dialog.close()
  })

  var dialog2 = new Dialog({
    class: 'simple-dialog',
    layout: layout2
  }).insert(container)

  dialog2.layout.get('accept').on('click', function() {
    dialog2.close()
  })

  dialog2.layout.get('decline').on('click', function() {
    dialog2.close()
  })

  var list = dialog2.layout.get('list')
  list.set('list', countries)

  new Button({
    primary: true,
    type: 'raised',
    label: 'show dialog'
  }).on('click', function() {
    dialog.show()
  }).insert(container)

  new Button({
    color: 'primary',
    type: 'raised',
    label: 'show dialog list'
  }).on('click', function() {
    dialog2.layout.get('accept').disable(true)
    dialog2.show()
  }).insert(container)
};