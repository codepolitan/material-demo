// import components
import {
  AppBar,
  Button,
  Drawer,
  List,
  Text,
  Menu,
  Toolbar,
  Checkbox,
  View
} from 'material'

// import icons
import iconNavi from './icon/navi.svg'
import iconMore from './icon/more.svg'
// import iconApps from './icon/apps.svg'
// import iconSide from './icon/side.svg'

// define contants
const TITLE = 'Material'

console.log('layout --', document.body)

/**
 * Application Layout
 */
var layout = [
  [AppBar, 'head', { type: 'app', display: 'flex', direction: 'horizontal', color: 'primary' },
    [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
    [Text, 'title', { css: 'pin-bottom', text: TITLE }],
    [Button, 'menu-more', { icon: iconMore, type: 'action' }]
  ],
  [Drawer, 'navi', { fixed: 1, css: 'drawer-temporary', display: 'flex', direction: 'horizontal', type: 'temporary' },
    [AppBar, 'navi-head', { fixed: 1, flexible: 1 },
      [Button, 'menu-navi-head', { icon: iconNavi, type: 'action' }],
      [Text, 'title', { text: TITLE }]
    ],
    [List, 'navi-list', { flex: '1' }]
  ],
  [View, 'main', { position: 'fixed' }],
  [Menu, 'more-menu', { position: 'fixed' },
    [Checkbox, 'darktheme', { text: 'Dark theme' }],
    [Checkbox, 'rtl', { text: 'RTL' }]
  ]
]

export default layout
