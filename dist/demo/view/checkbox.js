'use strict';

import Component from 'material/lib/component.js';
// controls
import Checkbox from 'material/lib/control/checkbox.js';
import Button from 'material/lib/control/button.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {
  new Component({
    class: 'ui-separator',
  }).insert(body);

  var checkbox = new Checkbox({
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

  new Button({
    primary: true,
    type: 'raised',
    label: 'Toggle',
  }).on('press', function() {
    console.log('switch state', checkbox.toggle());
  }).insert(body);
};
