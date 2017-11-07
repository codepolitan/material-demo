'use strict'

import Layout from 'material/src/layout.js'

import View from 'material/src/view.js'
import Container from 'material/src/container.js'
import Divider from 'material/src/divider.js'
import Progress from 'material/src/progress.js'
// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var layout = new Layout([View, 'demo-button', {},
    [Container, 'hero', {},
      [Progress, 'progress'],
      [Divider],
      [Progress, 'indeterminate', { type: 'indeterminate' }]
    ]
  ], body)

  layout.get('progress').set('50%')
}
