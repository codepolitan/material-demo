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

  var dialog = new Dialog({
    class: 'simple-dialog',
    layout: {
      component: Component,
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
        component: Component,
        // display: 'flex',
        // direction: 'horizontal',
        components: [{
          name: 'cancel',
          flex: 'none',
          text: 'Cancel',
          component: Button
        }, {
          name: 'continue',
          flex: 'none',
          text: 'Continue',
          component: Button
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
      component: Component,
      name: 'list-dialog',
      display: 'flex',
      direction: 'vertical',
      components: [{
        name: 'head',
        flex: 'none',

        component: Component,
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
              item = new Component({
                css: 'ui-separator'
              })
            } else {
              var item = new Item({
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
        component: Component,
        // display: 'flex',
        flex: 'none',
        direction: 'horizontal',
        components: [{
          name: 'decline',
          flex: 'none',
          text: 'Cancel',
          component: Button
        }, {
          name: 'accept',
          flex: 'none',
          text: 'Select',
          options: {
            color: 'secondary',
            disabled: true
          },
          component: Button
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