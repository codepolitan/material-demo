// import components
import {
  Component,
  Container,
  Button,
  Drawer,
  List,
  Text,
  Menu,
  Toolbar,
  Item,
  Divider
} from 'material'

// import icons
import iconNavi from './icon/navi.svg'
import iconMore from './icon/more.svg'
import iconApps from './icon/apps.svg'
import iconSide from './icon/side.svg'

const TITLE = 'Material'

/**
 * Application Layout
 */
var layout = [Container, 'app', { display: 'flex', direction: 'vertical' },
  [Component, 'head', { flex: 'none', display: 'flex', direction: 'horizontal' },
    [Toolbar, 'toolbar', { flex: 1, display: 'flex', direction: 'horizontal' },
      [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
      [Text, 'title', { text: TITLE }]
    ],
    [Toolbar, 'desk', { display: 'flex', direction: 'horizontal' },
      [Button, 'menu-side', { icon: iconSide, type: 'action' }],
      [Button, 'menu-more', { icon: iconMore, type: 'action' }]
    ]
  ],
  [Drawer, 'navi', { css: 'drawer-temporary', type: 'temporary', size: 260 },
    [Toolbar, 'navi-head', { theme: 'dark' },
      [Button, 'menu-navi-head', { icon: iconNavi, type: 'action' }],
      [Text, 'title', { text: TITLE }]
    ],
    [List, 'navi-list', { theme: 'dark' }]
  ],
  [Component, 'body', { flex: '1', display: 'flex', direction: 'horizontal' },
    [Component, 'main', { display: 'flex', direction: 'vartical', flex: '1' }],
    [Drawer, 'side', { position: 'left', state: 'closed' }]
  ],
  [Menu, 'more-menu', {},
    [Item, 'item-find', { text: 'Find' }],
    [Divider, 'divider-menu', {}],
    [Item, 'item-copy', { text: 'Copy' }],
    [Item, 'item-paste', { text: 'Paste' }]
  ]
]

export default layout
