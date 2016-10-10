'use strict';

import Component from 'material/lib/component.js';
// controls
import Checkbox from 'material/lib/control/checkbox.js';


/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {
  new Component({
    class: 'ui-separator',
  }).insert(body);

  new Checkbox({
    label: 'Checkbox',
  }).on('change', function(value) {
    console.log('checked', value);
  }).insert(body);

  new Checkbox({
    label: 'Checkbox checked',
    value: true
  }).on('change', function(value) {
    console.log('checked', value);
  }).insert(body);

  new Checkbox({
    label: 'Checkbox disabled',
    disabled: true,
  }).on('change', function(value) {
    console.log('checked', value);
  }).insert(body);
};
