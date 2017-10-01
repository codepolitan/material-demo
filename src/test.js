import {
  Button,
  Component,
  Card,
  Checkbox,
  Dialog,
  Divider,
  Drawer,
  Form,
  Image,
  Layout,
  List,
  Item,
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
  var schema = [Component, 'demo', { display: 'flex', direction: 'vertical' },
    [Component, 'head', { display: 'flex', direction: 'horizontal' },
      [Toolbar, 'toolbar', { flex: 1, display: 'flex', direction: 'horizontal' },
        [Button, 'menu-navi', { icon: iconMenu, type: 'action' }],
        [Text, 'app-title', { text: 'Material Components' }]
      ],
      [Toolbar, 'desk', { display: 'flex', direction: 'horizontal' },
        [Button, 'menu-more', { icon: iconMore, type: 'action' }]
      ]
    ],
    [Drawer, 'navi', { css: 'drawer-temporary', type: 'temporary', size: '280px' },
      [Component, 'navi-head', { theme: 'dark' },
        [Text, 'app-title', { text: 'Material Components' }]
      ],
      [List, 'navi-list', { theme: 'dark' }]
    ],
    [Component, 'body', { display: 'flex', direction: 'horizontal', flex: '1' },
      [List, 'main-list', { flex: '1' }]
    ],
    [Menu, 'more-menu', {},
      [Item, 'item-find', { text: 'Find' }],
      [Divider, 'divider-menu', {}],
      [Item, 'item-copy', { text: 'Copy' }],
      [Item, 'item-paste', { text: 'Paste' }]
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