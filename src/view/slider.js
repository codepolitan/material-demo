'use strict'

import { Layout, Container, Slider, Component } from 'material'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  new Layout([Component, 'slider', {},
    [Container, 'hero', {},
      [Slider, '', { width: '300px' }]
    ],
    [Container, 'container', {},
      [Slider, 'default', { label: 'Slider', value: 20 }],
      [Slider, 'default', { label: 'Slider discrete', value: 40, type: 'discrete' }],
      [Slider, 'default', { label: 'Diasbled', value: 60, disabled: true }]
    ],
    [Container, 'container', { css: 'dark-theme' },
      [Slider, 'default', { label: 'Slider', value: 20 }],
      [Slider, 'default', { label: 'Slider discrete', value: 40, type: 'discrete' }],
      [Slider, 'default', { label: 'Diasbled', value: 60, disabled: true }]
    ]
  ], body)
}