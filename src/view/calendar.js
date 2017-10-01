'use strict'

import { Calendar, Component, Dialog, Toolbar, Button, Textfield } from 'material'

import insert from 'material/src/element/insert'
import event from 'material/src/element/event'

var layout = [Component, 'simple-dialog', { display: 'flex', direction: 'vertical' },
  [Component, 'body', { display: 'flex', direction: 'vertical', flex: '1' },
    ['Textfield', 'eventName', { text: 'New Event' }],
    ['Textfield', 'startDate', { name: 'eventName' }]
  ],
  [Component, 'action', {},
    [Button, 'cancel', { style: 'compact dense' }],
    [Button, 'save', { style: 'compact dense', color: 'primary' }]
  ]
]
// var layout = {
//   component: Component,
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
//     component: Component,
//     //display: 'flex',
//     //direction: 'horizontal',
//     components: [{
//       component: Button,
//       name: 'cancel',
//       flex: 'none',
//       text: 'Cancel',
//       options: {
//         style: 'compact dense',
//       }
//     }, {
//       component: Button,
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
export default function (body) {
  var dialog = new Dialog({ layout: layout })
  insert(dialog, body)

  event.add(dialog.layout.get('save'), 'click', function () {
    dialog.close()
  })

  event.add(dialog.layout.get('cancel'), 'click', function () {
    dialog.close()
  })

  var calendar = new Calendar().on('add', (date) => {
    console.log('add date', date)
    dialog.show()
  })
  insert(calendar, body)

  console.log('calendar instance', calendar)
};
