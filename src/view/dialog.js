'use strict'

import {
  Layout,
  View,
  Dialog,
  Component,
  Button,
  Text,
  List,
  Toolbar
} from 'material'

import event from 'material/src/element/event.js'
import countries from '../data/list.json'

// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var layout = new Layout([View, 'view', {},
    [Toolbar, 'main', {},
      [Button, '', {}],
      [Button, '', {}]
    ]
  ], body)

  var view = layout.get('view')

  // var view = new View({
  //   container: body,
  //   name: 'dialog',
  //   css: 'view-dialog'
  // })

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
    [Component, 'head', { display: 'flex', direction: 'vertical', flex: 'none' },
      [Text, 'text', { text: 'Choose a country', type: 'title' }]
    ],
    [List, 'list', { flex: '1',
      select: (item) => {
        console.log('select', item)
        dialog2.layout.get('cancel').enable(false)
      }
    }],
    [Component, 'action', { display: 'flex', direction: 'horizontal', flex: 'none' },
      [Button, 'cancel', { text: 'cancel', flex: 'none' }],
      [Button, 'choose', { text: 'choose', flex: 'none' }]
    ]
  ]

  var dialog = new Dialog({
    class: 'simple-dialog',
    layout: layout
  }).insert(view)

  console.log('button continue', dialog.layout.get('continue'))

  dialog.layout.get('continue').on('click', function () {
    dialog.close()
  })

  dialog.layout.get('cancel').on('click', function () {
    dialog.close()
  })

  var dialog2 = new Dialog({
    class: 'simple-dialog',
    layout: layout2
  }).insert(view)

  dialog2.layout.get('choose').on('click', function () {
    dialog2.close()
  })

  dialog2.layout.get('cancel').on('click', function () {
    dialog2.close()
  })

  var list = dialog2.layout.get('list')
  list.set('list', countries)

  new Button({
    primary: true,
    type: 'raised',
    label: 'show dialog'
  }).on('click', function () {
    dialog.show()
  }).insert(view)

  new Button({
    color: 'primary',
    type: 'raised',
    label: 'show dialog list'
  }).on('click', function () {
    dialog2.layout.get('choose').disable(true)
    dialog2.show()
  }).insert(view)
};
