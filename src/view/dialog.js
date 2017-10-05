'use strict'

import {
  Dialog,
  component,
  container,
  button,
  Text,
  List,
  item
} from 'material'

import event from 'material/src/element/event.js'
import countries from '../data/countries.json'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  console.log('container', container)
  var view = container({
    container: body,
    css: 'view-dialog'
  })

  var layout = [component, 'simple-dialog', { display: 'flex', direction: 'vertical' },
    [component, 'body', { display: 'flex', direction: 'vertical', flex: '1' },
      [Text, 'text', { text: 'Title', type: 'title' }],
      [Text, 'text', { text: 'This is a subheadubg 2', type: 'subheading2' }]
    ],
    [component, 'action', { display: 'flex', direction: 'vertical', flex: '1' },
      [button, 'cancel', { text: 'continue', flex: 'none' }],
      [button, 'continue', { text: 'cancel', flex: 'none' }]
    ]
  ]

  var layout2 = [component, 'list-dialog', { display: 'flex', direction: 'vertical' },
    [component, 'head', { display: 'flex', direction: 'vertical', flex: '1' },
      [Text, 'text', { text: 'Choose a country', type: 'title' }]
    ],
    [List, 'list', { flex: '1' }],
    [component, 'action', { display: 'flex', direction: 'vertical', flex: '1' },
      [button, 'decline', { text: 'cancel', flex: 'none' }],
      [button, 'accept', { text: 'select', flex: 'none' }]
    ]
  ]

  var dialog = new Dialog({
    class: 'simple-dialog',
    layout: layout
  }).insert(view)

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
  }).insert(view)

  dialog2.layout.get('accept').on('click', function() {
    dialog2.close()
  })

  dialog2.layout.get('decline').on('click', function() {
    dialog2.close()
  })

  var list = dialog2.layout.get('list')
  list.set('list', countries)

  button({
    primary: true,
    type: 'raised',
    label: 'show dialog'
  }).on('click', function() {
    dialog.show()
  }).insert(view)

  button({
    color: 'primary',
    type: 'raised',
    label: 'show dialog list'
  }).on('click', function() {
    dialog2.layout.get('accept').disable(true)
    dialog2.show()
  }).insert(view)
};