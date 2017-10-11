'use strict'

// controls
import Component from 'material/src/component.js'
import Container from 'material/src/container.js'
import Layout from 'material/src/layout.js'
import Form from 'material/src/form.js'
import Button from 'material/src/button.js'
// import schema from '../data/schema.json';
import data from '../data/contact.json'
import Textfield from 'material/src/textfield'
import Switch from 'material/src/switch.js'
import Checkbox from 'material/src/checkbox.js'
import Slider from 'material/src/slider.js'
import Text from 'material/src/text.js'

export default function (body) {
  /**
   * [layout description]
   * @type {Layout}
   */
  var layout = new Layout([Form, 'contact-form', {
    layout: [Component, '', { display: 'flex', direction: 'vertical'},
      [Container, 'main', { flex: 1 },
        [Component, 'header', { direction: 'vertical'},
          [Text, '', { text: 'Form component', type: 'display1'}],
          [Text, '', { text: 'Text fields allow users to input text, select text, and lookup data via auto-completion.', type: 'subheading1'}]
        ],
        [Text, '', { text: 'Contact', type: 'headline'}],
        [Component, 'contact', { display: 'flex', direction: 'horizontal'},
          [Textfield, 'firstname', { flex: 1, name: 'firstname', text: 'Firstname'}],
          [Textfield, 'lastname', { flex: 1, name: 'lastname', text: 'Lastname'}]
        ],
        [Text, '', { text: 'Address', type: 'headline'}],
        [Component, 'address', { },
          [Textfield, 'place.address', { flex: 1, name: 'address', text: 'Address'}],
          [Textfield, 'place.info', { flex: 1, name: 'address', text: 'Info'}],
          [Component, 'contact', { display: 'flex', direction: 'horizontal'},
            [Textfield, 'zipcode', { flex: 1, name: 'zipcode', text: 'Zip Code'}],
            [Textfield, 'place', { flex: 1, name: 'place', text: 'Place'}]
          ]
        ],
          [Text, '', { text: 'Related', type: 'headline'}],
        [Component, 'related', { direction: 'vertical'},
            [Switch, 'active', { name: 'activ', text: 'Active' }],
            // [Checkbox, 'vip', { text: 'vip' }],
            [Slider, 'rating', { text: 'rating' }]
        ]
      ],
      [Component, 'footer', { flex: 'none' },
        [Component, 'toolbar', { display: 'flex', direction: 'horizontal'},
            [Button, 'cancel', { text: 'Cancel' }],
            [Button, 'apply', { text: 'Apply' }]
        ]
      ]
    ]
  }], body)

  var form = layout.get('contact-form')

  // form.set('info', data)
}
