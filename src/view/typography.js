'use strict'

import Layout from 'material/src/layout2.js'
import Container from 'material/src/container.js'
import Text from 'material/src/text.js'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  console.log('view typographay')

  var layout = [Container, 'main', {},
    [Text, 'typography', {
      type: 'subheading1',
      text: 'Too many type sizes and styles at once can wreck any layout. A typographic scale has a limited set of type sizes that work well together along with the layout grid.'
    }],
    [Text, 'typography', {
      type: 'subheading1',
      text: 'These sizes and styles were developed to balance content density and reading comfort under typical usage conditions. Type sizes are specified with sp (scaleable pixels) to enable large type modes for accessibility.'
    }],
    [Text, '', {
      type: 'display4',
      text: 'Display 4'
    }],
    [Text, '', {
      type: 'display3',
      text: 'Display 3'
    }],
    [Text, '', {
      type: 'display2',
      text: 'Display 2'
    }],
    [Text, '', {
      type: 'display1',
      text: 'Display 1'
    }],
    [Text, '', {
      type: 'headline',
      text: 'Headline'
    }],
    [Text, '', {
      type: 'title',
      text: 'Title'
    }],
    [Text, '', {
      type: 'subheading2',
      text: 'Subheading 2'
    }],
    [Text, '', {
      type: 'subheading1',
      text: 'Subheading 1'
    }],
    [Text, '', {
      type: 'body2',
      text: 'Body 2'
    }],
    [Text, '', {
      type: 'body1',
      text: 'Body 1'
    }],
    [Text, '', {
      type: 'caption',
      text: 'Caption'
    }],
    [Text, '', {
      type: 'button'
    }]
  ]

  console.log('layout', layout)

  new Layout(layout, body)
};
