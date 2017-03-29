'use strict';

// controls
import List from 'material/src/list.js';
import Button from 'material/src/control/button.js';
import countries from '../data/countries.json';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function(body) {

  console.log('countries', countries);

  var list1 = new List({
    //type: 'action',
    height: 600,
    label: 'Flat',
    render: (info) => {
      //console.log('render', info);
      var item;

      if (info.type === 'separator') {
        item = new Component({
          class: 'ui-separator'
        });
      } else {
        var item = new Button({
          label: info.name
        });
      }

      return item;
    }
  }).insert(body);


  list1.set('list', countries);

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });


  console.log('list', list1);

};
