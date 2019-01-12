'use strict'

import {
  AppBar,
  Banner,
  Component,
  Container,
  Checkbox,
  Switch,
  Button,
  Drawer,
  Divider,
  List,
  Layout,
  Text,
  Menu,
  Toolbar,
  Item,
  View
} from 'material'

/**
 * [initTest description]
 * @return {[type]} [description]
 */

import iconNavi from '../icon/navi.svg'
import iconMore from '../icon/more.svg'
import iconApps from '../icon/apps.svg'
import iconSide from '../icon/side.svg'
const TITLE = 'Material'
const CONTENT = 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. \n\n'

export default function (body) {
  var layout = new Layout([View, 'banner', {},
    [Container, 'top', {},
      [Text, 'title', { tag: 'p', type: 'title', text: 'Banner' }],
      [Text, 'title', { text: '...' }]
    ],
    [Container, 'hero', {}
      // [Banner, '', { },
      //   [Text, 'title', { text: 'There was a problem processing the transaction' }],
      //   [Toolbar, 'banner', { display: 'flex', direction: 'horizontal' },
      //     [Component, 'space', { flex: 1 }],
      //     [Button, 'default', { text: 'Fix it', color: 'primary' }],
      //     [Button, 'default', { text: 'Learn more', color: 'primary' }]
      //   ]
      // ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Normal' }],
        [Button, 'showBanner1', { label: 'show banner' }]
      ],
      [Container, 'screen', {},
        [AppBar, 'head', { display: 'flex', direction: 'horizontal', color: 'primary' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Banner, 'banner1', { },
          [Text, 'title', { text: 'There was a problem processing the transaction' }],
          [Toolbar, 'banner', { display: 'flex', direction: 'horizontal' },
            [Component, 'space', { flex: 1 }],
            [Button, 'fixit', { text: 'Fix it', color: 'primary' }],
            [Button, 'learn', { text: 'Learn more', color: 'primary' }]
          ]
        ],
        [Container, 'content', {},
          [Text, '', { tag: 'p', text: CONTENT }],
          [Text, '', { tag: 'p', text: CONTENT }],
          [Text, '', { tag: 'p', text: CONTENT }],
          [Text, '', { tag: 'p', text: CONTENT }],
          [Text, '', { tag: 'p', text: CONTENT }],
          [Text, '', { tag: 'p', text: CONTENT }],
          [Text, '', { tag: 'p', text: CONTENT }]
        ]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'banner with appbar bottom' }],
        [Button, 'showBanner2', { label: 'show banner' }]
      ],
      [Container, 'screen', {},
        [AppBar, 'head', { type: 'bottom', fixed: '1', display: 'flex', direction: 'horizontal', color: 'primary' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Banner, 'banner2', { },
          [Text, 'title', { text: 'There was a problem processing the transaction' }],
          [Toolbar, 'banner', { display: 'flex', direction: 'horizontal' },
            [Component, 'space', { flex: 1 }],
            [Button, 'default', { text: 'Fix it', color: 'primary' }],
            [Button, 'default', { text: 'Learn more', color: 'primary' }]
          ]
        ],
        [Container, 'content', {},
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }]
        ]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Normal' }],
        [Button, 'showBanner3', { label: 'show banner' }]
      ],
      [Container, 'screen', {},
        [AppBar, 'head', { fixed: '1', display: 'flex', direction: 'horizontal', color: 'primary' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Banner, 'banner3', { },
          [Text, 'title', { text: 'There was a problem processing the transaction' }],
          [Toolbar, 'banner', { display: 'flex', direction: 'horizontal' },
            [Component, 'space', { flex: 1 }],
            [Button, 'default', { text: 'Fix it', color: 'primary' }],
            [Button, 'default', { text: 'Learn more', color: 'primary' }]
          ]
        ],
        [Container, 'content', {},
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }],
          [Text, '', { text: CONTENT }]
        ]
      ]
    ]
  ], body)

  layout.get('showBanner1').on('click', () => {
    layout.get('banner1').show()
  })

  layout.get('banner1').on('select', (ev) => {
    console.log('select', ev)
  })

  layout.get('showBanner2').on('click', () => {
    layout.get('banner2').show()
  })

  layout.get('banner2').on('select', (ev) => {
    console.log('select', ev)
  })

  layout.get('showBanner3').on('click', () => {
    layout.get('banner3').show()
  })

  layout.get('banner3').on('select', (ev) => {
    console.log('select', ev)
  })
}
