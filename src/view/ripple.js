'use strict'

import Layout from 'material/src/layout'
import Button from 'material/src/button'
import Container from 'material/src/container'
import View from 'material/src/view'

import ripple from 'material/src/component/ripple'

/**
 * This view present he ripple module
 * @return {HTMLElement} The view's container
 */
export default function (body) {
  console.log('init ripple layout')
  var layout = new Layout([View, 'ripple', {},
    [Container, 'hero', {},
      [Button, 'button-hero', { label: 'click on me' }]
    ]
  ], body)

  console.log('layout', layout)
}
