import {
  List,
  Toolbar,
  Button,
  Item,
  Textfield,
  Image,
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

import iconStar from '../icon/star.svg'
import iconAccessibility from '../icon/accessibility.svg'
import iconPhone from '../icon/phone.svg'
import iconHappy from '../icon/happy.svg'
import iconLink from '../icon/link.svg'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var layout = new Layout([Container, 'view-list', {},
    [Container, 'hero', {},
      [List, 'listhero', { label: 'ImageList', type: 'image' }]
    ],
    [Container, 'default', {},

      [Container, 'checkbox-options', {},
        [Checkbox, 'hideinfo', { label: 'hidelabel', style: 'dense' }],
        [Checkbox, 'infoafter', { label: 'Label Below', style: 'dense' }],
        [Checkbox, 'required', { label: 'Required', style: 'dense' }]
      ],
      [Container, 'default', { css: 'container-list', display: 'flex', direction: 'vertical'},
        [Container, 'top', {},
          [Text, 'title', { type: 'title', text: 'Standard' }]
        ],
        [Container, 'screen', { css: '' },
          [Toolbar, 'head', { fixed: 'fixed', color: 'primary' },
            [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
            [Text, 'title', { text: 'Image List' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [List, 'standard', { type: 'image' }]
        ]
      ],
      [Container, 'default', { css: 'container-list', display: 'flex', direction: 'vertical'},
        [Container, 'top', {},
          [Text, 'title', { type: 'title', text: 'Masonnery' }]
        ],
        [Container, 'screen', { css: '' },
          [Toolbar, 'head', { fixed: 'fixed', color: 'primary' },
            [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
            [Text, 'title', { text: 'Image List' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [List, 'masonry', { layout: 'masonry', type: 'image'}]
        ]
      ],
      [Container, 'default', { css: 'container-list', display: 'flex', direction: 'vertical'},
        [Container, 'screen', { css: '' },
          [Toolbar, 'head', { fixed: 'fixed', color: 'primary' },
            [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
            [Text, 'title', { text: 'Image List' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [List, 'second-list', {}]
        ]
      ],
      [Container, 'default', { css: 'container-list', display: 'flex', direction: 'vertical'},
        [Container, 'screen', { css: '' },
          [Toolbar, 'head', { fixed: 'fixed', color: 'primary' },
            [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
            [Text, 'title', { text: 'Image List' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [List, 'third-list', {}]
        ]
      ]
    ]
  ], body)

  var listhero = layout.get('listhero')
  var standard = layout.get('standard')
  var masonry = layout.get('masonry')
  var second = layout.get('second-list')
  var third = layout.get('third-list')

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

  var renderMasonry = {

    /**
     * [render description]
     * @param  {?} info [description]
     * @return {?}      [description]
     */
    render (info) {
      var item

      console.log('---info', info)
      if (info.type === 'divider') {
        item = new Divider()
      } else {
        var photo = '/dist/bgtoolbar.jpg'
        if (info.photo) photo = '/dist/img/photos/' + info.photo

        item = new Image({
          tag: 'li',
          src: photo,
          name: info.name,
          icon: iconStar,
          label: info.text || info.name
        })
      }

     // console.log('item', item)

      var height = Math.floor(Math.random() * 300) + 100

      item.image.style.height = height + 'px'
      item.root.style.height = height + 'px'

      return item
    }

  }

  var renderStandard = {

    /**
     * [render description]
     * @param  {?} info [description]
     * @return {?}      [description]
     */
    render (info) {
      var item
      console.log('---info', info)
      if (info.type === 'divider') {
        item = new Divider()
      } else {
        var photo = '/dist/bgtoolbar.jpg'
        if (info.photo) photo = '/dist/img/photos/' + info.photo

        item = new Image({
          tag: 'li',
          src: photo,
          icon: iconStar,
          name: info.name,
          text: info.text || info.name,
          label: info.text || info.name
        })
      }

      // console.log('item', item)

      // var height = Math.floor(Math.random() * 300) + 30

      // item.image.style.height = height + 'px'
      // item.root.style.height = height + 'px'

      return item
    }

  }

  Object.assign(standard, renderStandard)
  Object.assign(second, renderCheckbox)

  Object.assign(masonry, renderMasonry)
  Object.assign(third, renderSwitch)

  // var list = countries.concat(countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries);
  var list = countries

  console.log('masonry', masonry)

  layout.get('listhero').set('list', list)

  layout.get('standard').set('list', list)
  layout.get('masonry').set('list', list)
  layout.get('second-list').set('list', list)
  layout.get('third-list').set('list', list)

  layout.get('hideinfo').on('change', (state) => {
    console.log('standard', standard)

    if (state) {
      css.add(standard.root, 'hide-info')
      css.add(masonry.root, 'hide-info')
    } else {
      css.remove(standard.root, 'hide-info')
      css.remove(masonry.root, 'hide-info')
      // layout.get('masonry').set('disabled', true)
    }
  })

  layout.get('infoafter').on('change', (state) => {
    console.log('standard', standard)

    if (state) {
      css.add(standard.root, 'info-below')
      css.add(masonry.root, 'info-below')
    } else {
      css.remove(standard.root, 'info-below')
      css.remove(masonry.root, 'info-below')
      // layout.get('masonry').set('disabled', true)
    }
  })

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });
};
