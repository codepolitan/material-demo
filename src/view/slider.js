'use strict'

import { Layout, container, Slider, component } from 'material'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  new Layout([component, 'slider', {},
    [container, 'hero', {},
      [Slider, '', { width: '300px' }]
    ],
    [container, 'container', {},
      [Slider, 'default', { label: 'Slider', value: 20 }],
      [Slider, 'default', { label: 'Slider discrete', value: 40, type: 'discrete' }],
      [Slider, 'default', { label: 'Diasbled', value: 60, disabled: true }]
    ],
    [container, 'container', { css: 'dark-theme' },
      [Slider, 'default', { label: 'Slider', value: 20 }],
      [Slider, 'default', { label: 'Slider discrete', value: 40, type: 'discrete' }],
      [Slider, 'default', { label: 'Diasbled', value: 60, disabled: true }]
    ]
  ], body)
}