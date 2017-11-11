'use strict'

import Layout from 'material/src/layout.js'
import Tabs from 'material/src/tabs.js'

import View from 'material/src/view.js'
import Container from 'material/src/container.js'
import Button from 'material/src/button.js'
import Text from 'material/src/text.js'
// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var list = [{
    text: 'One',
    name: 'one'
  }, {
    text: 'Two',
    name: 'two'
  }, {
    text: 'Three',
    name: 'three'
  }, {
    text: 'Four',
    name: 'four'
  }]

  var layout = new Layout([View, 'tabs', { display: 'flex', direction: 'vertical' },
    [Tabs, 'tabs', { list: list, flex: 'none' }],
    [Container, 'herotabs', { flex: '1' }],
    [Tabs, 'tabs', { color: 'primary', list: list, flex: 'none' }],
    [Container, 'herotabs', { flex: '1' }],
    [Tabs, 'tabs', { color: 'secondary', list: list, flex: 'none' }],
    [Container, 'herotabs', { flex: '1' }]
  ], body)

  layout.get('tabs').on('select', (name) => {
    console.log('select', name)
  })

  // console.log('obuttn', layout, layout.get('openmenu'))

  // layout.get('openmenu').on('click', (e) => {
  //   console.log('menu', layout.get('menu'))
  //   layout.get('menu').show(e)
  // })
}
