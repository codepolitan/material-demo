'use strict'

import {
  Layout,
  View,
  Container,
  Text
} from 'material'

/**
 * [initTest description]
 * @return {[type]} [description]
 */
export default function (body) {
  var types = [
    'Display 4',
    'Display 3',
    'Display 2',
    'Display 1',
    'Headline',
    'Title',
    'Subheading 2',
    'Subheading 1',
    'Body 2',
    'Body 1',
    'Caption',
    'Button'
  ]

  let list = [
    [Text, 'typography', {
      type: 'subheading1',
      text: 'Too many type sizes and styles at once can wreck any layout. A typographic scale has a limited set of type sizes that work well together along with the layout grid.'
    }],
    [Text, 'typography', {
      type: 'subheading1',
      text: 'These sizes and styles were developed to balance content density and reading comfort under typical usage conditions. Type sizes are specified with sp (scaleable pixels) to enable large type modes for accessibility.'
    }]
  ]

  types.map((type) => {
    return list.push([Text, type, {type: type.toLowerCase().replace(/\s+/g, ''), text: type}])
  })

  var typography = [Container, 'typography', {}].concat(list)

  var layout = [View, 'typography', {}, typography]

  new Layout(layout, body)
};
