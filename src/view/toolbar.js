'use strict'

import {
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
const CONTENT = 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.'

export default function (body) {
  var layout = new Layout([View, 'toolbar', {},
    [Container, 'top', {},
      [Text, 'title', { type: 'title', text: 'Toolbar' }],
      [Text, 'title', { text: '...' }]
    ],
    [Container, 'hero', {},
      [Toolbar, 'head', { display: 'flex', direction: 'horizontal', color: 'primary' },
        [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
        [Text, 'title', { text: TITLE }],
        [Button, 'menu-more', { icon: iconMore, type: 'action' }]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Normal' }]
      ],
      [Container, 'screen', {},
        [Toolbar, 'head', { display: 'flex', direction: 'horizontal', color: 'primary' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Fixed' }]
      ],
      [Container, 'screen', { css: 'fixed-screen' },
        [Toolbar, 'head', { fixed: 'fixed', color: 'primary' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Flexile' }]
      ],
      [Container, 'screen', { css: 'flexile-screen' },
        [Toolbar, 'head', { type: 'flexible', height: 224, display: 'flex', direction: 'vertical', color: 'primary' },
          [Container, 'section', { css: 'menu', display: 'flex', direction: 'horizontal' },
            [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
            [Divider, 'section', { flex: 1 }],
            [Button, 'menu-apps', { icon: iconApps, type: 'action' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [Container, 'section', { },
            [Text, 'title', { css: 'pin-bottom', type: 'title', text: 'Title' }]
          ]
        ],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }]

      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Flexible' }]
      ],
      [Container, 'screen', { css: 'screen-waterfall' },
        [Toolbar, 'waterfalltollbar', { waterfall: 1, height: 224, flexible: 1, fixed: 1, display: 'flex', direction: 'vertical', color: 'primary' },
          [Container, 'section', { css: 'menu', flex: 'none', display: 'flex', direction: 'horizontal' },
            [Button, 'menu-water', { icon: iconNavi, type: 'action' }],
            [Divider, 'section', { flex: 1 }],
            [Button, 'menu-apps', { icon: iconApps, type: 'action' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [Container, 'section', { flex: 'none', position: 'absolute', bottom: '1px' },
            [Text, 'title', { css: 'pin-bottom', type: 'title', text: 'Title' }]
          ]
        ],
        [Drawer, 'navi-water', { display: 'flex', direction: 'vertical', css: 'drawer-temporary', type: 'temporary' },
          [Toolbar, 'navi-head', { type: 'app' },
            [Button, 'menu-navi-head', { icon: iconNavi, type: 'action' }],
            [Text, 'title', { text: TITLE }]
          ],
          [List, 'navi-list', { flex: '1' }]
        ],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }]

      ]
    ]
  ], body)

  var navi = layout.get('navi-water')

  layout.get('menu-water').on('click', function (e) {
    navi.toggle(e)
  })
}
