'use strict'

// import material components
import {
  component,
  container,
  Checkbox,
  button
} from 'material'

import build from 'material/src/component/build'
import css from 'material/src/module/css'

console.log('layout', build)

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function(body) {
  var layout = build([component, 'demo-button', {},
    [container, 'hero', {},
      [button, 'first', { text: 'Flat' }],
      [button, 'second', { text: 'Raised', type: 'raised', color: 'primary' }]
    ],
    [container, 'containerbutton', {},
      [container, 'options', {},
        [Checkbox, 'darktheme', { label: 'Dark Theme' }]
      ],
      [container, 'button-default', {},
        [container, 'buttons-container', {},
          [button, 'default', { text: 'default' }],
          [button, 'default-compact', { text: 'Compact', style: 'compact' }],
          [button, 'default-dense', { text: 'Dense', style: 'dense' }],
          [button, 'default-densecompact', { text: 'Compact dense', style: 'compact dense' }],
          [button, 'default-link', { text: 'Link' }]
        ],
        [container, 'buttons-raised', {},
          [button, 'raised', { text: 'raised', type: 'raised' }],
          [button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact' }],
          [button, 'raised-dense', { text: 'Dense', type: 'raised', style: 'dense' }],
          [button, 'raised-densecompact', { text: 'Compact dense', type: 'raised', style: 'compact dense' }],
          [button, 'raised-link', { text: 'Link', type: 'raised' }]
        ],
        [container, 'buttons-raised-primary', {},
          [button, 'raised', { text: 'raised primary', type: 'raised', color: 'primary' }],
          [button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact', color: 'primary' }],
          [button, 'raised-dense', { text: 'Dense', style: 'dense', type: 'raised', color: 'primary' }],
          [button, 'raised-densecompact', { text: 'Compact dense', style: 'dense compact', type: 'raised', color: 'primary' }],
          [button, 'raised-link', { text: 'Link', type: 'raised', color: 'primary' }]
        ],
        [container, 'buttons-raised-secondary', {},
          [button, 'raised', { text: 'raised secondary', type: 'raised', color: 'secondary' }],
          [button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact', color: 'secondary' }],
          [button, 'raised-dense', { text: 'Dense', type: 'raised', style: 'dense', color: 'secondary' }],
          [button, 'raised-densecompact', { text: 'Compact dense', type: 'raised', style: 'compact dense', color: 'secondary' }],
          [button, 'raised-link', { text: 'Link', type: 'raised', color: 'secondary' }]
        ]
      ]
    ]
  ], body)

  layout.get('darktheme').on('change', function(checked) {
    console.log('darktheme', checked, layout.get('containerbutton'))
    if (checked) {
      css.add(layout.get('containerbutton').wrapper, 'dark-theme')
    } else {
      css.remove(layout.get('containerbutton').wrapper, 'dark-theme')
    }
  })
}