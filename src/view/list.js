import {
  List,
  Toolbar,
  Button,
  Text,
  Container,
  Checkbox,
  Switch,
  Layout,
  Divider,
  View
  /*, Component, Button */
} from 'material'

import insert from 'material/src/element/insert.js'
import css from 'material/src/module/css.js'
import countries from '../data/list.json'

import iconNavi from '../icon/navi.svg'
import iconMore from '../icon/more.svg'
import iconApps from '../icon/apps.svg'
import iconSide from '../icon/side.svg'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var layout = new Layout([Container, 'view-list', {},
    [Container, 'default', {},
      [View, 'default', { css: 'container-list', display: 'flex', direction: 'vertical'},
        [Toolbar, 'toolbar', { type: 'app', display: 'flex', direction: 'horizontal' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'topics' }],
          [Divider],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [List, 'first-list', {}]
      ],
      [View, 'default', { css: 'container-list', display: 'flex', direction: 'vertical'},
        [Toolbar, 'toolbar', { type: 'app', display: 'flex', direction: 'horizontal' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'topics' }]
        ],
        [List, 'second-list', {}]
      ],
      [View, 'default', { css: 'container-list', display: 'flex', direction: 'vertical'},
        [Toolbar, 'toolbar', { type: 'app', display: 'flex', direction: 'horizontal' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'topics' }]
        ],
        [List, 'third-list', {}]
      ]
    ],
    [Container, 'dark', { css: 'dark-theme' },
      [List, 'first-list-dark', {}],
      [List, 'second-list-dark', {}],
      [List, 'third-list-dark', {}]
    ]
  ], body)

  var first = layout.get('first-list')
  var second = layout.get('second-list')
  var third = layout.get('third-list')

  var firstDark = layout.get('first-list-dark')
  var secondDark = layout.get('second-list-dark')
  var thirdDark = layout.get('third-list-dark')

  var renderCheckbox = {
    render: (info) => {
      var item

      if (info.type === 'divider') {
        item = new Divider()
      } else {
        item = new Checkbox({
          label: info.name,
          value: info.name
        })
      }

      return item
    }
  }

  var renderSwitch = {
    render: (info) => {
      var item

      if (info.type === 'divider') {
        item = new Divider()
      } else {
        item = new Switch({
          label: info.name,
          value: info.name
        })
      }

      return item
    }
  }

  Object.assign(second, renderCheckbox)
  Object.assign(third, renderSwitch)
  Object.assign(secondDark, renderCheckbox)
  Object.assign(thirdDark, renderSwitch)

  // var list = countries.concat(countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries);
  var list = countries

  layout.get('first-list').set('list', list)
  layout.get('second-list').set('list', list)
  layout.get('third-list').set('list', list)

  layout.get('first-list-dark').set('list', list)
  layout.get('second-list-dark').set('list', list)
  layout.get('third-list-dark').set('list', list)

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });
};
