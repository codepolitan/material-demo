'use strict'

// controls
import Component from 'material/src/component.js'
import Form from 'material/src/form.js'
import Button from 'material/src/button.js'
// import schema from '../data/schema.json';
import data from '../data/contact.json'
import Field from 'material/src/textfield'
import Switch from 'material/src/switch.js'
import Checkbox from 'material/src/checkbox.js'
import Slider from 'material/src/slider.js'
import Text from 'material/src/text.js'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var form = new Form({
    layout: {
      component: Component,
      display: 'flex',
      direction: 'vertical',
      components: [{
        name: 'main',
        flex: 1,
        component: Component,
        components: [{
          name: 'contact',
          direction: 'vertical',

          components: [{
            type: 'display1',
            component: Text,
            text: 'Form Component'
          }, {
            type: 'subheading1',
            component: Text,
            text: 'Text fields allow users to input text, select text, and lookup data via auto-completion.'
          }, {
            type: 'headline',
            component: Text,
            text: 'Contact'
          }, {
            // name: 'fieldset',
            display: 'flex',
            direction: 'horizontal',
            components: [{
              flex: 1,
              name: 'firstname',
              component: Field,
              text: 'Prénom'
            }, {
              flex: 1,
              name: 'lastname',
              component: Field,
              options: {
                text: 'Nom'
              }
            }]
          }]
        }, {
          name: 'address',
          direction: 'vertical',
          components: [{
            type: 'headline',
            component: Text,
            options: {
              text: 'Adresse'
            }
          }, {
            text: 'Address',
            name: 'place.address',
            component: Field
          }, {
            text: 'Address 2',
            name: 'place.info',
            component: Field
          }, {
            display: 'flex',
            direction: 'horizontal',
            components: [{
              text: 'NPA',
              name: 'place.zipcode',
              component: Field,
              size: 75
            }, {
              flex: 1,
              text: 'Lieu',
              name: 'place.name',
              component: Field
            }]
          }, {
            text: 'Pays',
            name: 'place.country',
            component: Field
          }, {
            text: 'lat',
            name: 'place.coord.lat',
            component: Field
          }, {
            text: 'long',
            name: 'place.coord.long',
            component: Field
          }]
        }, {
          name: 'related',
          direction: 'vertical',
          components: [{
            label: 'active',
            component: Switch,
            name: 'active',
            options: {
              label: 'active'
            }
          }, {
            text: 'vip',
            component: Checkbox,
            name: 'vip'
          }, {
            text: 'rating',
            component: Slider,
            name: 'rating'
          }]
        }]
      }, {
        name: 'foot',

        // position: 'fixed',
        // styles: {
        //   bottom: '0px'
        // },

        components: [{
          name: 'toolbar',
          component: Component,
          options: {
            class: 'ui-toolbar'
          },
          components: [{
            name: 'cancel',
            component: Button,
            options: {
              label: 'Cancel'
            }
          }, {
            name: 'apply',
            component: Button,
            options: {
              type: 'raised',
              label: 'Apply'
            }
          }]
        }]
      }]
    }
  })

  form.insert(body)

  form.set('info', data)

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });
}
