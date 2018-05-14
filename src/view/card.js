'use strict'

import {
  Card,
  Component,
  Container,
  Toolbar,
  View,
  Button,
  Layout,
  Text
} from 'material'

// import Card from 'material/src/card.js'

// import Component from 'material/src/component.js'
// import Container from 'material/src/container.js'
// import Toolbar from 'material/src/container.js'
// import View from 'material/src/view.js'
// import Button from 'material/src/button.js'
// import Text from 'material/src/text.js'
// controls

/**
 * [initTest description]
 * @return {[type]} [description]
 */
  // var view = new View({
  //   name: 'card'
  // }).insert(body)

  // var hero = new Container({
  //   name: 'hero'
  // }).insert(view)

  // var container = new Container({
  //   name: 'card'
  // }).insert(view)

export default function (body) {
  var layout = new Layout([View, 'checkbox', {},
    [Container, 'top', {},
      [Text, 'title', { type: 'title', text: 'Card' }],
      [Text, 'title', { text: 'A card is a sheet of material that serves as an entry point to more detailed information.' }]
    ],
    [Container, 'hero', {},
      [Card, 'simple', {},
        [Container, 'body', { display: 'flex', direction: 'vertical' },
          [Text, 'title', { text: 'title', type: 'title' }],
          [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
        ],
        [Toolbar, 'action', { },
          [Button, 'action1', { text: 'action 1' }],
          [Button, 'action2', { text: 'action 2' }]
        ]
      ]
    ],
    [Container, 'card', {},
      [Card, 'simple-avatar', {},
        [Container, 'simple-card-avatar', { display: 'flex', direction: 'vertical' },
          [Component, 'visual', { display: 'flex' }],
          [Component, 'body', { display: 'flex', direction: 'vertical' },
            [Text, 'title', { text: 'title', type: 'title' }],
            [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
          ],
          [Component, 'action', { },
            [Button, 'action1', { text: 'action 1' }],
            [Button, 'action2', { text: 'action 2' }]
          ]
        ]
      ],
      [Card, 'simple-avatar', {},
        [Component, 'simple-card-avatar', { display: 'flex', direction: 'vertical' },
          [Component, 'head', { display: 'flex', direction: 'horizontal' },
          [Component, 'avatar', { flex: 'none' }],
            [Component, 'info', { css: 'text-adjust', display: 'flex', direction: 'vertical' },
            [Text, 'firstname', { text: 'Nicolas', css: 'text-adjust' }],
            [Text, 'lastname', { text: 'Tesla', css: 'text-adjust' }]
            ]
          ],
        [Component, 'visual', { display: 'flex' }],
          [Component, 'body', { display: 'flex', direction: 'vertical' },
          [Text, 'title', { text: 'title', type: 'title' }],
          [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
          ],
          [Component, 'action', { },
          [Button, 'action1', { text: 'action 1' }],
          [Button, 'action2', { text: 'action 2' }]
          ]
        ]
      ],
      [Card, 'simple-avatar', {},
        [Component, 'simple-card-avatar', { display: 'flex', direction: 'vertical' },
          [Component, 'head', { display: 'flex', direction: 'horizontal' },
            [Component, 'avatar', { flex: 'none' }],
            [Component, 'info', { css: 'text-adjust', display: 'flex', direction: 'vertical' },
              [Text, 'firstname', { text: 'Nicolas', css: 'text-adjust' }],
              [Text, 'lastname', { text: 'Tesla', css: 'text-adjust' }]
            ]
          ],
          [Component, 'body', { display: 'flex', direction: 'vertical' },
            [Text, 'title', { text: 'title', type: 'title' }],
            [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
          ],
          [Component, 'action', { },
            [Button, 'action1', { text: 'action 1' }],
            [Button, 'action2', { text: 'action 2' }]
          ]
        ]
      ],
      [Card, 'simple-avatar', {},
        [Component, 'simple-card-square', { display: 'flex', direction: 'vertical' },
          [Component, 'head', { display: 'flex', direction: 'horizontal' },
            [Component, 'info', { flex: '1', display: 'flex', direction: 'vertical' },
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
      ]
    ],
    [Card, 'simple-avatar', {},
      [Component, 'simple-big-square', { display: 'flex', direction: 'horizontal' },
        [Component, 'square', { flex: 'none' }],
        [Component, 'action', { },
          [Button, 'action1', { text: 'action 1' }],
          [Button, 'action2', { text: 'action 2' }]
        ]
      ]
    ]
    // [Container, 'dark-container', { css: 'dark-theme' },

    // ]
  ], body)

  // var card3 = new Card({
  //   layout: [Component, 'simple-card-avatar', { display: 'flex', direction: 'vertical' },
  //     [Component, 'head', { display: 'flex', direction: 'horizontal'},
  //       [Component, 'avatar', { flex: 'none' }],
  //       [Component, 'info', { css: 'text-adjust', display: 'flex', direction: 'vertical'},
  //         [Text, 'firstname', { text: 'Nicolas', css: 'text-adjust'}],
  //         [Text, 'lastname', { text: 'Tesla', css: 'text-adjust' }]
  //       ]
  //     ],
  //     [Component, 'visual', { display: 'flex'}],
  //     [Component, 'body', { display: 'flex', direction: 'vertical'},
  //       [Text, 'title', { text: 'title', type: 'title' }],
  //       [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
  //     ],
  //     [Component, 'action', { },
  //       [Button, 'action1', { text: 'action 1' }],
  //       [Button, 'action2', { text: 'action 2' }]
  //     ]
  //   ]
  // }).insert(container)

  // var card4 = new Card({
  //   layout:
  // }).insert(container)

  // var card5 = new Card({
  //   layout: [Component, 'simple-card-square', { display: 'flex', direction: 'vertical' },
  //     [Component, 'head', { display: 'flex', direction: 'horizontal'},
  //       [Component, 'info', { flex: '1', display: 'flex', direction: 'vertical'},
  //         [Text, 'title', { text: 'title', type: 'title' }],
  //       [Text, 'subtitle', { text: 'Subtitle here', type: 'subheading2' }]
  //       ],
  //       [Component, 'square', { flex: 'none' }]
  //     ],
  //     [Component, 'action', { },
  //       [Button, 'action1', { text: 'action 1' }],
  //       [Button, 'action2', { text: 'action 2' }]
  //     ]
  //   ]
  // }).insert(container)

  // var card6 = new Card({
  //   layout: [Component, 'simple-big-square', { display: 'flex', direction: 'horizontal' },
  //     [Component, 'square', { flex: 'none' }],
  //     [Component, 'action', { },
  //       [Button, 'action1', { text: 'action 1' }],
  //       [Button, 'action2', { text: 'action 2' }]
  //     ]
  //   ]
  // }).insert(container)
};
