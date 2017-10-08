'use strict'

// import material components
import {
  Component,
  Container,
  Checkbox,
  Button
} from 'material'

import Layout from 'material/src/layout'
import css from 'material/src/module/css'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var layout = new Layout([Component, 'demo-button', {},
    [Container, 'hero', {},
      [Button, 'first', { text: 'Flat' }],
      [Button, 'second', { text: 'Raised', type: 'raised', color: 'primary' }]
    ],
    [Container, 'containerbutton', {},
      [Container, 'options', {},
        [Checkbox, 'darktheme', { label: 'Dark Theme' }]
      ],
      [Container, 'button-default', {},
        [Container, 'buttons-container', {},
          [Button, 'default', { text: 'default' }],
          [Button, 'default-compact', { text: 'Compact', style: 'compact' }],
          [Button, 'default-dense', { text: 'Dense', style: 'dense' }],
          [Button, 'default-densecompact', { text: 'Compact dense', style: 'compact dense' }],
          [Button, 'default-link', { text: 'Link' }]
        ],
        [Container, 'buttons-raised', {},
          [Button, 'raised', { text: 'raised', type: 'raised' }],
          [Button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact' }],
          [Button, 'raised-dense', { text: 'Dense', type: 'raised', style: 'dense' }],
          [Button, 'raised-densecompact', { text: 'Compact dense', type: 'raised', style: 'compact dense' }],
          [Button, 'raised-link', { text: 'Link', type: 'raised' }]
        ],
        [Container, 'buttons-raised-primary', {},
          [Button, 'raised', { text: 'raised primary', type: 'raised', color: 'primary' }],
          [Button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact', color: 'primary' }],
          [Button, 'raised-dense', { text: 'Dense', style: 'dense', type: 'raised', color: 'primary' }],
          [Button, 'raised-densecompact', { text: 'Compact dense', style: 'dense compact', type: 'raised', color: 'primary' }],
          [Button, 'raised-link', { text: 'Link', type: 'raised', color: 'primary' }]
        ],
        [Container, 'buttons-raised-secondary', {},
          [Button, 'raised', { text: 'raised secondary', type: 'raised', color: 'secondary' }],
          [Button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact', color: 'secondary' }],
          [Button, 'raised-dense', { text: 'Dense', type: 'raised', style: 'dense', color: 'secondary' }],
          [Button, 'raised-densecompact', { text: 'Compact dense', type: 'raised', style: 'compact dense', color: 'secondary' }],
          [Button, 'raised-link', { text: 'Link', type: 'raised', color: 'secondary' }]
        ]
      ]
    ]
  ], body)

  var component = layout.get()

  layout.get('default').on('click', (e) => {
    console.log('click', e, layout.get('default'))
  })

  layout.get('darktheme').on('change', function (checked) {
    console.log('darktheme', checked, layout.get('containerbutton'))
    if (checked) {
      css.add(layout.get('containerbutton').wrapper, 'dark-theme')
    } else {
      css.remove(layout.get('containerbutton').wrapper, 'dark-theme')
    }
  })
}
