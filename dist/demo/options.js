/**
 * Element options
 * @type {Object} The Element default options
 */
var options = {
  layout: {
    component: ['head', 'body'],
    node: {
      _name: 'standard',
      _list: ['navi', 'main', 'side'],
      navi: {
        opts: {
          component: ['head', 'body']
        },
        size: 320,
        theme: 'dark'
      },
      main: {
        flex: '1'
      }
    }
  },
  components: [
    { name: 'Button', icon: 'mdi-content-inbox' },
    { name: 'Checkbox', icon: 'mdi-action-done' },
    { name: 'Field', icon: 'mdi-action-query-builder' },
    { name: 'Switch', icon: 'mdi-action-done' },
    { type: 'separator' },
    { name: 'Draft', icon: 'mdi-content-draft' },
    { name: 'Sent', icon: 'mdi-content-send' }
  ]
};

module.exports = options;
