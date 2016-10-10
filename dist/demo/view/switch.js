'use strict';

// switch
import Switch from 'material/lib/control/switch.js';

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
};
