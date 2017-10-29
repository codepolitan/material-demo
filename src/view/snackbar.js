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

  new Snackbar({
    layout: [Component, 'content', { display: 'flex', direction: 'horizontal' },
      [Text, 'text', {text: 'Message sent'}],
      [Button, 'undo', { text: 'undo' }]
    ]
  }).insert(hero)

  new Button({
    text: 'show'
  }).insert(container).on('click', () => {
    var snackbar = new Snackbar({
      layout: [Component, 'content', { display: 'flex', direction: 'horizontal' },
        [Text, 'text', { flex: '1', text: 'Message sent'}],
        [Button, 'undo', { flex: 'none', text: 'undo' }]
      ]
    }).insert(document.body)

    console.log('snack', snackbar)
  })
};
