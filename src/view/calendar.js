'use strict'

import {
  Calendar,
  component,
  Dialog,
  Toolbar,
  button,
  Textfield
} from 'material'

import insert from 'material/src/element/insert'
import event from 'material/src/element/event'

var layout = [component, 'simple-dialog', { display: 'flex', direction: 'vertical' },
  [component, 'body', { display: 'flex', direction: 'vertical', flex: '1' },
    ['Textfield', 'eventName', { text: 'New Event' }],
    ['Textfield', 'startDate', { name: 'eventName' }]
  ],
  [component, 'action', {},
    [button, 'cancel', { style: 'compact dense' }],
    [button, 'save', { style: 'compact dense', color: 'primary' }]
  ]
]
// var layout = {
//   component: component,
//   name: 'simple-dialog',
//   display: 'flex',
//   direction: 'vertical',
//   components: [{
//     name: 'body',
//     display: 'flex',

//     direction: 'vertical',
//     flex: '1',
//     components: [{
//       text: 'New Event',
//       name: 'eventName',
//       component: Textfield,
//     }, {
//       text: 'Add Location',
//       name: 'event.location',
//       component: Textfield,
//     }, {
//       text: 'New Event',
//       name: 'startDate',
//       component: Textfield,
//     }, {
//       text: 'Add Location',
//       name: 'Alarm',
//       component: Textfield,
//     }]
//   }, {
//     name: 'action',
//     component: component,
//     //display: 'flex',
//     //direction: 'horizontal',
//     components: [{
//       component: button,
//       name: 'cancel',
//       flex: 'none',
//       text: 'Cancel',
//       options: {
//         style: 'compact dense',
//       }
//     }, {
//       component: button,
//       name: 'save',
//       flex: 'none',
//       text: 'Save',
//       options: {
//         style: 'compact dense',
//         color: 'primary'
//       }
//     }]
//   }]
// };

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  var dialog = new Dialog({ layout: layout })
  insert(dialog, body)

  event.add(dialog.layout.get('save'), 'click', function() {
    dialog.close()
  })

  event.add(dialog.layout.get('cancel'), 'click', function() {
    dialog.close()
  })

  var calendar = new Calendar().on('add', (date) => {
    console.log('add date', date)
    dialog.show()
  })
  insert(calendar, body)

  console.log('calendar instance', calendar)
};