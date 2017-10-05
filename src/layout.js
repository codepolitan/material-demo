// import components
import {
  component,
  container,
  button,
  Drawer,
  List,
  Text,
  Menu,
  Toolbar,
  item,
  divider
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
var layout = [container, 'app', { display: 'flex', direction: 'vertical' },
  [component, 'head', { flex: 'none', display: 'flex', direction: 'horizontal' },
    [Toolbar, 'toolbar', { flex: 1, display: 'flex', direction: 'horizontal' },
      [button, 'menu-navi', { icon: iconNavi, type: 'action' }],
      [Text, 'title', { text: TITLE }]
    ],
    [Toolbar, 'desk', { display: 'flex', direction: 'horizontal' },
      [button, 'menu-side', { icon: iconSide, type: 'action' }],
      [button, 'menu-more', { icon: iconMore, type: 'action' }]
    ]
  ],
  [Drawer, 'navi', { css: 'drawer-temporary', type: 'temporary', size: 260 },
    [Toolbar, 'navi-head', { theme: 'dark' },
      [button, 'menu-navi-head', { icon: iconNavi, type: 'action' }],
      [Text, 'title', { text: TITLE }]
    ],
    [List, 'navi-list', { theme: 'dark' }]
  ],
  [component, 'body', { flex: '1', display: 'flex', direction: 'horizontal' },
    [component, 'main', { display: 'flex', direction: 'vartical', flex: '1' }],
    [Drawer, 'side', { position: 'left', state: 'closed' }]
  ],
  [Menu, 'more-menu', {},
    [item, 'item-find', { text: 'Find' }],
    [divider, 'divider-menu', {}],
    [item, 'item-copy', { text: 'Copy' }],
    [item, 'item-paste', { text: 'Paste' }]
  ]
]

export default layout