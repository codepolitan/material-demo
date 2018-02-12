// import components
import {
  Component,
  Container,
  Checkbox,
  Switch,
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

// define contants
const TITLE = 'Material'

/**
 * Application Layout
 */
var layout = [Container, 'app', { display: 'flex', direction: 'vertical' },
  [Toolbar, 'head', { display: 'flex', direction: 'horizontal', type: 'app' },
    [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
    [Text, 'title', { text: TITLE }],
    [Checkbox, 'dark-theme', { text: 'dark theme' }],
    // [Button, 'menu-side', { icon: iconSide, type: 'action' }],
    [Button, 'menu-more', { icon: iconMore, type: 'action' }]
  ],
  [Drawer, 'navi', { display: 'flex', direction: 'vertical', css: 'drawer-temporary', type: 'temporary' },
    [Toolbar, 'navi-head', { type: 'app' },
      [Button, 'menu-navi-head', { icon: iconNavi, type: 'action' }],
      [Text, 'title', { text: TITLE }]
    ],
    [List, 'navi-list', { flex: '1' }]
  ],
  [Component, 'body', { flex: '1', display: 'flex', direction: 'horizontal' },
    [Component, 'main', { display: 'flex', direction: 'vartical', flex: '1' }]
    // [Drawer, 'side', { position: 'left', state: 'closed' }]
  ],
  [Menu, 'more-menu', {},
    [Item, 'item-find', { text: 'Find' }],
    [Divider, 'divider-menu', {}],
    [Item, 'item-copy', { text: 'Copy' }],
    [Item, 'item-paste', { text: 'Paste' }]
  ]
]

export default layout
