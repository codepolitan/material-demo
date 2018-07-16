'use strict'

import {
  Layout,
  View,
  Dialog,
  Container,
  Button,
  List,
  Text
} from 'material'

import css from 'material/src/module/css.js'
import event from 'material/src/element/event.js'
import countries from '../data/list.json'

// controls
/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  // dialog view
  var layout = new Layout([View, 'elevation', {},
    [Container, 'top', {},
      [Text, 'title', { type: 'title', text: 'Dialogs', style: 'adjust' }],
      [Text, 'title', { text: 'Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.' }]
    ],
    [Container, 'hero', {},
      [Button, 'alert', { text: 'Alert', color: 'primary', type: 'raised' }],
      [Button, 'simple', { text: 'Simple', color: 'primary', type: 'raised' }],
      [Button, 'confirmation', { text: 'Confirmation', color: 'primary', type: 'raised' }]
    ]
  ], body)

  // alert dialog

  var alert = new Dialog({
    name: 'alert',
    content: 'Discard draft?',
    accept: { text: 'discard', color: 'primary' },
    cancel: { text: 'cancel', color: 'primary' }
  }).on('accepted', () => {
    console.log('alert dialog accepted')
  }).on('canceled', () => {
    console.log('alert dialog canceled')
  }).insert(document.body)

  //  simple dialog

  var simple = new Dialog({
    name: 'simple',
    title: 'Choose a country',
    content: [List, 'list', { flex: '1',
      select: (item) => {
        console.log('select', item)
        simple.accept.enable()
      }
    }],
    accept: { text: 'choose', color: 'primary' },
    cancel: { text: 'cancel' }
  }).on('accepted', () => {
    console.log('simple dialog accepted')
  }).on('canceled', () => {
    console.log('simple dialog canceled')
  }).insert(document.body)

  simple.accept.disable()

  var list = simple.content.get('list')
  list.set('list', countries)

  //  confirmation dialog

  var confirmation = new Dialog({
    name: 'confirmation',
    title: 'Confirmation',
    content: [List, 'list', { flex: '1',
      select: (item) => {
        console.log('select', item)
        simple.action.accept.enable(true)
      }
    }],
    accept: { text: 'discard', color: 'primary' },
    cancel: { text: 'cancel', color: 'primary' }
  }).on('accepted', () => {
    console.log('simple dialog accepted')
  }).on('canceled', () => {
    console.log('simple dialog canceled')
  }).insert(document.body)

  var list = simple.content.get('list')
  list.set('list', countries)

  // activate buttons behavior

  var list = confirmation.content.get('list')
  list.set('list', countries)

  layout.get('alert').on('click', () => {
    alert.show()
  })

  layout.get('simple').on('click', () => {
    simple.show()
  })

  layout.get('confirmation').on('click', () => {
    confirmation.show()
  })
}
