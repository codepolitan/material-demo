'use strict'

import Layout from 'material/src/layout'
import View from 'material/src/view'
import Component from 'material/src/component'
import Container from 'material/src/container'

/**
 * This view present he ripple module
 * @return {HTMLElement} The view's container
 */
export default function (body) {
  console.log('init elevation layout')
  var layout = new Layout([View, 'elevation', {},
    [Container, 'hero', {},
      [Component, 'hero', { elevation: 1, text: 'click on me' }],
      [Component, 'hero', { elevation: 4, text: 'click on me' }],
      [Component, 'hero', { elevation: 7, text: 'click on me' }],
      [Component, 'hero', { elevation: 11, text: 'click on me' }],
      [Component, 'hero', { elevation: 15, text: 'click on me' }]
    ],
    [Container, '', {},
      [Component, '', { elevation: 1, text: 'click on me' }],
      [Component, '', { elevation: 2, text: 'click on me' }],
      [Component, '', { elevation: 3, text: 'click on me' }],
      [Component, '', { elevation: 4, text: 'click on me' }],
      [Component, '', { elevation: 5, text: 'click on me' }],
      [Component, '', { elevation: 6, text: 'click on me' }],
      [Component, '', { elevation: 7, text: 'click on me' }],
      [Component, '', { elevation: 8, text: 'click on me' }],
      [Component, '', { elevation: 9, text: 'click on me' }],
      [Component, '', { elevation: 10, text: 'click on me' }],
      [Component, '', { elevation: 11, text: 'click on me' }],
      [Component, '', { elevation: 12, text: 'click on me' }],
      [Component, '', { elevation: 13, text: 'click on me' }],
      [Component, '', { elevation: 14, text: 'click on me' }],
      [Component, '', { elevation: 15, text: 'click on me' }],
      [Component, '', { elevation: 16, text: 'click on me' }],
      [Component, '', { elevation: 17, text: 'click on me' }],
      [Component, '', { elevation: 18, text: 'click on me' }],
      [Component, '', { elevation: 19, text: 'click on me' }],
      [Component, '', { elevation: 20, text: 'click on me' }],
      [Component, '', { elevation: 21, text: 'click on me' }],
      [Component, '', { elevation: 22, text: 'click on me' }],
      [Component, '', { elevation: 23, text: 'click on me' }],
      [Component, '', { elevation: 24, text: 'click on me' }]
    ]
  ], body)

  console.log('layout', layout)
}
