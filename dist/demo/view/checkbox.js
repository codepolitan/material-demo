'use strict';

// view
import View from 'material/lib/view.js';

import Component from 'material/lib/component.js';
// controls
import Button from 'material/lib/control/button.js';
import Switch from 'material/lib/control/switch.js';
import Checkbox from 'material/lib/control/checkbox.js';
import Field from 'material/lib/control/textfield.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
var checkbox = function(body) {
		//return;
	// var mainbody = layout.main;
	// var fieldIdx = 0;

	// var view = new View({
	// 	comp: ['body']
	// }).insert(mainbody);

	// var body = view.c.body;

	var switchControl = new Switch({
		label: 'Switch',
	}).on('change',function(value) {
		//console.log('checked', value);
	}).insert(body);

	new Switch({
		label: 'Disabled',
		disabled: true
	}).insert(body);

	new Component({
		class: 'ui-separator',
	}).insert(body);

	new Checkbox({
		label: 'Checkbox',
	}).on('change',function(value) {
		console.log('checked', value);
	}).insert(body);

	new Checkbox({
		label: 'Checkbox checked',
		value: true
	}).on('change',function(value) {
		console.log('checked', value);
	}).insert(body);

	new Checkbox({
		label: 'Checkbox disabled',
		disabled: true,
	}).on('change',function(value) {
		console.log('checked', value);
	}).insert(body);


	new Field({
		label: 'material',
		name: 'field'
	}).insert(body);

};

module.exports = checkbox;
