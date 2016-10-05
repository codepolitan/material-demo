
/**
 * google view class
 *
 * @class google/view/bind
 */"use strict";

var prime = require("prime/index"),
	View = require('../../../lib/view');

var _log = __debug('material:view-google');
	_log.defineLevel('DEBUG');

var Google = new prime({

	inherits: View,

	options: {
		name: 'google'
	}
});

module.exports = Google;
