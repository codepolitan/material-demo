'use strict'

import Card from 'material/src/card.js'

import component from 'material/src/component.js'
import container from 'material/src/container.js'
import button from 'material/src/button.js'
import Text from 'material/src/text.js'
// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  var container = container({
    css: 'view-card'
  }).insert(body)

  var card = new Card({
    layout: {
      component: component,
      name: 'simple-card',
      display: 'flex',
      direction: 'vertical',
      components: [{
        name: 'head',
        display: 'flex'

      }, {
        name: 'body',
        display: 'flex',

        direction: 'vertical',
        flex: '1',
        components: [{
          text: 'Title goes here',
          component: Text,
          options: {
            type: 'title'
          }
        }, {
          component: Text,
          text: 'Subtitle here',
          options: {
            type: 'subheading2'
          }
          // flex: '1',
        }]
      }, {
        name: 'action',
        component: component,
        direction: 'horizontal',
        components: [{
          flex: 'none',
          text: 'action 1',
          component: button
        }, {
          flex: 'none',
          text: 'action 1',
          component: button,
          name: 'main'
        }]
      }]
    }
  }).insert(container)

  var card2 = new Card({
    layout: {
      component: component,
      name: 'simple-card-orange',
      display: 'flex',
      direction: 'vertical',
      components: [{
        name: 'head',
        display: 'flex'

      }, {
        name: 'body',
        display: 'flex',

        direction: 'vertical',
        flex: '1',
        components: [{
          text: 'Title goes here',
          component: Text,
          options: {
            type: 'title'
          }
        }, {
          component: Text,
          text: 'Subtitle here',
          options: {
            type: 'subheading2'
          }
          // flex: '1',
        }]
      }, {
        name: 'action',
        component: component,
        direction: 'horizontal',
        components: [{
          flex: 'none',
          text: 'action 1',
          component: button
        }, {
          flex: 'none',
          text: 'action 1',
          component: button,
          name: 'main'
        }]
      }]
    }
  }).insert(container)

  var card3 = new Card({
    layout: {
      component: component,
      name: 'little-card-orange',
      display: 'flex',
      direction: 'vertical',
      components: [{
        name: 'head',
        display: 'flex',
        direction: 'horizontal',
        components: [{
          name: 'text',
          components: [{
            text: 'Title goes here',
            component: Text,
            options: {
              type: 'title'
            }
          }, {
            component: Text,
            text: 'Subtitle here',
            options: {
              type: 'subheading2'
            }
            // f
          }]
        }, {
          name: 'image',
          display: 'flex',

          direction: 'vertical',
          flex: '1',
          lex: '1'
        }]
      }, {
        name: 'action',
        component: component,
        direction: 'horizontal',
        components: [{
          flex: 'none',
          text: 'action 1',
          component: button
        }, {
          flex: 'none',
          text: 'action 1',
          component: button,
          name: 'main'
        }]
      }]
    }
  }).insert(container)

  var card4 = new Card({
    layout: {
      component: component,
      name: 'head-card-text',
      display: 'flex',
      direction: 'vertical',
      components: [{
        name: 'head',
        display: 'flex',
        direction: 'vertical',
        components: [{

          text: 'Title',
          component: Text,
          options: {
            type: 'title'
          }

        }]
      }, {
        name: 'action',
        component: component,
        direction: 'horizontal',
        components: [{
          flex: 'none',
          text: 'action 1',
          component: button
        }]
      }]
    }
  }).insert(container)
};