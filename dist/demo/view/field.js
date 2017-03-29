'use strict';

import Layout from 'material/src/layout.js';
import Component from 'material/src/component.js';
import Container from 'material/src/container.js';
// controls
import Field from 'material/src/control/textfield.js';
import Text from 'material/src/text.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {
  new Layout({
    container: body,
    component: Container,
    display: 'flex',
    direction: 'vertical',
    components: [{
      name: 'header',
      direction: 'vertical',
      components: [{
  type: 'headline',
  component: Text,
  text: 'Text fields'
}
]
    }, {
      component: Container,
      name: 'TextFields',
      direction: 'vertical',
      components: [{
        name: 'title',
        component: Field,
        text: 'Adresse',
      }, {
        text: 'Address',
        name: 'place.address',
        component: Field,
      }, {
        text: 'Address 2',
        name: 'place.info',
        component: Field,
      }]
    }]
  });
};
