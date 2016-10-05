
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
	}
};

module.exports = options;
