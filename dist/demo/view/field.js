'use strict';

import Component from 'material/lib/component.js';
// controls
import Field from 'material/lib/control/textfield.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
var checkbox = function(body) {

  new Component({
    class: 'ui-separator',
  }).insert(body);

  new Field({
    label: 'material',
    name: 'field'
  }).insert(body);


};

module.exports = checkbox;
