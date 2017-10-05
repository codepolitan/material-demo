'use strict'

// controls
import List from 'material/src/list.js'
import button from 'material/src/button.js'
import countries from '../data/countries.json'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  var list1 = new List({
    // type: 'action',
    height: 600,
    label: 'Flat',
    render: (info) => {
      var item

      item = button({
        label: info.name
      })

      return item
    }
  }).insert(body)

  list1.set('list', countries)

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });
}