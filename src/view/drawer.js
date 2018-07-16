'use strict'

import {
  Component,
  Container,
  Checkbox,
  Switch,
  Drawer,
  Button,
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
  var layout = new Layout([View, 'drawer', {},
    [Container, 'top', {},
      [Text, 'title', { type: 'title', text: 'Buttons' }],
      [Text, 'title', { text: 'Buttons communicate the action that will occur when the user touches them.' }]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Temporary' }]
      ],
      [Container, 'screen', { css: 'screen-waterfall' },
        [Toolbar, 'head', { fixed: 'fixed', color: 'primary' },
          [Button, 'navi-temporary', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Drawer, 'drawer-temporary', { display: 'flex', direction: 'vertical', css: 'drawer-temporary', type: 'temporary' },
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
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'persistent' }]
      ],
      [Container, 'screen', { css: 'screen-persistent' },

        [Drawer, 'drawer-persistent', { display: 'flex', direction: 'vertical', css: 'drawer-persistent', type: 'persistent' },
          [Toolbar, 'navi-head', { },
            [Button, 'menu-navi-head', { icon: iconNavi, type: 'action' }],
            [Text, 'title', { text: TITLE }]
          ],
          [List, 'navi-list', { flex: '1' }]
        ],
        [Container, 'content', { css: 'content-persistent' },
          [Toolbar, 'head', { display: 'flex', direction: 'horizontal', color: 'primary' },
            [Button, 'navi-persistent', { icon: iconNavi, type: 'action' }],
            [Text, 'title', { text: 'Title' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [Container, 'text-content', { css: 'content-text' },
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
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'permanent' }]
      ],
      [Container, 'screen', { css: 'screen-permanent' },
        [Drawer, 'drawer-permanent', { display: 'flex', direction: 'vertical', css: 'drawer-permanent', type: 'permanent' },
          [Toolbar, 'navi-head', { },
            [Text, 'title', { text: TITLE }]
          ],
          [List, 'navi-list', { flex: '1' }]
        ],
        [Container, 'main', { css: 'container-main' },
          [Toolbar, 'head', { display: 'flex', direction: 'horizontal', color: 'primary' },
            [Button, 'navi-permanent', { icon: iconNavi, type: 'action' }],
            [Text, 'title', { text: 'Title' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [Container, 'content', { css: 'content-permanent' },
            [Container, 'text-content', { css: 'content-text' },
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
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'permanent' }]
      ],
      [Container, 'screen', { css: 'screen-permanent' },
        [Toolbar, 'head', { display: 'flex', direction: 'horizontal', color: 'primary' },
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Container, 'main', { css: 'container-main' },
          [Drawer, 'drawer-permanent', { display: 'flex', direction: 'vertical', css: 'drawer-permanent', type: 'permanent' },
            [List, 'navi-list', { flex: '1' }]
          ],
          [Container, 'content', { css: 'content-permanent' },
            [Container, 'text-content', { css: 'content-text' },
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
      ]
    ]
  ], body)

  var temporary = layout.get('drawer-temporary')

  layout.get('navi-temporary').on('click', function (e) {
    temporary.toggle(e)
  })

  var persistent = layout.get('drawer-persistent')

  layout.get('navi-persistent').on('click', function (e) {
    persistent.toggle(e)
  })

  var permanent = layout.get('drawer-permanent')

  layout.get('navi-permanent').on('click', function (e) {
    permanent.toggle(e)
  })
}
