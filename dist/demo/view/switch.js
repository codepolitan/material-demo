'use strict';

// switch
import Switch from 'material/lib/control/switch.js';
import Button from 'material/lib/control/button.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {

  var switchControl = new Switch({
    label: 'Switch',
  }).on('change', function(value) {
    //console.log('checked', value);
  }).insert(body);

  new Switch({
    label: 'Disabled',
    disabled: true
  }).insert(body);


  new Button({
    primary: true,
    type: 'raised',
    label: 'toggle',
  }).on('press', function() {
    console.log('switch state', switchControl.toggle());
  }).insert(body);
};
