'use strict'

// import material components
import {
  Container,
  Checkbox,
  Button,
  Text
} from 'material'

import Layout from 'material/src/layout'
import css from 'material/src/module/css'

import iconStar from '../icon/star.svg'
import iconAccessibility from '../icon/accessibility.svg'
import iconPhone from '../icon/phone.svg'
import iconHappy from '../icon/happy.svg'
import iconLink from '../icon/link.svg'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var layout = new Layout([Container, 'button', {},
    [Container, 'hero', {},
      [Button, 'first', { text: 'Flat' }],
      [Button, 'second', { text: 'Raised', type: 'raised', color: 'primary' }],
      [Button, 'third', { icon: iconStar, type: 'action' }],
      [Button, 'fourth', { icon: iconStar, text: 'text' }],
      [Button, 'fifth', { icon: iconStar, type: 'floating', color: 'secondary' }]
    ],
    [Container, 'containerbutton', {},
      [Container, 'options', {},
        [Checkbox, 'darktheme', { name: 'darktheme', label: 'Dark Theme' }]
      ],
      [Container, 'button-default', {},
        [Text, 'standard-button', { text: 'Standard Button', type: 'subheading2' }],
        [Container, 'buttons-container', {},
          [Button, 'default', { text: 'default' }],
          [Button, 'default-icontext', { icon: iconHappy, text: 'icon text' }],
          [Button, 'default-compact', { text: 'Compact', style: 'compact' }],
          [Button, 'default-dense', { text: 'Dense', style: 'dense' }],
          [Button, 'default-densecompact', { text: 'Compact dense', style: 'compact dense' }],
          [Button, 'default-link', { text: 'Link', tag: 'a' }]
        ],
        [Container, 'buttons-container', {},
          [Button, 'default', { text: 'default', color: 'primary' }],
          [Button, 'default-icontext', { icon: iconHappy, text: 'icon text', color: 'primary' }],
          [Button, 'default-compact', { text: 'Compact', style: 'compact', color: 'primary' }],
          [Button, 'default-dense', { text: 'Dense', style: 'dense', color: 'primary' }],
          [Button, 'default-densecompact', { text: 'Compact dense', style: 'compact dense', color: 'primary' }],
          [Button, 'default-link', { text: 'Link', color: 'primary', tag: 'a' }]
        ],
        [Container, 'buttons-container', {},
          [Button, 'default', { text: 'default', color: 'secondary' }],
          [Button, 'default-icontext', { icon: iconHappy, text: 'icon text', color: 'secondary' }],
          [Button, 'default-compact', { text: 'Compact', style: 'compact', color: 'secondary' }],
          [Button, 'default-dense', { text: 'Dense', style: 'dense', color: 'secondary' }],
          [Button, 'default-densecompact', { text: 'Compact dense', style: 'compact dense', color: 'secondary' }],
          [Button, 'default-link', { text: 'Link', color: 'secondary', tag: 'a' }]
        ],
        [Text, 'raised-button', { text: 'Raised Button', type: 'subheading2' }],
        [Container, 'buttons-raised', {},
          [Button, 'raised', { text: 'raised', type: 'raised' }],
          [Button, 'default-icontext', { icon: iconHappy, type: 'raised', text: 'icon text' }],
          [Button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact' }],
          [Button, 'raised-dense', { text: 'Dense', type: 'raised', style: 'dense' }],
          [Button, 'raised-densecompact', { text: 'Compact dense', type: 'raised', style: 'compact dense' }],
          [Button, 'raised-link', { text: 'Link', type: 'raised' }],
          [Button, 'raised-link', { icon: iconStar, type: 'raised' }]
        ],
        [Container, 'buttons-raised-primary', {},
          [Button, 'raised', { text: 'raised primary', type: 'raised', color: 'primary' }],
          [Button, 'default-icontext', { icon: iconHappy, type: 'raised', text: 'icon text', color: 'primary' }],
          [Button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact', color: 'primary' }],
          [Button, 'raised-dense', { text: 'Dense', style: 'dense', type: 'raised', color: 'primary' }],
          [Button, 'raised-densecompact', { text: 'Compact dense', style: 'dense compact', type: 'raised', color: 'primary' }],
          [Button, 'raised-link', { text: 'Link', type: 'raised', color: 'primary' }],
          [Button, 'raised-link', { icon: iconStar, type: 'raised', color: 'primary' }]
        ],
        [Container, 'buttons-raised-secondary', {},
          [Button, 'raised', { text: 'raised secondary', type: 'raised', color: 'secondary' }],
          [Button, 'default-icontext', { icon: iconHappy, type: 'raised', text: 'icon text', color: 'secondary' }],
          [Button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact', color: 'secondary' }],
          [Button, 'raised-dense', { text: 'Dense', type: 'raised', style: 'dense', color: 'secondary' }],
          [Button, 'raised-densecompact', { text: 'Compact dense', type: 'raised', style: 'compact dense', color: 'secondary' }],
          [Button, 'raised-link', { text: 'Link', type: 'raised', color: 'secondary' }]
        ],
        [Text, 'action-button', { text: 'Action Button', type: 'subheading2' }],
        [Container, 'buttons-action', {},
          [Button, 'action', { icon: iconStar, type: 'action' }],
          [Button, 'action-compact', { icon: iconHappy, type: 'action', style: 'compact' }],
          [Button, 'action-dense', { icon: iconPhone, type: 'action', style: 'dense' }],
          [Button, 'action-densecompact', { icon: iconAccessibility, type: 'action', style: 'compact dense' }],
          [Button, 'action-link', { icon: iconLink, type: 'action' }]
        ],
        [Container, 'buttons-action', {},
          [Button, 'action', { icon: iconStar, type: 'action', color: 'primary' }],
          [Button, 'action-compact', { icon: iconHappy, type: 'action', style: 'compact', color: 'primary' }],
          [Button, 'action-dense', { icon: iconPhone, type: 'action', style: 'dense', color: 'primary' }],
          [Button, 'action-densecompact', { icon: iconAccessibility, type: 'action', style: 'compact dense', color: 'primary' }],
          [Button, 'action-link', { icon: iconLink, type: 'action', color: 'primary' }]
        ],
        [Container, 'buttons-action-secondary', {},
          [Button, 'action', { icon: iconStar, type: 'action', color: 'secondary' }],
          [Button, 'action-compact', { icon: iconHappy, type: 'action', style: 'compact', color: 'secondary' }],
          [Button, 'action-dense', { icon: iconPhone, type: 'action', style: 'dense', color: 'secondary' }],
          [Button, 'action-densecompact', { icon: iconAccessibility, type: 'action', style: 'compact dense', color: 'secondary' }],
          [Button, 'action-link', { icon: iconLink, type: 'action', color: 'secondary' }]
        ],
        [Text, 'floating-button', { text: 'Floating Button', type: 'subheading2' }],
        [Container, 'buttons-floating', {},
          [Button, 'floating', { icon: iconStar, type: 'floating' }],
          [Button, 'floating-compact', { icon: iconHappy, type: 'floating', style: 'compact' }],
          [Button, 'floating-dense', { icon: iconPhone, type: 'floating', style: 'dense' }],
          [Button, 'floating-densecompact', { icon: iconAccessibility, type: 'floating', style: 'compact dense' }],
          [Button, 'floating-link', { icon: iconLink, type: 'floating', tag: 'a' }]
        ],
        [Container, 'buttons-floating', {},
          [Button, 'floating', { icon: iconStar, type: 'floating', color: 'primary' }],
          [Button, 'floating-compact', { icon: iconHappy, type: 'floating', style: 'compact', color: 'primary' }],
          [Button, 'floating-dense', { icon: iconPhone, type: 'floating', style: 'dense', color: 'primary' }],
          [Button, 'floating-densecompact', { icon: iconAccessibility, type: 'floating', style: 'compact dense', color: 'primary' }],
          [Button, 'floating-link', { icon: iconLink, type: 'floating', color: 'primary' }]
        ],
        [Container, 'buttons-floating-secondary', {},
          [Button, 'floating', { icon: iconStar, text: 'floating secondary', type: 'floating', color: 'secondary' }],
          [Button, 'floating-compact', { icon: iconHappy, text: 'Compact', type: 'floating', style: 'compact', color: 'secondary' }],
          [Button, 'floating-dense', { icon: iconPhone, text: 'Dense', type: 'floating', style: 'dense', color: 'secondary' }],
          [Button, 'floating-densecompact', { icon: iconAccessibility, type: 'floating', style: 'compact dense', color: 'secondary' }],
          [Button, 'floating-link', { icon: iconLink, type: 'floating', color: 'secondary' }]
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
      css.add(layout.get('containerbutton').root, 'dark-theme')
    } else {
      css.remove(layout.get('containerbutton').root, 'dark-theme')
    }
  })
}
