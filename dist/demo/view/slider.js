'use strict';

import Layout from 'material/src/layout.js';
import Container from 'material/src/container.js';

// switch
import Slider from 'material/src/control/slider.js';
import Button from 'material/src/control/button.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {

  console.log('slider init demo');

  var layout = new Layout({
    components: [{
      name: 'container',
      component: Container,
      components: [{
        name: 'default',
        component: Slider,
        options: {
          label: 'Slider',
        }
      }, {
        name: 'disabled',
        component: Slider,
        options: {
          label: 'Disabled',
          disabled: true
        }
      }]
    }]
  }).insert(body);

};
