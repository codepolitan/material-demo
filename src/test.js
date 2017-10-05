import {
  button,
  component,
  Card,
  Checkbox,
  Dialog,
  divider,
  Drawer,
  Form,
  Image,
  Layout,
  List,
  item,
  Menu,
  Slider,
  Switch,
  Text,
  Textfield,
  Toolbar,
  Layout2
} from 'material'

// import Material from 'material';
// console.log('Material', Material);

import iconMenu from './icon/menu.svg'
import iconMore from './icon/more.svg'
import iconApps from './icon/apps.svg'

console.log('log')

document.addEventListener('DOMContentLoaded', function() {
  var schema = [component, 'demo', { display: 'flex', direction: 'vertical' },
    [component, 'head', { display: 'flex', direction: 'horizontal' },
      [Toolbar, 'toolbar', { flex: 1, display: 'flex', direction: 'horizontal' },
        [button, 'menu-navi', { icon: iconMenu, type: 'action' }],
        [Text, 'app-title', { text: 'Material Components' }]
      ],
      [Toolbar, 'desk', { display: 'flex', direction: 'horizontal' },
        [button, 'menu-more', { icon: iconMore, type: 'action' }]
      ]
    ],
    [Drawer, 'navi', { css: 'drawer-temporary', type: 'temporary', size: '280px' },
      [component, 'navi-head', { theme: 'dark' },
        [Text, 'app-title', { text: 'Material Components' }]
      ],
      [List, 'navi-list', { theme: 'dark' }]
    ],
    [component, 'body', { display: 'flex', direction: 'horizontal', flex: '1' },
      [List, 'main-list', { flex: '1' }]
    ],
    [Menu, 'more-menu', {},
      [item, 'item-find', { text: 'Find' }],
      [divider, 'divider-menu', {}],
      [item, 'item-copy', { text: 'Copy' }],
      [item, 'item-paste', { text: 'Paste' }]
    ]
  ]

  var layout = new Layout2(schema, document.body)

  var moreButton = layout.get('menu-more').on('click', (e) => {
    layout.get('more-menu').show(e)
  })

  var naviMenu = layout.get('menu-navi')

  naviMenu.on('click', (e) => {
    layout.get('navi').open()
  })
})