'use strict';

// controls
import Button from 'material/src/control/button2.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {

  new Button({
    //type: 'action',
    label: 'Button 2'
  }).insert(body);

};
