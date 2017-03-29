'use strict';

import Component from 'material/src/component.js';
import Container from 'material/src/container.js';
// controls
import Checkbox from 'material/src/control/checkbox.js';
import Button from 'material/src/control/button.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {

  var container = new Container().insert(body);

  new Component({
    class: 'ui-separator',
  }).insert(body);

  var checkbox = new Checkbox({
    label: 'Checkbox',
  }).on('change', function(value) {
    console.log('checked', value);
  }).insert(container);

  new Checkbox({
    label: 'Checkbox checked',
    value: true
  }).on('change', function(value) {
    console.log('checked', value);
  }).insert(container);

  new Checkbox({
    label: 'Checkbox disabled',
    disabled: true,
  }).on('change', function(value) {
    console.log('checked', value);
  }).insert(container);

  new Button({
    primary: true,
    type: 'raised',
    label: 'Toggle',
  }).on('press', function() {
    console.log('switch state', checkbox.toggle());
  }).insert(container);
};
