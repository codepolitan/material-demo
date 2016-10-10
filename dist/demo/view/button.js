'use strict';

// view

import Component from 'material/lib/component.js';
// controls
import Button from 'material/lib/control/button.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {

  new Button({
    //type: 'action',
    label: 'Flat'
  }).insert(body);

  new Button({
    label: 'Raised',
    type: 'raised',
    primary: true
  }).on('press', function(e) {
    // console.log('press', e);
 // fieldIdx++;
 // new Field({
 //   label: 'field' + fieldIdx,
 //   name: 'field'
 // }).insert(body);

  }).insert(body);

  new Button({
    icon: 'mdi-content-inbox',
    label: 'Inbox',
    css: 'icon-text'
  }).insert(body);

  //console.log('---', primaryButton.style());

  new Button({
    icon: 'mdi-content-send',
    type: 'action'
  }).insert(body);
};
