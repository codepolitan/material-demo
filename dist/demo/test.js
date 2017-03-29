'use strict';
// view
var View = require('material/src/view.js');
// controls
var Button = require('material/src/control/button.js');
var Switch = require('material/src/control/switch.js');
var Field = require('material/src/control/field.js');

/**
 * [initTest description]
 * @return {[type]} [description]
 */
var testFunc = function(layout) {
  console.log(layout);
  var mainbody = layout.main.content;

  var view = new View({
    type: 'control'
  }).inject(mainbody);
  var list = new View({
    type: 'list'
  }).inject(mainbody);

  var viewbody = view.content;
  var listbody = list.content;

  var switch1 = new Switch({
    label: 'Switch',
  }).inject(viewbody);

  var switch2 = new Switch({
    label: 'Disabled',
    disabled: true
  }).inject(viewbody);

  var field = new Field({
    label: 'material',
    name: 'field'
  }).inject(viewbody);

  var button = new Button({
    //type: 'action',
    label: 'Flat'
  }).inject(viewbody);

  var raisedBtn = new Button({
    label: 'Raised',
    type: 'raised',
    primary: true,
    klass: 'is-primary'
  }).inject(viewbody);

  var raisedBtn = new Button({
    icon: 'mdi-content-inbox',
    label: 'Inbox',
    klass: 'icon-text'
  }).inject(viewbody);

  var actionBtn = new Button({
    type: 'action',
    primary: true,
    klass: 'is-primary'
  }).inject(viewbody);

  var actionBtn = new Button({
    icon: 'mdi-content-send',
    type: 'action'
  }).inject(viewbody);

  var fieldIdx = 0;

  button.on('press', function(e) {
    console.log('press', e);
    fieldIdx++;
    var field = new Field({
      label: 'field' + fieldIdx,
      name: 'field'
    }).inject(listbody);
  });
};

module.exports = testFunc;
