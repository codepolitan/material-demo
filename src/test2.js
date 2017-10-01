import {
  Button,
  Component,
  Card,

  Checkbox,
  Container,
  Dialog,
  Divider,
  Drawer,
  Form,
  Image,
  Layout,
  List,
  Menu,
  Slider,
  Switch,
  Text,
  Textfield,
  Toolbar,
  Layout2
} from 'material'

import iconMenu from './icon/menu.svg'
import iconMore from './icon/more.svg'
import iconApps from './icon/apps.svg'

document.addEventListener('DOMContentLoaded', function() {
  var schema = [Container, 'demo', { display: 'flex', direction: 'horizontal' },
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
      [Component, 'navi-head', { theme: 'dark' }],
      [List, 'navi-list', { theme: 'dark' }]
    ],
    [Component, 'body', { display: 'flex', direction: 'horizontal', flex: '1' },
      [List, 'main-list', { flex: '1' }]
    ]
  ]

  var layout = new Layout2(schema, document.body)
  // var layout = new Layout({
  //   component: Component,
  //   name: 'demo',
  //   display: 'flex',
  //   direction: 'vertical',
  //   components: [{
  //     name: 'head',
  //     display: 'flex',
  //     components: [{
  //       flex: 1,
  //       display: 'flex',
  //       direction: 'horizontal',
  //       name: 'toolbar',
  //       component: Component,
  //       options: {
  //         css: 'material-toolbar'
  //       },
  //       components: [{
  //         name: 'menu-navi',
  //         component: Button,
  //         options: {
  //           icon: iconMenu,
  //           type: 'action',
  //           label: null
  //         }
  //       }, {
  //         name: 'apptitle',
  //         component: Text,
  //         text: 'Material Components',

  //       }]
  //     }, {
  //       name: 'desk',
  //       component: Component,
  //       options: {
  //         css: 'material-toolbar'
  //       },
  //       components: [{
  //         name: 'more',
  //         component: Button,
  //         options: {
  //           icon: iconMore,
  //           type: 'action',
  //           label: null
  //         }
  //       }]
  //     }]
  //   }, {
  //     name: 'navi',
  //     component: Drawer,
  //     type: 'temporary',
  //     options: {
  //       css: 'drawer-temporary',
  //       type: 'temporary',
  //       size: '280px'
  //     },
  //     components: [{
  //       name: 'navi-head',
  //       component: Component,
  //       options: {
  //         theme: 'dark'
  //       },
  //       components: [{
  //         component: Text,
  //         text: 'Categories',
  //         type: 'body2',
  //         options: {
  //           css: 'text-adjust'
  //         }

  //       }]
  //     }, {
  //       name: 'navi-list',
  //       component: List
  //     }]
  //   }, {
  //     name: 'body',
  //     display: 'flex',
  //     direction: 'horizontal',
  //     flex: '1',
  //     components: [{
  //       component: List,
  //       name: 'main-list',
  //       flex: '1'
  //     }]
  //   }, {
  //     component: Menu
  //   }]
  // }).insert(document.body);

  var naviMenu = layout.get('menu-navi')

  console.log('layout', layout)

  naviMenu.on('click', (e) => {
    layout.get('navi').open()
  })
})