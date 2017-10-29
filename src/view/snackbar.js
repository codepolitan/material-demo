'use strict'

import {
  Card,
  Component,
  Container,
  View,
  Button,
  Text,
  Snackbar
} from 'material'

// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var view = new View({
    name: 'snackbar'
  }).insert(body)

  var hero = new Container({
    name: 'hero'
  }).insert(view)

  var container = new Container({
    name: 'card'
  }).insert(view)

  var layout = [Component, 'content', { display: 'flex', direction: 'horizontal' },
    [Text, 'text', { flex: '1', text: 'Message sent'}],
    [Button, 'undo', { flex: 'none', text: 'undo' }]
  ]

  new Snackbar({
    layout: layout,
    delay: 0
  }).insert(hero)

  new Button({
    text: 'show'
  }).insert(container).on('click', () => {
    var sb = new Snackbar({
      layout: layout
    }).insert(document.body)

    sb.layout.get('undo').on('click', () => {
      console.log('undo')
    })
  })
};
