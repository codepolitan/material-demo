import List from 'material/src/list.js';
import Item from 'material/src/list/item.js';
import Component from 'material/src/component.js';
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
        var item = new Item({
          name: info.name,
          text: info.name
        });
      }

      return item;
    },
    select: (item) => {
      console.log('item...', item);
      this.selected = item;
    }
  }).insert(body);

  console.log('countries', countries);

  // var list = countries.concat(countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries);
  var list = countries;
  console.log('row count', list.length);

  list1.set('list', list);

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });

  console.log('list', list1);

};
