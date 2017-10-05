'use strict'

import Dialog from 'material/src/dialog.js'

import component from 'material/src/component.js'
import container from 'material/src/container.js'
import button from 'material/src/button.js'
import Text from 'material/src/text.js'
import List from 'material/src/list.js'
import item from 'material/src/item.js'
import event from 'material/src/element/event.js'

import countries from '../data/countries.json'

// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  var container = container({
    container: body,
    css: 'view-dialog'
  })

  var dialog = new Dialog({
    class: 'simple-dialog',
    layout: {
      component: component,
      name: 'simple-dialog',
      display: 'flex',
      direction: 'vertical',
      components: [{
        name: 'body',
        display: 'flex',

        direction: 'vertical',
        flex: '1',
        components: [{
          text: 'Are you happy?',
          component: Text,
          options: {
            type: 'title'
          }
        }, {
          component: Text,
          text: 'Please check the left and right side of this element for fun.',
          options: {
            type: 'subheading2'
          }
          // flex: '1',
        }]
      }, {
        name: 'action',
        component: component,
        // display: 'flex',
        // direction: 'horizontal',
        components: [{
          name: 'cancel',
          flex: 'none',
          text: 'Cancel',
          component: button
        }, {
          name: 'continue',
          flex: 'none',
          text: 'Continue',
          component: button
        }]
      }]
    }
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
    layout: {
      component: component,
      name: 'list-dialog',
      display: 'flex',
      direction: 'vertical',
      components: [{
        name: 'head',
        flex: 'none',

        component: component,
        components: [{
          name: 'title',
          flex: 'none',
          component: Text,
          text: 'Choose a country',
          options: {
            type: 'title'
          }
        }]

      }, {
        flex: '1',
        name: 'list',
        component: List,
        options: {
          render: (info) => {
            var item

            if (info.type === 'separator') {
              item = component({
                css: 'ui-separator'
              })
            } else {
              var item = new item({
                name: info.name,
                text: info.name
              })
            }

            return item
          },
          select: (item) => {
            dialog2.layout.get('accept').enable(false)
          }
        }

      }, {
        name: 'action',
        component: component,
        // display: 'flex',
        flex: 'none',
        direction: 'horizontal',
        components: [{
          name: 'decline',
          flex: 'none',
          text: 'Cancel',
          component: button
        }, {
          name: 'accept',
          flex: 'none',
          text: 'Select',
          options: {
            color: 'secondary',
            disabled: true
          },
          component: button
        }]
      }]
    }
  }).insert(container)

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
  }).insert(container)

  button({
    color: 'primary',
    type: 'raised',
    label: 'show dialog list'
  }).on('click', function() {
    dialog2.layout.get('accept').disable(true)
    dialog2.show()
  }).insert(container)
};