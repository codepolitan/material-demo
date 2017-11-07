'use strict'

import Card from 'material/src/card.js'

import Component from 'material/src/component.js'
import Container from 'material/src/container.js'
import View from 'material/src/view.js'
import Button from 'material/src/button.js'
import Text from 'material/src/text.js'
// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var view = new View({
    name: 'card'
  }).insert(body)

  var hero = new Container({
    name: 'hero'
  }).insert(view)

  var container = new Container({
    name: 'card'
  }).insert(view)

  var card = new Card({
    layout: [Component, 'simple-card', { display: 'flex', direction: 'vertical' },
      [Component, 'body', { display: 'flex', direction: 'vertical' },
        [Text, 'title', { text: 'title', type: 'title' }],
        [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
      ],
      [Component, 'action', { },
        [Button, 'action1', { text: 'action 1' }],
        [Button, 'action2', { text: 'action 2' }]
      ]
    ]
  }).insert(hero)

  var card2 = new Card({
    layout: [Component, 'simple-card-avatar', { display: 'flex', direction: 'vertical' },
      [Component, 'visual', { display: 'flex'}],
      [Component, 'body', { display: 'flex', direction: 'vertical'},
        [Text, 'title', { text: 'title', type: 'title' }],
        [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
      ],
      [Component, 'action', { },
        [Button, 'action1', { text: 'action 1' }],
        [Button, 'action2', { text: 'action 2' }]
      ]
    ]
  }).insert(container)

  var card3 = new Card({
    layout: [Component, 'simple-card-avatar', { display: 'flex', direction: 'vertical' },
      [Component, 'head', { display: 'flex', direction: 'horizontal'},
        [Component, 'avatar', { flex: 'none' }],
        [Component, 'info', { css: 'text-adjust', display: 'flex', direction: 'vertical'},
          [Text, 'firstname', { text: 'Nicolas', css: 'text-adjust'}],
          [Text, 'lastname', { text: 'Tesla', css: 'text-adjust' }]
        ]
      ],
      [Component, 'visual', { display: 'flex'}],
      [Component, 'body', { display: 'flex', direction: 'vertical'},
        [Text, 'title', { text: 'title', type: 'title' }],
        [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
      ],
      [Component, 'action', { },
        [Button, 'action1', { text: 'action 1' }],
        [Button, 'action2', { text: 'action 2' }]
      ]
    ]
  }).insert(container)

  var card4 = new Card({
    layout: [Component, 'simple-card-avatar', { display: 'flex', direction: 'vertical' },
      [Component, 'head', { display: 'flex', direction: 'horizontal'},
        [Component, 'avatar', { flex: 'none' }],
        [Component, 'info', { css: 'text-adjust', display: 'flex', direction: 'vertical'},
          [Text, 'firstname', { text: 'Nicolas', css: 'text-adjust'}],
          [Text, 'lastname', { text: 'Tesla', css: 'text-adjust' }]
        ]
      ],
      [Component, 'body', { display: 'flex', direction: 'vertical'},
        [Text, 'title', { text: 'title', type: 'title' }],
        [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
      ],
      [Component, 'action', { },
        [Button, 'action1', { text: 'action 1' }],
        [Button, 'action2', { text: 'action 2' }]
      ]
    ]
  }).insert(container)

  var card5 = new Card({
    layout: [Component, 'simple-card-square', { display: 'flex', direction: 'vertical' },
      [Component, 'head', { display: 'flex', direction: 'horizontal'},
        [Component, 'info', { flex: '1', display: 'flex', direction: 'vertical'},
          [Text, 'title', { text: 'title', type: 'title' }],
        [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
        ],
        [Component, 'square', { flex: 'none' }]
      ],
      [Component, 'action', { },
        [Button, 'action1', { text: 'action 1' }],
        [Button, 'action2', { text: 'action 2' }]
      ]
    ]
  }).insert(container)

  var card6 = new Card({
    layout: [Component, 'simple-big-square', { display: 'flex', direction: 'horizontal' },
      [Component, 'square', { flex: 'none' }],
      [Component, 'action', { },
        [Button, 'action1', { text: 'action 1' }],
        [Button, 'action2', { text: 'action 2' }]
      ]
    ]
  }).insert(container)

  console.log('card', card)
};
