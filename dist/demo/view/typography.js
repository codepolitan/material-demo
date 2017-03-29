'use strict';

import Container from 'material/src/container.js';
import Text from 'material/src/text.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {




  var container = new Container({

  }).insert(body);


  new Text({
    type: 'headline',
    text: 'Typography'
  }).insert(container);

  new Text({
    type: 'subheading1',
    text: 'Too many type sizes and styles at once can wreck any layout. A typographic scale has a limited set of type sizes that work well together along with the layout grid.'
  }).insert(container);

  new Text({
    type: 'subheading1',
    text: 'These sizes and styles were developed to balance content density and reading comfort under typical usage conditions. Type sizes are specified with sp (scaleable pixels) to enable large type modes for accessibility.'
  }).insert(container);

  new Text({
    type: 'display4',
    text: 'Display 4'
  }).insert(container);

  new Text({
    type: 'display3',
    text: 'Display 3'
  }).insert(container);

  new Text({
    type: 'display2',
    text: 'Display 2'
  }).insert(container);

  new Text({
    type: 'display1',
    text: 'Display 1'
  }).insert(container);

  new Text({
    type: 'headline',
    text: 'Headline'
  }).insert(container);

  new Text({
    type: 'title',
    text: 'Title'
  }).insert(container);

  new Text({
    type: 'subheading2',
    text: 'Subheading 2'
  }).insert(container);

  new Text({
    type: 'subheading1',
    text: 'Subheading 1'
  }).insert(container);

  new Text({
    type: 'body2',
    text: 'Body 2'
  }).insert(container);

  new Text({
    type: 'body1',
    text: 'Body 1'
  }).insert(container);

  new Text({
    type: 'caption',
    text: 'Caption'
  }).insert(container);


  new Text({
    type: 'button',
  }).insert(container);

};
