require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Emitter = require('./module/emitter');
var Controller = require('./module/controller');
var DOMElement = require('./element');
var api = require('./component/api');
var bind = require('./module/bind');

var defaults = require('./component/options');

/**
 * Base class for all ui components
 * @class
 * @namespace Material
 * @param {Object} options - The component options
 * @return {Object} The class Instance
 */

var Component = (function (_Emitter) {
	_inherits(Component, _Emitter);

	/**
  * Constructor
  * @param  {Object} options - Component options
  * @return {Object} Class instance
  */

	function Component(options) {
		var _ret;

		_classCallCheck(this, Component);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this));

		_this.emit('init');

		_this.init(options);
		_this.build();

		if (_this.options.bind) {
			_this.bind(_this.options.bind);
		}

		return _ret = _this, _possibleConstructorReturn(_this, _ret);
	}

	/**
  * Initialized component
  * @return {Object} The class instance
  */

	_createClass(Component, [{
		key: 'init',
		value: function init(options) {
			this.options = [defaults, options].reduce(Object.assign, {});
			this.name = this.options.name;

			// merge options

			// implement object
			Object.assign(this, api);
			Object.assign(this, bind);

			if (this.options.props) {
				this._initProps(this.options.props);
			}

			this.controller = new Controller();

			return this;
		}

		/**
   * Build Method
   * @return {Object} This class instance
   */

	}, {
		key: 'build',
		value: function build(props) {
			var opts = this.options;

			this.emit('create');

			var tag = opts.tag || opts.element.tag;
			//var name = opts.name || opts.element.name;

			var element = this.element = new DOMElement(tag, props);
			element.store('_instance', this);

			this.setState(this.options.state);

			this.initClass();

			this.emit('created');

			this.content = element;

			// inject if container options is given
			if (opts.container) {

				this.inject(opts.container);
			}

			this.controller.register(this);

			return this;
		}

		/**
   * Init component class
   * @return {Object} This Class instance
   *
   */

	}, {
		key: 'initClass',
		value: function initClass() {
			var opts = this.options;

			var classes = ['type', 'state'];

			this.element.addClass(opts.prefix + '-' + this.name);

			if (opts.base) {
				this.element.addClass(opts.prefix + '-' + opts.base);
			}

			if (this.options.css) {
				this.addClass(this.options.css);
			}

			for (var i = 0; i < classes.length; i++) {
				var name = classes[i];
				if (opts[name]) {
					this.addClass(name + '-' + opts[name]);
				}
			}

			if (this.options.primary) {
				this.element.addClass('is-primary');
			}
		}

		/**
   * [inject description]
   * @param  {Object} container
   * @param  {string} position
   * @return {Object} The Class instance
   */

	}, {
		key: 'inject',
		value: function inject(container, position) {

			this.emit('inject');

			var c = container.element || container;

			//this.container = container;

			this.element.inject(c, position);

			if (this.setSize) {
				this.setSize();
			}

			//this.size = this.element.getSize();
			//ui.controller.element.register(this);

			this.isInjected = true;
			this.emit('injected');

			return this;
		}
	}]);

	return Component;
})(Emitter);

module.exports = Component;

},{"./component/api":3,"./component/options":4,"./element":12,"./module/bind":26,"./module/controller":27,"./module/emitter":29}],3:[function(require,module,exports){
'use strict';

/**
 * Component api
 * @type object
 */

module.exports = {

	/**
  * [style description]
  * @return {Object} The class instance
  */

	style: function style() {
		return this.element.style.apply(this.element, arguments);
	},

	/**
  * [style description]
  * @return {Object} The class instance
  */
	text: function text() {
		this.element.text.apply(this.element, arguments);

		return this;
	},

	/**
  * [show description]
  * @return {Object} The class instance
  */
	show: function show() {
		this.emit('show');
		this.element.show();

		return this;
	},

	/**
  * [hide description]
  * @return {Object} The class instance
  */
	hide: function hide() {
		this.emit('hide');
		this.element.hide();

		return this;
	},

	/**
  * [show description]
  * @return {Object} The class instance
  */
	fade: function fade(value) {
		this.emit('fade');
		this.element.fade(value);

		return this;
	},

	/**
  * [getSize description]
  * @return {Object} The class instance
  */
	getSize: function getSize() {
		return this.element.getSize();
	},

	/**
  * [addClass description]
  * @param {string} className The name of the class to add
  */
	addClass: function addClass(className) {
		this.element.addClass(className);

		return this;
	},

	/**
  * remove class
  * @param  {string} className The name of the class to remove
  * @return  Class instance
  */
	removeClass: function removeClass(className) {
		this.element.removeClass(className);

		return this;
	},

	/**
  * remove class
  * @param  {string} className The name of the class to remove
  * @return  Class instance
  */
	hasClass: function hasClass(className) {
		return this.element.hasClass(className);
	},

	/**
  * [get description]
  * @param  {string} property [description]
  * @return  Class instance
  */
	get: function get(property) {

		return this.element.get(property);
	},

	/**
  * [morph description]
  * @param  {string} props [description]
  * @return  Class instance
  */
	morph: function morph(props) {
		return this.element.morph(props);
	},

	/**
  * Get the name of the component
  * @return {string} name - The name of the Class instance
  */
	getName: function getName() {
		return this.options.name || this.name;
	},

	/**
  * [delegate description]
  * @param  {string}   type     eventName ie. click, dblclick
  * @param  {string}   selector div.tab
  * @param  {Function} fn       callback function
  * @return {Object} The class instance
  */
	delegate: function delegate(type, selector, fn) {
		this.element.delegate(type, selector, fn);

		return this;
	},

	/**
  * Set the size of the element
  * @param {interger} width  [description]
  * @param {interger} height [description]
  */
	setSize: function setSize(width, height) {

		if (width) {
			this.style('width', width);
		}

		if (height) {
			this.style('height', this.element.y);
		}

		this.emit('resized');
		return this;
	},

	/**
  * [setStyles description]
  * @param {Object} styles [description]
  */
	setStyles: function setStyles(styles) {
		this.element.setStyles(styles);

		return this;
	},

	/**
  * set content of the element
  * @param {string} content [description]
  */
	setContent: function setContent(content) {
		this.content.set('html', content);

		this.emit('resize');

		return this;
	},

	/**
  * Setter for the state of the component
  * @param {string} state active/disable etc...
  */
	setState: function setState(state) {
		if (this.state) {
			this.removeClass('state-' + this.state);
		}

		if (state) {
			this.addClass('state-' + state);
		}

		this.state = state;
		this.emit('state', state);

		return this;
	},

	/**
  * [dispose description]
  * @return {Object} The class instance
  */
	dispose: function dispose() {
		return this.element.dispose();
	},

	/**
  * [destroy description]
  * @return {Object} The class instance
  */
	destroy: function destroy() {
		this.element.destroy();
		return;
	}
};

},{}],4:[function(require,module,exports){
'use strict';

/**
 * Element options
 */

var options = {
	name: 'component',
	prefix: 'ui',

	type: null,

	element: {
		tag: 'span',
		type: null
	}
};

module.exports = options;

},{}],5:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ("value" in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Component = require('./component');
var defaults = require('./container/options');
var display = require('./container/display');

/**
 * The Container class inherits from Component and receive the ability to add inner components
 *
 * @class
 * @augments Component
 * @return {parent} The class instance
 * @example new Container({
 *   container: document.body
 * });
 */

var Container = (function (_Component) {
	_inherits(Container, _Component);

	function Container() {
		_classCallCheck(this, Container);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Container).apply(this, arguments));
	}

	_createClass(Container, [{
		key: 'init',

		/**
   * Init class
   * @return {Object} This class  instance
   */
		value: function init(options) {
			_get(Object.getPrototypeOf(Container.prototype), 'init', this).call(this, options);
			this.name = 'container';

			// merge options
			this.options = [defaults, options].reduce(Object.assign, {});

			Object.assign(this, display);

			return this;
		}

		/**
   * [build description]
   * @return {Object} This class  instance
   */

	}, {
		key: 'build',
		value: function build(props) {
			_get(Object.getPrototypeOf(Container.prototype), 'build', this).call(this, props);

			var component = this.options.component;

			if (component) {
				this._initComponent(component);
			}

			return this;
		}

		/**
   * Initialize internal container components
   * @param  {Mixin} component Compenent description
   * @return {void}
   */

	}, {
		key: '_initComponent',
		value: function _initComponent(component) {

			this.component = this.c = {};
			this.components = [];

			if (typeof component === 'string') {
				this.add(component);
			} else {
				for (var i = 0; i < component.length; i++) {
					this.add(component[i]);
				}
			}
		}

		/**
   * [_initComp description]
   * @param  {string} name
   * @param  {string} position
   * @param  {DOMElement} element
   * @return {DOMElement|void}
   */

	}, {
		key: 'add',
		value: function add(name, position, element) {

			position = position || 'bottom';
			element = element || this.element;

			if (!element) {
				return;
			}

			this.component[name] = new Component().addClass(this.name + '-' + name).inject(element);

			return this.component[name];
		}
	}]);

	return Container;
})(Component);

module.exports = Container;

},{"./component":2,"./container/display":6,"./container/options":7}],6:[function(require,module,exports){
'use strict';

/**
 * display container class
 */

module.exports = {

	/**
  * [_initDisplay description]
  * @return {Object} The class instance
  */

	_initDisplay: function _initDisplay() {
		this._modifier = 'width';

		var direction = '';

		//var direction = this.container.element.style('flex-direction');

		if (direction === 'column') this._modifier = 'height';

		var modifier = this._modifier;

		if (!this[modifier]) this[modifier] = 220;

		this.device = this.device || 'desktop';
		//this.underlay.hide();
		this.display = {};

		return this.display;
	},

	/**
  * [getDisplay description]
  * @return {Object} The class instance
  */
	getDisplay: function getDisplay() {

		return this._display;
	},

	/**
  * [getDisplay description]
  * @return {Object} The class instance
  */
	setDisplay: function setDisplay(display) {

		this._display = display;

		return this;
	},

	/**
  * [toggle description]
  * @return {Object} The class instance
  */
	toggle: function toggle() {

		if (this._display === 'normalized') {
			this.minimize();
		} else {
			this.normalize();
		}

		return this._display;
	},

	/**
  * [minimize description]
  * @return {Object} The class instance
  */
	minimize: function minimize() {

		if (!this.display) {
			this._initDisplay();
		}

		var transition = {
			duration: '.2s',
			equation: 'ease-in'
		};

		this.emit('minimize');

		var opts = {
			equation: transition.equation,
			duration: transition.duration
		};

		var prop = {};

		prop[this._modifier] = '0px';

		this.element.animate(prop, opts);

		this._display = 'minimized';

		this.emit('display', 'minimized');

		return this;
	},

	/**
  * [normalize description]
  * @return {Object} The class instance
  */
	normalize: function normalize() {

		if (!this.display) {
			this._initDisplay();
		}

		this.emit('normalize');

		var size = this[this._modifier];

		var option = {
			duration: '.2s',
			equation: 'ease-in',
			callback: function callback() {}
		};

		var property = {};
		property[this._modifier] = size + 'px';

		this.element.animate(property, option);
		this._display = 'normalized';
		this.emit('display', this._display);

		return this;
	},

	/**
  * [normalize description]
  * @return {Object} The class instance
  */
	maximize: function maximize() {

		this.element.style('display', null);
		this.element.addClass('state-focus');

		this._display = 'normalized';

		this.emit('display', this._display);

		return this;
	}
};

},{}],7:[function(require,module,exports){
'use strict';

/**
 * Container class options
 */

module.exports = {
	name: 'container',
	prefix: 'ui',

	type: null,

	element: {
		tag: 'span',
		type: null
	}
};

},{}],8:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Component = require('./component');

var defaults = {
    //disabled: false
    error: false,
    bind: {
        'element.click': 'emit.click',
        'element.mouseup': 'emit.mouseup'
    }
};

/**
 * control class
 *
 * @class
 */

var Control = (function (_Component) {
    _inherits(Control, _Component);

    function Control() {
        _classCallCheck(this, Control);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Control).apply(this, arguments));
    }

    _createClass(Control, [{
        key: 'init',

        /**
         * [init description]
         * @return {void} [description]
         */
        value: function init(options) {
            _get(Object.getPrototypeOf(Control.prototype), 'init', this).call(this, options);

            var opts = this.options;

            this.value = opts.value;
            this.readonly = opts.read;

            this.disabled = this.options.disabled;
        }

        /**
         * Setter
         * @param {string} prop
         * @param {string} value
         */

    }, {
        key: 'set',
        value: function set(prop, value) {

            switch (prop) {
                case 'value':
                    this.setValue(value);
                    break;
                default:
                    this.setValue(value);

            }

            return this;
        }

        /**
         * Getter
         * @param {string} prop
         * @param {string} value
         */

    }, {
        key: 'get',
        value: function get(prop) {
            var value;

            switch (prop) {
                case 'value':
                    value = this.getValue(prop);
                    break;
                default:
                    return this.getValue(prop);
            }

            return value;
        }

        /**
         * [getValue description]
         * @return {Object} The class instance
         */

    }, {
        key: 'getValue',
        value: function getValue() {
            return this.input.get('value');
        }

        /**
         * [setValue description]
         * @param {string} value [description]
         */

    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.input.attribute('value', value);
            this.emit('change', value);
        }

        /**
         * [isEnable description]
         * @return {boolean}
         */

    }, {
        key: 'isEnable',
        value: function isEnable() {
            if (this.state === 'disabled') {
                return false;
            } else {
                return true;
            }
        }
    }]);

    return Control;
})(Component);

module.exports = Control;

},{"./component":2}],9:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ("value" in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Component = require('../component');
var DOMElement = require('../element');

var defaults = {
	prefix: 'ui',
	type: null, // push, file
	element: {
		tag: 'span'
	},
	ink: {
		duration: '.5s',
		equation: 'ease-out'
	},
	bind: {
		'sensor.click': 'press',
		'sensor.dblclick': '_onDblClick',
		'sensor.mousedown': '_onMouseDown',
		'sensor.mouseup': '_onMouseUp',
		'sensor.mouseleave': '_onMouseLeave',
		'sensor.mouseenter': '_onMouseEnter'
	}
};

/**
 * Button control class
 * @class
 * @extends Control
 * @since 0.0.1
 */

var Button = (function (_Component) {
	_inherits(Button, _Component);

	function Button() {
		_classCallCheck(this, Button);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
	}

	_createClass(Button, [{
		key: 'init',

		/**
   * The init method of the Button class
   * @param  {Object} options [description]
   * @private
   * @return {Object} The class instance
   */
		value: function init(options) {
			_get(Object.getPrototypeOf(Button.prototype), 'init', this).call(this, options);

			this.name = 'button';

			this.options = [defaults, options].reduce(Object.assign, {});

			return this;
		}
		/**
   * [build description]
   * @return {void}
   */

	}, {
		key: 'build',
		value: function build(props) {
			_get(Object.getPrototypeOf(Button.prototype), 'build', this).call(this, props);

			var opts = this.options;
			var type = opts.type;

			opts.label = opts.label || opts.n;

			if (type === null) {
				type = 'icon-text';
			}

			if (opts.name) {
				this.element.attribute('data-name', opts.name);
			}

			this.element.attribute('title', opts.text);

			if (opts.icon) {
				this._initIcon(type, opts.icon || opts.name);
			}

			this._initLabel(type);

			if (opts.ink) {
				this._initSensor();
			} else {
				this.sensor = this.element;
			}
		}

		/**
   * [_onElementMouseDown description]
   * @param  {event} e
   * @return {void}
   */

	}, {
		key: 'press',
		value: function press(e) {
			e.preventDefault();
			var opts = this.options;

			if (this.state === 'disabled') {
				return;
			}

			this._initInk(e);

			if (opts.emit) {
				this.emit(opts.emit);
			}

			this.emit('press', opts.emit);
			this.emit('pressed', opts.emit);

			return this;
		}

		/**
   * [_initIcon description]
   * @param  {string} type
   * @return {string}
   */

	}, {
		key: '_initIcon',
		value: function _initIcon(type, name) {

			var tag = 'span';
			var code = name;

			var prop = {
				'class': 'ui-icon'
			};

			this.icon = new DOMElement(tag, prop).inject(this.element);

			// prepare use of svg
			// this.iconsvg = new Element('svg', prop).inject(this.element);
			// this.svguse = new Element('use').inject(this.iconsvg);

			// this.iconsvg.attribute('viewBox', '0 0 24 24');
			// this.svguse.attribute('xlink:href','/vendor/icon/content-send.svg');

			if (code) {
				this.icon.addClass(code);
			}
		}

		/**
   * [_initLabel description]
   * @param  {string} type
   * @return {void}
   */

	}, {
		key: '_initLabel',
		value: function _initLabel(type) {
			var options = this.options;

			var position = 'bottom';
			if (type === 'text-icon') {
				position = 'top';
			}

			if (this.options.label !== null) {
				var text = options.label || options.text;
				this.label = new DOMElement('span.ui-text').inject(this.element, position);
				this.label.text(text);
			}
		}

		/**
   * [_initText description]
   * @return {void}
   */

	}, {
		key: '_initSensor',
		value: function _initSensor() {

			this.sensor = new DOMElement('div.ui-sensor').inject(this.element);
		}

		// INK

		/**
   * [_onElementMouseDown description]
   * @param  {event} e
   * @return {Object}
   */

	}, {
		key: '_initInk',
		value: function _initInk(e) {
			var element = this.element;

			var x = e.offsetX;
			var y = e.offsetY;

			var ink = this.ink = new DOMElement('span.ui-ink').inject(element, 'top');

			this.ink.style({
				left: x - 5,
				top: y - 5
			});

			this._touchInk(ink);

			this.emit('mousedown');
		}

		/**
   * [_initEffect description]
   * @param  {string} ink
   * @param  {string} x
   * @param  {string} y
   * @param  {Object} coord
   * @return {void}
   */

	}, {
		key: '_touchInk',
		value: function _touchInk(ink) {

			var coord = this._inkCoord(ink);
			var options = this.options.ink;

			this.ink = ink;

			this.animate({
				width: coord.size + 'px',
				height: coord.size + 'px',
				left: '0',
				top: coord.top + 'px',
				opacity: '0'
			}, options.duration, options.equation);

			var wait = options.duration.replace('s', '') * 1000;

			setTimeout(function () {
				ink.destroy();
			}, wait);
		}

		/**
   * [_inkCoord description]
   * @return {Object} Size and top
   */

	}, {
		key: '_inkCoord',
		value: function _inkCoord() {
			var height = this.element.compute('height').replace('px', '');
			var width = this.element.compute('width').replace('px', '');

			width = parseInt(width);
			height = parseInt(height);

			var size = width;
			var top = 0;

			if (width > height) {
				size = width;
				top = (height - width) / 2;
			} else if (width < height) {
				size = height;
				top = (width - height) / 2;
			}

			return {
				size: size,
				top: top
			};
		}

		/**
   * [animate description]
   * @param  {Object} object   [description]
   * @param  {interger} duration [description]
   * @param  {string} equation [description]
   */

	}, {
		key: 'animate',
		value: function animate(object, duration, equation) {

			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					var prop = {};
					prop[key] = object[key];

					this.ink.animate(prop, { duration: duration }, { equation: equation });
				}
			}
		}

		// EVENTS

		/**
   * [_onDblClick description]
   * @param  {event} e
   * @return {void}
   */

	}, {
		key: '_onDblClick',
		value: function _onDblClick(e) {
			var opts = this.options;

			e.stopPropagation();

			this.emit('dblpressed', opts.emit);
			return this;
		}

		/**
   * [_onMouseDown description]
   * @return {void}
   */

	}, {
		key: '_onMouseDown',
		value: function _onMouseDown(e) {

			return this;
		}

		/**
   * [_onMouseUp description]
   * @return {void}
   */

	}, {
		key: '_onMouseUp',
		value: function _onMouseUp(e) {

			return this;
		}

		/**
   * [_onMouseLeave description]
   * @return {void}
   */

	}, {
		key: '_onMouseLeave',
		value: function _onMouseLeave(e) {

			//console.log('mouseleave', e);

			return this;
		}

		/**
   * [_onMouseEnter description]
   * @param  {event} e
   * @return {void}
   */

	}, {
		key: '_onMouseEnter',
		value: function _onMouseEnter(e) {

			this.emit('mouseenter', this.options.emit);

			return this;
		}
	}]);

	return Button;
})(Component);

module.exports = Button;

},{"../component":2,"../element":12}],10:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ("value" in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Control = require('../control');
var Element = require('../element');

var bind = require("../module/bind");

var defaults = {
	name: 'field',
	base: 'control',
	tag: 'div',
	type: 'input',
	value: null,
	error: true,
	bind: {
		//'input.click': '_onFocus',
		'input.keyup': '_onKeyUp',
		'input.keydown': '_onKeyDown',
		'input.mousedown': '_onMouseDown',
		'input.focus': '_onFocus',
		'input.blur': '_onBlur'
	}
};

/**
 * Field class
 * @class
 * @extends {Control}
 */

var Field = (function (_Control) {
	_inherits(Field, _Control);

	function Field() {
		_classCallCheck(this, Field);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Field).apply(this, arguments));
	}

	_createClass(Field, [{
		key: 'init',

		/**
   * init
   * @param  {Object} options The class options
   * @return {Object} The class instance
   */
		value: function init(options) {
			_get(Object.getPrototypeOf(Field.prototype), 'init', this).call(this, options);

			this.options = [defaults, options].reduce(Object.assign, {});

			this.name = this.options.name;

			return this;
		}

		/**
   * [build description]
   * @return {Object} The class instance
   */

	}, {
		key: 'build',
		value: function build() {
			//create a new div as input element
			_get(Object.getPrototypeOf(Field.prototype), 'build', this).call(this);

			var opts = this.options;

			this.element.addClass('ui-field');

			if (this.disabled) {
				this.element.addClass('is-disabled');
			}

			if (opts.klss) {
				this.element.addClass(opts.klss);
			}

			if (opts.label !== false) {
				this._initLabel();
			}

			this._initInput();

			// if (opts.error) {
			// 	this.error();
			// }
		}

		/**
   * [_initLabel description]
   * @return {Object} The class instance
   */

	}, {
		key: '_initLabel',
		value: function _initLabel() {
			var label = this.options.label;
			var text;

			if (label === null || label === false) {
				text = '';
			} else if (this.options.label) {
				text = label;
			} else {
				text || this.options.name;
			}

			this.label = new Element('label', {
				tag: 'label',
				'for': this.options.name
			}).inject(this.element);

			this.label.text(text);
		}

		/**
   * [_initInput description]
   * @return {Object} The class instance
   */

	}, {
		key: '_initInput',
		value: function _initInput() {

			this.input = new Element('input', {
				name: this.options.name,
				type: 'text',
				value: this.options.value,
				placeholder: this.options.text
			}).inject(this.element);

			if (this.readonly) {
				this.input.attribute('readonly', 'readonly');
				this.input.attribute('tabindex', '-1');
			}

			return this.input;
		}

		/**
   * [_initName description]
   * @param  {string} name The input name
   */

	}, {
		key: '_initName',
		value: function _initName(name) {
			var opts = this.options;

			if (opts.name) {
				this.input.attribute('name', name);
			}
		}

		/**
   * [_initValue description]
   * @return {Object} The class instance
   */

	}, {
		key: '_initValue',
		value: function _initValue() {
			var opts = this.options;

			//create a new div as input element
			if (opts.value) {
				this.setValue(opts.value);
			}
		}

		/**
   * [_onKeyUp description]
   * @return {Object} The class instance
   */

	}, {
		key: '_onKeyUp',
		value: function _onKeyUp(e) {
			this.emit('change', this.get('value'));
		}

		/**
   * [_onKeyUp description]
   * @return {Object} The class instance
   */

	}, {
		key: '_onKeyDown',
		value: function _onKeyDown(e) {
			if (this.readonly) {
				e.stop();
				return;
			}

			this.fireEvent('change', this.get('value'));
		}

		/**
   * [_onMouseDown description]
   * @return {Object} The class instance
   */

	}, {
		key: '_onMouseDown',
		value: function _onMouseDown(e) {

			if (this.readonly) return;

			this.isFocused = true;
			this.setState('focus');
			this._inputFocus(e);
			//e.stopPropagation();
			//this.focus();
			//this._inputFocus(e);
		}

		/**
   * [_onFocus description]
   * @return {Object} The class instance
   */

	}, {
		key: '_onFocus',
		value: function _onFocus(e) {

			this.emit('mousedown');
			this._showInk(e);
			this.isFocused = true;
		}

		/**
   * [_onBlur description]
   * @return {Object} The class instance
   */

	}, {
		key: '_onBlur',
		value: function _onBlur() {

			if (this.readonly) return;

			this.setState(null);
			this._hideInk();
			this.isFocused = false;
		}

		/**
   * [_inputFocus description]
   * @param  {event} e [description]
   * @return {Object} The class instance
   */

	}, {
		key: '_inputFocus',
		value: function _inputFocus(e) {

			this.emit('mousedown');
			this._showInk(e);
			this.isFocused = true;
		}

		/**
   * [_initInk description]
   * @return {Object} The class instance
   */

	}, {
		key: '_initInk',
		value: function _initInk() {

			this.ink = new Element('span', {
				class: 'field-ink'
			}).inject(this.element);
		}

		/**
   * [_initEffect description]
   * @param  {Event} e Event
   * @return {Object} The class instance
   */

	}, {
		key: '_showInk',
		value: function _showInk(e) {

			if (this.readonly) return;

			if (this.ink) return;
			var duration = '.2s';
			var input = this.input;
			var label = this.label;

			var width = input.compute('width').replace('px', '');
			var inputHeight = parseInt(input.compute('height').replace('px', ''));
			var labelHeight = parseInt(label.compute('height').replace('px', ''));
			var left = input.compute('left').replace('px', '');

			var x = width / 2;

			if (e === 0) {
				x = 0;
			} else if (e && e.offsetX) {
				x = e.offsetX;
			}

			var size = width;
			var top = inputHeight + labelHeight + 8 - 2;

			if (!this.ink) {
				this._initInk();
			}

			console.log('top', top);

			this.ink.style('left', x);

			this.ink.animate({ 'width': size }, { duration: duration }, { equation: 'ease-out' });
			this.ink.animate({ 'top': top }, { duration: duration }, { equation: 'ease-out' });
			this.ink.animate({ 'bottom': 'initial' }, { duration: duration, equation: 'ease-out' });
			this.ink.animate({ 'left': '0' }, { duration: duration }, { equation: 'ease-out' });
			this.ink.animate({ 'opacity': '1' }, { duration: duration, equation: 'ease-out' });
		}

		/**
   * [_initEffect description]
   * @param  {Event} e Event
   * @return {Object} The class instance
   */

	}, {
		key: '_setInk',
		value: function _setInk(e) {
			if (this.readonly) return;

			//if (this.ink) return;

			var input = this.input;

			var width = input.compute('width').replace('px', '');
			var height = input.compute('height').replace('px', '');
			var left = input.compute('left').replace('px', '');

			var x = width / 2;

			var size = width;
			var top = 0;

			if (!this.ink) {
				this._initInk();
			}

			this.ink.style({
				width: size,
				top: top + height - 2,
				bottom: 'initial',
				left: left,
				opacity: 1
			});
		}

		/**
   * [_initEffect description]
   * @return {Object} The class instance
   */

	}, {
		key: '_hideInk',
		value: function _hideInk() {
			var self = this;

			var input = this.input;

			var duration = '.2s';
			var width = input.compute('width').replace('px', '');
			var size = width / 2;

			this.ink.animate({ 'width': '0px' }, { duration: duration }, { equation: 'ease-out' });
			this.ink.animate({ 'left': size }, { duration: duration }, { equation: 'ease-out' });
			this.ink.animate({ 'opacity': '0' }, { duration: duration, equation: 'ease-out' });

			setTimeout(function () {
				if (self.ink) {
					self.ink.destroy();
					self.ink = null;
				}
			}, 100);
		}

		/**
   * [_initError description]
   * @return {Object} The class instance
   */

	}, {
		key: 'error',
		value: function error() {
			this.error = new Element('span', {
				class: 'error-message'
			}).inject(this.element);
		}

		/**
   * [setError description]
   * @param {string} error Error description
   */

	}, {
		key: 'setError',
		value: function setError(error) {
			if (error) {
				this.element.addClass('field-error');
				if (this.error) this.error.set('html', error);
			} else {
				if (this.error) this.element.removeClass('field-error');
				if (this.error) this.error.set('html', '');
			}
		}
	}]);

	return Field;
})(Control);

module.exports = Field;

},{"../control":8,"../element":12,"../module/bind":26}],11:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ("value" in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Control = require('../control');
var DOMElement = require('../element');

var defaults = {
	name: 'switch',
	base: 'field',
	prefix: 'ui',
	label: null,
	checked: false,
	error: false,
	value: false,
	//ink: true,
	element: {
		tag: 'span'
	},
	animation: {
		duration: ".1s",
		equation: 'ease-in'
	},
	bind: {
		'control.click': 'toggle'
	}
};

/**
 * Switch class
 * @class
 * @extends Control
 */
//'label.click': 'toggle'

var Switch = (function (_Control) {
	_inherits(Switch, _Control);

	function Switch() {
		_classCallCheck(this, Switch);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Switch).apply(this, arguments));
	}

	_createClass(Switch, [{
		key: 'init',

		/**
   * Constructor
   * @param  {Object} options The class options
   * @return {Object} This class instance
   */
		value: function init(options) {
			_get(Object.getPrototypeOf(Switch.prototype), 'init', this).call(this, options);
			this.options = [defaults, options].reduce(Object.assign, {});

			this.name = this.options.name;
			this.value = this.options.value;

			return this;
		}

		/**
   * build method
   * @return {Object} The class instance
   */

	}, {
		key: 'build',
		value: function build() {
			_get(Object.getPrototypeOf(Switch.prototype), 'build', this).call(this);

			var text = this.options.label || this.options.text;

			this.wrapper = new DOMElement('div.switch-wrapper').inject(this.element);
			this.control = new DOMElement('span.switch-control').inject(this.wrapper);
			this.knob = new DOMElement('span.switch-knob').inject(this.control);

			if (this.options.label !== null) {
				this.label = new DOMElement('span.switch-label').inject(this.wrapper);
				this.label.text(text);
			}

			if (this.value) {
				this.setTrue();
			}
		}

		/**
   * Setter
   * @param {string} prop
   * @param {string} value
   * @return {Object} The class instance
   */

	}, {
		key: 'set',
		value: function set(prop, value) {

			switch (prop) {
				case 'value':
					this.setValue(value);
					break;
				default:
					this.setValue(value);
			}

			return this;
		}

		/**
   * set switch value
   * @param {boolean} value [description]
   */

	}, {
		key: 'setValue',
		value: function setValue(value) {
			if (value) {
				this.setTrue();
			} else {
				this.setFalse();
			}
		}

		/**
   * [toggle description]
   * @return {Object} The class instance
   */

	}, {
		key: 'toggle',
		value: function toggle() {
			if (this.disabled) return;

			if (this.value) {
				this.setFalse(true);
			} else {
				this.setTrue(true);
			}

			return this;
		}

		/**
   * [setTrue description]
   */

	}, {
		key: 'setTrue',
		value: function setTrue(animation) {
			this.value = true;

			if (animation) {
				this.animate('14px', 'rgba(0,150,136,1)', 'rgba(0,150,136,.5)');
			} else {
				this.knob.style('left', '14px');
				this.knob.style('background-color', 'rgba(0,150,136,1)');
				this.control.style('background-color', 'rgba(0,150,136,.5)');
			}

			this.emit('change', this.value);
		}
	}, {
		key: 'setFalse',
		value: function setFalse(animation) {
			this.value = false;

			if (animation) {
				this.animate('-2px', 'rgba(241,241,241,1)', 'rgba(34,31,31,.26)');
			} else {
				this.knob.style('left', '-2px');
				this.knob.style('background-color', 'rgba(34,31,31,1)');
				this.control.style('background-color', 'rgba(34,31,31,.26)');
			}

			this.emit('change', this.value);
		}

		/**
   * [animate description]
   * @return {Object} The class instance
   */

	}, {
		key: 'animate',
		value: function animate(left, knob, track) {
			var options = this.options.animation;

			this.knob.animate({ 'left': left }, options);
			this.knob.animate({ 'background-color': knob }, options);
			this.control.animate({ 'background-color': track }, options);

			return this;
		}
	}]);

	return Switch;
})(Control);

module.exports = Switch;

},{"../control":8,"../element":12}],12:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Emitter = require('./module/emitter');
var defaults = require('./element/options');
var style = require('./element/style');
var insertion = require('./element/insertion');
var dom = require('./element/dom');
var storage = require('./element/storage');
var bind = require("./module/bind");

/**
 * Creates an Element
 * @class
 */

var Element = (function (_Emitter) {
	_inherits(Element, _Emitter);

	/**
  * Constructor
  * @param  {string} tag - The element tag
  * @param  {Object} options - The element options
  * @return {Object} The class instance
  */

	function Element(tag, options) {
		var _ret;

		_classCallCheck(this, Element);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Element).call(this));

		_this.init(tag, options);
		_this.build();

		//console.log(this.dom[0]);

		if (_this.options.bind) {
			//console.log('binding', binding, this.options.binding);
			_this.bind(_this.options.bind);
		}

		_this.emit('ready');

		return _ret = _this, _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Element, [{
		key: 'init',
		value: function init(tag, options) {
			this.name = 'element';

			this.options = [defaults, options].reduce(Object.assign, {});
			this.options.tag = tag;

			Object.assign(this, bind);
			Object.assign(this, dom);
			Object.assign(this, insertion);
			Object.assign(this, storage);
			Object.assign(this, style);

			this.document = window.document;
		}

		/**
   * function click - for testing purpose
   * @return {event} Click event
   */

	}, {
		key: 'click',
		value: function click(ev) {
			console.log('_click', ev);

			return ev;
		}

		/**
   * Build domNode
   * @return {Object} this
   */

	}, {
		key: 'build',
		value: function build() {
			this.emit('create');

			var tag = this.options.tag;
			//var name = opts.name || opts.element.name;

			this.element = this.dom = this.create(tag);

			// if (this.dom instanceof HTMLElement) {
			// 	console.log('dom is an Element', this.dom);
			// };

			this.attributes(this.options.attr);

			var container = this.options.container;
			var context = this.options.context;

			if (container) {
				this.inject(container, context);
			}

			this.emit('created');

			return this;
		}

		/**
   * create dom element
   * @param  {string} selector A simple selector string
   * @return {HTMLElement} The dom element
   */

	}, {
		key: 'create',
		value: function create(selector) {
			var s = this._selectorFragment(selector)[0];
			var tag = s.uTag;

			if (!tag) {
				return null;
			}

			var element = this.document.createElement(tag);
			var id = s.id;
			var classes = s.classes;

			if (id) {
				element.id = id;
			}

			if (classes) {
				element.className = classes.join(" ");
			}

			return element;
		}

		/**
   * an array of simple selector fragment objects from the passed complex selector string
   * @param  {string} selector The complex selector
   * @return {Array} returns an array of simple selector fragment objects 
   */

	}, {
		key: '_selectorFragment',
		value: function _selectorFragment(selector) {
			var fragment,
			    result = [];
			var regex = /^\s*([>+~])?\s*([*\w-]+)?(?:#([\w-]+))?(?:\.([\w.-]+))?\s*/;

			if (typeof selector === "string") {
				while (selector) {
					fragment = selector.match(regex);
					if (fragment[0] === "") {
						// matched no selector
						break;
					}
					result.push({
						rel: fragment[1],
						uTag: (fragment[2] || "").toUpperCase(),
						id: fragment[3],
						classes: fragment[4] ? fragment[4].split(".") : undefined
					});
					selector = selector.substring(fragment[0].length);
				}
			}

			return result;
		}

		/**
   * Main setter
   * @param {string} prop - Property to set
   * @param {Object} value - Value to set
   * @return {Object} This class instance
   */

	}, {
		key: 'set',
		value: function set(prop, value) {

			switch (prop) {
				case 'attribute':
					this.attributes(value);
					break;
				case 'text':
					this.text(value);
					break;
				default:
					this.setValue(value);

			}

			return this;
		}

		/**
   * Set atrributes
   * @return {Object} this
   */

	}, {
		key: 'attributes',
		value: function attributes(attr) {
			var opts = this.options;

			if (!opts.attr) {
				return;
			}

			var attr = opts.attr;

			for (var i = 0, len = attr.length; i < len; i++) {
				var name = attr[i];
				var value = opts[name];

				if (name === 'klass') {
					name = 'class';
				}

				if (value) {
					this.attribute(name, value);
				}
			}

			return this;
		}

		/**
   * Gets or sets an attribute or property.
   * Returns the value of the attribute If only the name parameter is passed,
   * otherwise returns the current elements instance.
   * @param {string} name  The name of the attribute or property
   * @param {string} value  If the value parameter is set, this method will act like a setter and will set the value to all elements in the collection.
   * If this parameter is omitted, it will act as a getter on the first element in the collection.
   * @return {Object} this
   */

	}, {
		key: 'attribute',
		value: function attribute(name, value) {
			this.attr(name, value);

			return this;
		}
	}, {
		key: 'text',
		value: function text(_text) {
			return this.dom.text(_text);
		}

		/**
   * [animate description]
   * @return {} This class instance
   */

	}, {
		key: 'animate',
		value: function animate() {
			var moo = moofx(this.dom);
			moo.animate.apply(moo, arguments);
			return this;
		}

		/**
   * [animate description]
   * @return {} This class instance
   */

	}, {
		key: 'compute',
		value: function compute(prop) {

			return moofx(this.dom).compute(prop);
		}

		/**
   * [animate description]
   * @return {} This class instance
   */

	}, {
		key: 'getSize',
		value: function getSize() {
			var size = {
				width: parseInt(this.style('width').replace('px', '')),
				height: parseInt(this.style('height').replace('px', ''))
			};

			return size;
		}

		/**
   * [animate description]
   * @return {} This class instance
   */

	}, {
		key: 'getCoord',
		value: function getCoord() {

			var coordinate = {
				top: parseInt(this.style('top').replace('px', '')),
				left: parseInt(this.style('left').replace('px', '')),
				bottom: parseInt(this.style('bottom').replace('px', '')),
				right: parseInt(this.style('right').replace('px', ''))
			};

			return coordinate;
		}

		/**
   * Inject method insert element to the domtree using Dom methods
   * @param {HTMLElement} container [description]
   * @param  {string} context - Injection context
   * @return {Object} This class intance
   */

	}, {
		key: 'inject',
		value: function inject(container, context) {
			if (container && container.dom) {
				container = container.dom;
			} else if (container instanceof HTMLElement) {
				//console.log('container', container);
			} else {
					//console.log('container mismatch');
					return;
				}

			context = context || 'bottom';

			var contexts = ['top', 'bottom', 'after', 'before'];
			var methods = ['prepend', 'append', 'after', 'before'];

			var index = contexts.indexOf(context);
			if (index === -1) {
				return;
			}

			var method = methods[index];

			// if element is a component use its element instead
			// if (element instanceof Element)
			// 	element = element.element;

			this.emit('inject');

			// insert component element to the dom tree using Dom
			this[method](container);

			this.isInjected = true;
			this.emit('injected');

			return this;
		}
	}, {
		key: 'delegate',
		value: function delegate(event, selector, handle) {

			return;

			return this.forEach(function (node) {

				var self = $(node);

				var delegation = self._delegation || (self._delegation = {}),
				    events = delegation[event] || (delegation[event] = {}),
				    map = events[selector] || (events[selector] = new Map());

				if (map.get(handle)) return;

				var action = function action(e) {
					var target = $(e.target || e.srcElement),
					    match = target.matches(selector) ? target : target.parent(selector);

					var res;

					if (match) res = handle.call(self, e, match);

					return res;
				};

				map.set(handle, action);

				self.on(event, action);
			});
		}

		/**
   * [destroy description]
   * @return {Object} this class
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			this.element.parentNode.removeChild(this.element);

			return this;
		}
	}]);

	return Element;
})(Emitter);

module.exports = Element;

},{"./element/dom":13,"./element/insertion":14,"./element/options":15,"./element/storage":16,"./element/style":17,"./module/bind":26,"./module/emitter":29}],13:[function(require,module,exports){

/**
 * dom element module
 * @module container/dom
 */
'use strict';

function _typeof2(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _utils = require('../module/utils');

function _typeof(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
}

module.exports = {

    /**
     * [hasClass description]
     * @param  {string}  className
     * @return {Boolean}
     */

    hasClass: function hasClass(className) {
        return (" " + this.element.className + " ").indexOf(" " + className + " ") > -1;
    },

    /**
     * [addClass description]
     * @param {[type]} className [description]
     */
    addClass: function addClass(className) {
        if (!this.hasClass(className)) {
            this.element.className += " " + className;
        }
    },

    /**
     * [removeClass description]
     * @param  {[type]} className [description]
     * @return {[type]}           [description]
     */
    removeClass: function removeClass(className) {
        if (this._hasClass(className)) {
            this.element.className = this.element.className.replace(new RegExp("(^|\\s)" + className + "(\\s|$)"), " ").replace(/\s$/, "");
        }
    },

    /**
    * Gets or sets text value of the HTML element
    *
    * @param {HTMLElement} element
    * @param {String} string
    * @returns {*}
    */
    text: function text(string) {

        if ((0, _utils._isString)(string)) {

            if (this.element.innerText) {
                this.element.innerText = string;
            } else {
                this.element.textContent = string;
            }
            return string;
        }

        if (this.element.innerText) {
            return this.element.innerText;
        }

        return this.element.textContent;
    },

    /**
     * [setAttribute description]
     * @param {[type]} elm   [description]
     * @param {[type]} attr  [description]
     * @param {[type]} value [description]
     */
    setAttribute: function setAttribute(attr, value) {
        this.element.setAttribute(attr, "" + value);
    },

    /**
     * [getAttribute description]
     * @param  {[type]} attr [description]
     * @return {[type]}      [description]
     */
    getAttribute: function getAttribute(attr) {
        return this.element.getAttribute(attr) || null;
    },

    /**
     * [_attr description]
     * @param  {[type]} elm   [description]
     * @param  {[type]} attr  [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    attr: function attr(_attr, value) {
        if ((typeof _attr === 'undefined' ? 'undefined' : _typeof(_attr)) === "object") {
            for (var key in _attr) {
                this.setAttribute(key, _attr[key]);
            }
            return;
        }

        if (value === undefined) {
            return this.getAttribute(_attr);
        } else {
            this.setAttribute(_attr, value);
        }
    },

    /**
     * empty
     * @return {void}
     */
    empty: function empty() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }
};

},{"../module/utils":30}],14:[function(require,module,exports){
'use strict';

var _utils = require('../module/utils');

module.exports = {
    /**
     * Inserts content specified by the container argument at the end of HTMLElement
     *
     * @param {HTMLElement} container
     * @param {String|HTMLElement} html
     * @return {HTMLElement} inserted element
     */

    append: function append(container) {

        if (!(0, _utils.isNode)(container)) {
            throw new Error("Dom.append " + container + " is not a DOMNode object");
        }

        container.appendChild(this.element);
        return this.element;
    },

    /**
     * Inserts content specified by the html argument at the beginning of HTMLElement
     *
     * @param {HTMLElement} container
     * @param {string|HTMLElement} html
     * @returns {HTMLElement} inserted container
     */
    prepend: function prepend(container) {

        if (!(0, _utils.isNode)(container)) {
            throw new Error("Dom.prepend " + container + " is not a DOMNode object");
        }

        container.insertBefore(this.element, container.firstChild);
        return this.element;
    },

    /**
     * Inserts content specified by the html argument after the HTMLElement
     *
     * @param {HTMLElement} container
     * @returns {HTMLElement} inserted container
     */
    after: function after(container) {

        if (!(0, _utils.isNode)(container)) {
            throw new Error("Dom.after " + container + " is not a DOMNode object");
        }

        container.parentNode.insertBefore(this.element, container.nextSibling);
        return this.element;
    },

    /**
     * Inserts content specified by the html argument before the HTMLElement
     *
     * @param {HTMLElement} container
     * @returns {HTMLElement} inserted container
     */
    before: function before(container) {
        if (!(0, _utils.isNode)(container)) {
            throw new Error("Dom.before " + container + " is not a DOMNode object");
        }

        container.insertBefore(this.element, container);
        return this.element;
    },

    /**
     * Replaces given html container with content specified in html parameter
     *
     * @param {HTMLElement} container
     * @param {string|HTMLElement} html
     * @returns {HTMLElement} inserted container
     */
    replace: function replace(container) {

        if (!this.isNode(container)) {
            throw new Error("Dom.replace " + container + " is not a DOMNode object");
        }

        container.parentNode.replaceChild(this.element, container);
        return this.element;
    },

    /**
     * Removes HTMLElement from dom tree
     *
     * @param {HTMLElement} container
     * @returns {HTMLElement} removed container
     */
    remove: function remove(container) {

        if (!this.isNode(container)) {
            throw new Error("Dom.remove " + container + " is not a DOMNode object");
        }

        var parent = container.parentNode;
        return parent.removeChild(container);
    }
};

},{"../module/utils":30}],15:[function(require,module,exports){
'use strict';

/**
 * Element options
 */

module.exports = {
	lib: 'ui',
	prefix: 'ui',
	name: 'element',
	type: null,
	attr: ['accesskey', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone', 'hidden', 'id', 'lang', 'spellcheck', 'style', 'tabindex', 'title', 'translate', 'type'],
	bind: {
		'dom.click': 'emit.click',
		'dom.dblclick': 'emit.dblclick',
		'dom.mousedown': 'emit.mousedown',
		'dom.mouseup': 'emit.mouseup',
		'dom.mouseleave': 'emit.mouseleave',
		'dom.mouseenter': 'emit.mouseenter',
		'dom.blur': 'emit.blur',
		'dom.focus': 'emit.focus'
	}
};

},{}],16:[function(require,module,exports){

/**
 * storage element class
 *
 * class module/storage
 */
'use strict';

module.exports = {
  /**
   * [store description]
   * @param  {string} key   [description]
   * @param  {value} value [description]
   * @return {Object} The class instance
   */

  store: function store(key, value) {
    this.storage = this.storage || {};

    this.storage[key] = value;

    return this;
  },

  /**
   * [retrieve description]
   * @param  {string} key The key
   * @return {Object} The value or the requested key
   */
  retrieve: function retrieve(key, value) {
    this.storage = this.storage || {};

    return this.storage[key];
  }
};

},{}],17:[function(require,module,exports){

/**
 * storage element class
 *
 * class module/storage
 */
'use strict';

function _typeof2(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _utils = require('../module/utils');

function _typeof(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
}

module.exports = {

    /**
     * Returns current coordinates of the element,
     * relative to the document
     *
     * @param {HTMLElement} element
     * @returns {*}
     */

    offset: function offset() {

        var rect = this.element.getBoundingClientRect();

        var offset = {
            top: Math.round(rect.top),
            right: Math.round(rect.right),
            bottom: Math.round(rect.bottom),
            left: Math.round(rect.left),
            width: rect.width ? Math.round(rect.width) : Math.round(this.element.offsetWidth),
            height: rect.height ? Math.round(rect.height) : Math.round(this.element.offsetHeight)

        };

        //fallback to css width and height
        if (offset.width <= 0) {
            offset.width = parseFloat(this._getComputedStyle('width'));
        }
        if (offset.height <= 0) {
            offset.height = parseFloat(this._getComputedStyle('height'));
        }

        return offset;
    },

    /**
    * Gets element's computed style
    * @param element
    * @param prop
    * @returns {*}
    * @private
    */
    _getComputedStyle: function _getComputedStyle(prop) {

        var computedStyle;

        if (typeof window.getComputedStyle === 'function') {
            //normal browsers
            computedStyle = window.getComputedStyle(this.element);
        } else if (_typeof(document.currentStyle) !== undefined) {
            //shitty browsers
            computedStyle = this.element.currentStyle;
        } else {
            computedStyle = this.element.style;
        }

        if (prop) {
            return computedStyle[prop];
        } else {
            return computedStyle;
        }
    },

    /**
     * Sets or gets HTMLElement's style
     *
     * @param {HTMLElement} element
     * @param {Object} style key value pair object
     * @returns {Object|false}
     */
    style: function style(_style) {

        if ((0, _utils._isIterable)(this.element) && (0, _utils._isLiteralObject)(_style)) {
            (0, _utils._each)(this.element, function (e) {
                this.style(e, _style);
            });
            return this;
        }

        //get one this.element
        if (typeof _style === "string") {
            return this._getComputedStyle((0, _utils.cssNameProperty)(_style));
        }

        //get array of this.elements
        if ((0, _utils._isArray)(_style)) {
            var css = {};
            for (var i in _style) {
                css[_style[i]] = this._getComputedStyle((0, _utils.cssNameProperty)(_style[i]));
            }
            return css;
        }

        if ((0, _utils._isLiteralObject)(_style)) {
            //set csses
            for (var j in _style) {
                this.element.style[(0, _utils.cssNameProperty)(j)] = _style[j];
            }
            return _style;
        }

        return false;
    }
};

},{"../module/utils":30}],18:[function(require,module,exports){
'use strict';

function _typeof2(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ("value" in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

function _typeof(obj) {
	return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var View = require('./view');
var defaults = require('./container/options');

var Element = require('./element');
var Field = require('./control/field');

var fieldset = require('./form/fieldset');

/**
 * Form class
 *
 * @class
 * @extends {Component}
 * @return {Class} This class instance
 */

var Form = (function (_View) {
	_inherits(Form, _View);

	function Form() {
		_classCallCheck(this, Form);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).apply(this, arguments));
	}

	_createClass(Form, [{
		key: 'init',

		/**
   * Initialize View
   * @return {void}
   */
		value: function init(options) {
			//need to remove the options template to have a reference
			this.template = options.template;

			this.name = 'form';

			_get(Object.getPrototypeOf(Form.prototype), 'init', this).call(this, options);

			this.options = [defaults, options].reduce(Object.assign, {});

			if (this.options.template) {
				delete this.options.template;
			}

			// for backward compatibility
			this.info = this.info = {};

			Object.assign(this, fieldset);

			this.field = {};
		}

		/**
   * [_initForm description]
   * @return {Object} This class instance
   */

	}, {
		key: 'build',
		value: function build() {
			_get(Object.getPrototypeOf(Form.prototype), 'build', this).call(this);

			this.form = new Element('form', {
				//method: 'post'
			}).inject(this.c.body.element);

			return this;
		}

		/**
   * [_onSubmit description]
   * @return {void}
   */

	}, {
		key: '_onSubmit',
		value: function _onSubmit(e) {
			e.preventDefault();
		}

		/**
   * Initialize Detail View
   * @param  {Object} doc   Document
   * @param  {Object} model
   * @return {void}
   */

	}, {
		key: '_setForm',
		value: function _setForm(doc, model, params) {
			params = params || {};

			var opts = this.options;

			if (this.control && this.control.what) {
				this.control.what.set('text', doc.type);
			}

			this.list = {};

			this.mask = opts.mask;
			this.type = this.options.type;

			// if (!params.top) {
			// 	this.form.styles(this.form.getSize());
			// }

			//this.form.empty();

			if (doc.status) {
				this.form.attribute('data-status', doc.status);
			}

			if (!doc) {
				return;
			}

			//this.readonly = this.readonly || opts.readOnly;

			this._initTemplate(doc, model);
		}

		/**
   * Initialize form model
   * @return {void}
   */

	}, {
		key: '_initTemplate',
		value: function _initTemplate(doc, template) {

			var comps = {};
			var spec = {};
			var defs = {};

			template = template || this.template;

			if (!template && !template.components) {
				return false;
			}

			//clone the array
			comps = template.components.slice();
			defs = template;
			spec = template;

			this._processComponents(comps, spec, defs);
		}

		/**
   * [_processComponents description]
   * @param  {Array} comps [description]
   * @param  {Object} spec  [description]
   * @param  {Object} defs  [description]
   */

	}, {
		key: '_processComponents',
		value: function _processComponents(comps, spec, defs) {
			if (this.readonly === undefined && spec && spec._mode === 'readonly' || this.readonly || defs._mode === 'readonly') {
				this.readonly = true;
			} else {
				this.readonly = false;
			}

			for (var i = 0; i < comps.length; i++) {
				var component = comps[i];

				var group = spec[component] || defs[component];

				if (!group) {
					continue;
				}

				if (group.type === 'fieldset') {
					this._initFieldset(group, this.form);
				}
			}

			this.focuskey = defs.focus;
		}

		/**
   * [_initFields description]
   * @param  {Array} keys    [description]
   * @param  {HTMLElement} element [description]
   */

	}, {
		key: '_initFields',
		value: function _initFields(keys, element) {
			var info = this.info;

			var group = this._initGroup(element);

			for (var i = 0, len = keys.length; i < len; i++) {
				var key = keys[i];

				this._initField(key, info, group);

				// if (key.type === 'button' && key.name === 'deleteNode') {
				// 	this._initDeleteButton(key, doc, group);
				// }
			}
		}

		/**
   * Process field object
   * @param  {Object} object   [description]
   * @param  {Element} element [description]
   */

	}, {
		key: '_initObjectField',
		value: function _initObjectField(object, element) {
			var info = this.info;
			var list = object._list || [];

			var group = this._initGroup(element);

			for (var i = 0; i < list.length; i++) {
				var name = list[i];
				var key = object[name];

				this._initField(key, info, group);
			}
		}

		/**
   * Instanciate group of field
   * @param  {Element} element
   * @return {Element} the group element
   */

	}, {
		key: '_initGroup',
		value: function _initGroup(element) {

			var group = new Element('div', {
				'class': 'group'
			}).inject(element);

			group.text(element.legend);

			return group;
		}

		/**
   * Initialize Field for the given key according the data and the model
   * @param  {string} key   [description]
   * @param  {Object} info  [description]
   * @param  {string} group [description]
   */

	}, {
		key: '_initField',
		value: function _initField(key, info, group) {

			key = key || {};

			var type = key.type;
			var method;

			type = type || 'Input';

			// if (typeof type === 'string') {
			// 	method = pascalCase(type);
			// }

			if (this['_init' + method]) {
				this['_init' + method](key, info, group);
			} else {
				this._initInput(key, info, group);
			}
		}

		/**
   * Initialize input
   * @param  {key} key [description]
   * @param  {Object} info
   * @param  {Element} group
   * @return {void}
   */

	}, {
		key: '_initInput',
		value: function _initInput(key, info, group) {
			key = key || {};
			key.name = key.name || '';

			//var n = key.name.split(/\./);

			var value = this.getValueFromKey(key.name, info);

			if (!value && key.default) {
				value = key.default;
				this.updateDocKey(key.name, key.default);
			}

			if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
				value = JSON.stringify(value);
				value = value.replace(/[&\/\\"{}\[\]]/g, '');
				value = value.replace(/[,]/g, ', ');
				value = value.replace(/[:]/g, ': ');
			}

			var _name = key.name.replace('.', '-');

			var type = key.type || 'text';

			var input = new Field({
				css: 'field-' + _name,
				type: type,
				name: key.name,
				label: key.name,
				text: key.text,
				value: value,
				error: true
			}).inject(group);

			if (key.kind) {
				input.addClass('kind-' + key.kind);
			}

			this.field[key.name] = input;

			if (key.klss) {
				input.addClass(key.klss);
			}

			input.input.on('keyup', function () {
				//self._onInputKeyUp(input, ev);
			});

			input.input.on('blur', function () {
				//self._onInputBlur(input);
			});
		}

		/**
   * Update this.info for the given key name (three levels)
   * @param  {string} name The name of the key in dot notation
   * @param  {Mixin} value The related key value
   * @return {Mixin} Value
   */

	}, {
		key: 'updateDocKey',
		value: function updateDocKey(name, value) {
			var keys = name.split(/\./);

			if (keys.length === 1) {
				this.info[keys[0]] = value;
			}

			if (keys.length === 2) {
				if (!this.info[keys[0]]) {
					this.info[keys[0]] = {};
				}

				this.info[keys[0]][keys[1]] = value;
			}
			if (keys.length === 3) {
				if (!this.info[keys[0]]) {
					this.info[keys[0]] = {};
				}
				if (!this.info[keys[0]][keys[1]]) {
					this.info[keys[0]][keys[1]] = {};
				}

				this.info[keys[0]][keys[1]][keys[2]] = value;
			}

			if (keys.length === 4) {
				if (!this.info[keys[0]]) {
					this.info[keys[0]] = {};
				}
				if (!this.info[keys[0]][keys[1]]) {
					this.info[keys[0]][keys[1]] = {};
				}
				if (!this.info[keys[0]][keys[1]][keys[2]]) {
					this.info[keys[0]][keys[1]][keys[2]] = {};
				}

				this.info[keys[0]][keys[1]][keys[2]][keys[3]] = value;
			}

			return value;
		}

		/**
   * Get Value for the given key
   * @param  {string} name defined in dot notation
   * @param  {Object} info
   * @return {Mixin} The Value of the given key
   */

	}, {
		key: 'getValueFromKey',
		value: function getValueFromKey(name, info) {
			var keys = name.split(/\./);
			var value = null;

			if (!name || !info) {
				return;
			}

			if (keys.length === 1) {
				value = info[keys[0]];
			}
			if (keys.length === 2 && info[keys[0]]) {
				if (info[keys[0]]) {
					value = info[keys[0]][keys[1]];
				}
			}
			if (keys.length === 3) {
				if (info[keys[0]]) {
					if (info[keys[0]][keys[1]]) {
						value = info[keys[0]][keys[1]][keys[2]];
					}
				}
			}

			return value;
		}

		/**
   * Getter
   *
   * @param {string} prop
   * @param {string} value
   * @return {Object|void}
   */

	}, {
		key: 'get',
		value: function get(prop, value) {
			switch (prop) {
				case 'key':
					return this.getValueFromKey(value, this.info);
				case 'info':
					return this.getInfo();
				case 'unsaved':
					return this.original;
				case 'type':
					return this.type;
				case 'options':
					return this.options;
				default:
					//default will replace the old method see up
					return this.getValueFromKey(prop, this.info);
				/*case 'model':
    	return this.getSelectedModel();*/
			}
		}

		/**
   * [add description]
   * @param {string} type
   */

	}, {
		key: 'addIndo',
		value: function addIndo() {

			this._setInfo({
				type: this.options.type
			});
		}

		/**
   * Set Detail view with the given information and model
   * @param {Object} doc   [description]
   * @param {Object} opts [description]
   */

	}, {
		key: 'setInfo',
		value: function setInfo(doc, opts) {

			opts = opts || {};

			if (this.mode === 'edit') {
				return;
			}

			if (!doc && !opts.mask) {
				this.clear();
				return;
			}

			this.original = doc;
			this.originalMask = opts.mask;

			//this.destroyCkeInstance();

			//In test for real time editing
			if (this.info) {
				this.emit('unset', [this.info._id, this]);
			}

			if (this.control && this.control.add && doc && doc._id) {
				this.control.add.setState(null);
			}

			this.readonly = undefined;

			if (opts.readonly !== undefined) {
				this.readonly = opts.readonly;
			}

			this._setInfo(doc, opts.mask);

			var id = null;
			if (doc) {
				id = doc._id;
			}
			this.emit('set', [id, this]);
			this.emit('settings', ['infoId', id]);

			//mnml.view.ctrl.focus(this);
		}

		/**
   * Set Detail view with the given information and model
   * @param {Object} doc   [description]
   * @param {Object} mask [description]
   * @param {Object} opts [description]
   */

	}, {
		key: '_setInfo',
		value: function _setInfo(doc, mask, opts) {

			if (this.form) {
				this.form.style('display', 'block');
			}

			var name = doc.name || doc.title;

			if (this.control && this.control.title) {
				this.control.title.text(name);
			}

			/*if (this.options.container)
   	this.options.container.focus();*/

			this.info = null;
			this.info = doc; // Object.clone(doc);
			this.relatedListEvents = false;

			this._setForm(this.info, mask, opts);

			if (this.container) {
				this.container.emit('resize');
			}
		}

		/**
   * Set view accorrding the given mode
   * @param {string} mode edit or not
   */

	}, {
		key: 'setMode',
		value: function setMode(mode) {
			this.emit('mode', [this, mode]);

			this.mode = mode;
		}

		/**
   * [getType description]
   * @return {string} [description]
   */

	}, {
		key: 'getType',
		value: function getType() {
			return this.type;
		}

		/**
   * [getInfo description]
   * @return {Object} [description]
   */

	}, {
		key: 'getInfo',
		value: function getInfo() {
			return this.info || null;
		}
	}]);

	return Form;
})(View);

module.exports = Form;

},{"./container/options":7,"./control/field":10,"./element":12,"./form/fieldset":19,"./view":31}],19:[function(require,module,exports){
'use strict';

var Element = require('../element');

/**
 * Module fieldset
 * @module form/fieldset
 */
var fieldset = {

	/**
  * Initialize form fieldset
  * @return {void}
  */

	_initFieldset: function _initFieldset(fieldset, form) {
		var legend = null;

		var element = new Element('div', {
			'class': 'form-fieldset'
		}).inject(form);

		if (fieldset.name) element.addClass('fieldset-' + fieldset.name);

		if (fieldset.klss) element.addClass(fieldset.klss);

		if (fieldset.state === 'closed') element.addClass('closed');

		if (fieldset.text) {
			legend = new Element('span', {
				'class': 'fieldset-legend'

			}).inject(element);

			legend.text(fieldset.text);
			legend.attribute('data-name', fieldset.text);

			var caret = new Element('span', {
				'class': 'icon-font mdi_navigation_chevron_right'
			}).inject(legend, 'top');
		}

		if (fieldset.buttons) {
			this._initButtons(fieldset.buttons, this.doc, legend);
		}

		if (legend) element.store('legend', legend);

		// if (typeOf(fieldset.menu) == 'object') {
		// 	this._initFieldsetMenu(fieldset.menu, legend);
		// } else if (typeOf(fieldset.menu) == 'array') {
		// 	for (var i = 0; i < fieldset.menu.length; i++) {
		// 		var menu = fieldset.menu[i];
		// 		this._initFieldsetMenu(menu, legend);
		// 	}
		// }

		if (fieldset.field) {
			this._initObjectField(fieldset.field, element);
		} else if (fieldset.fields) {
			this._initFields(fieldset.fields, element);
		}
	}

	// /**
	//  * Initialize form fieldset menu if exists
	//  * @return {void}
	//  */
	// _initFieldsetMenu(menu, legend) {
	// 	var self = this;

	// 	var addBtn = new ButtonControl(menu)
	// 	.inject(legend);

	// 	addBtn.on(menu.emit, function(){
	// 		self.fireEvent(menu.emit, self);
	// 	});

	// }

};

module.exports = fieldset;

},{"../element":12}],20:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ("value" in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Container = require('./container');

var container = require('./layout/container');
var resizer = require('./layout/resizer');

var defaults = require('./layout/options');

/**
 * The Layout view
 * @class
 */

var Layout = (function (_Container) {
	_inherits(Layout, _Container);

	function Layout() {
		_classCallCheck(this, Layout);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Layout).apply(this, arguments));
	}

	_createClass(Layout, [{
		key: 'init',

		/**
   * initiate class
   * @param  {Object} options The class options
   * @return {Object} The class instance
   */
		value: function init(options) {
			var _this2 = this;

			_get(Object.getPrototypeOf(Layout.prototype), 'init', this).call(this, options);
			this.name = 'layout',
			// merge options
			this.options = [defaults, options].reduce(Object.assign, {});
			this.window = window;

			Object.assign(this, container);
			Object.assign(this, resizer);

			window.addEventListener('resize', function () {
				_this2.emit('resize');
			});

			return this;
		}

		/**
   * Build
   * @return {Object} [description]
   */

	}, {
		key: 'build',
		value: function build(options) {
			_get(Object.getPrototypeOf(Layout.prototype), 'build', this).call(this, options);

			var opts = this.options;

			this.addClass('ui-layout');
			this.addClass('layout-standard');
			this.addClass('ui-container');

			if (opts.node && opts.node._node) this.addClass('layout-' + opts.node._name);

			if (this.options.theme) this.addClass('theme-' + this.options.theme);

			var node = opts.node;
			this.settings = opts.settings || {};
			// this.component = {};
			// this.components = [];
			this.resizer = {};

			node.container = this.c.body;

			this.render(node);

			return this;
		}

		/**
   * [_process description]
   * @param  {Object} node Layout structure
   * @return {string} type type of node e. tab
   */

	}, {
		key: 'render',
		value: function render(node, type, level) {
			var list = node._list || [];
			level = level++ || 1;

			if (type !== 'tab') {
				this._initFlexDirection(node.container, node._axis);
			}

			for (var i = 0, len = list.length; i < len; i++) {
				var name = list[i];
				var comp = node[name] || {};

				comp.clss = comp.clss || this.options.clss;
				comp.opts = comp.opts || {};
				comp.opts.name = name;
				comp.opts.position = i + 1;
				comp.opts.nComp = list.length;

				if (i === list.length - 1) {
					comp.opts.last = true;
				}

				if (type !== 'tab') {
					comp.opts.container = node.container;
				}

				var component = this._initContainer(comp);

				if (type === 'tab') {
					component.options.noResizer = true;
					node.container.addTab(component);
				}

				component.element.addClass('container-' + name);

				if (comp.node) {
					comp.node.container = component;

					if (component.options.clss === 'tab') {
						this.render(comp.node, 'tab', level);
					} else {
						this.render(comp.node, null, level);
					}
				}
			}
		}
	}, {
		key: '_resize',
		value: function _resize() {
			console.log('resize');
		}

		/**
   * [_initFlexDirection description]
   * @param  {Element} container Init direction for the given container
   * @param  {string} axis (x,y)
   */

	}, {
		key: '_initFlexDirection',
		value: function _initFlexDirection(container, axis) {
			if (!container) return;

			axis = axis || 'x';

			if (axis === 'x') {
				container.addClass('flex-raw');
			} else if (axis === 'y') {
				container.addClass('flex-column');
			}
		}
	}]);

	return Layout;
})(Container);

module.exports = Layout;

},{"./container":5,"./layout/container":21,"./layout/options":22,"./layout/resizer":23}],21:[function(require,module,exports){
'use strict';

var Container = require('../container');

var container = {

	/**
  * Instanciate the given object comp
  * @param  {Object} comp list component
  * @return {component}
  */

	_initContainer: function _initContainer(comp) {
		var options = comp.opts || {};

		// shortcuts
		options.flex = options.flex || comp.flex;
		options.hide = options.hide || comp.hide;
		options.theme = options.theme || comp.theme;

		var name = options.name || 'main';

		//options.container = comp.container;
		var component = this[name] = new Container(options);

		// register component
		this._componentRegister(name, component);

		//settings
		//this._initComponentSettings(component);

		// style, size and event
		this._setComponentStyles(component);
		this._setComponentDisplay(component);
		this._attachComponentEvents(component);

		return component;
	},

	/**
  * [_componentRegister description]
  * @param  {string} name      [description]
  * @param  {component} component [description]
  */
	_componentRegister: function _componentRegister(name, component) {

		this.components = this.components || [];
		this.components.push(component);
	},

	/**
  * [_initComponentSettings description]
  * @param  {component} component [description]
  */
	// _initComponentSettings(component) {
	//
	// 	var name = component.getName();
	// 	var element = component.element;
	// },

	/**
  * [_initComponentSettings description]
  * @param  {component} component [description]
  */
	_setComponentStyles: function _setComponentStyles(component) {

		if (component.options.flex) {
			component.addClass('flex-' + component.options.flex);
		}

		if (component.options.hide) {
			component.style('display', 'none');
		}

		if (component.options.theme) {
			component.element.addClass('theme' + '-' + component.options.theme);
		}
	},

	/**
  * [_initSize description]
  * @param  {component} component [description]
  */
	_setComponentDisplay: function _setComponentDisplay(component) {
		var display = 'normalized';

		// var name = component.getName();
		// if (this.settings[name] && this.settings[name].display) {
		// 	display = this.settings[name].display;
		// }

		component.setDisplay(display, 'width');

		if (component.options.flex) return;

		this._initResizer(component);
		this.emit('drag');
	},

	/**
  * _setComponentSettings description
  * @param {Object} component Component object
  */
	// _setComponentSettings(component) {
	// 	var display = 'normalized';

	// 	var name = component.getName();
	// 	var element = component.element;

	// 	if (component.options.flex) {

	// 		if (this.settings[name] && this.settings[name].width) {
	// 			//style('flex', 'none');
	// 			element.addClass('flex-none');
	// 			if (display === 'minimized') {

	// 				style('width', 0);
	// 			} else {

	// 				if (this.settings[name].width < 32)
	// 					this.settings[name].width = 32;

	// 				element.style('width', this.settings[name].width || 160);
	// 			}

	// 			component.width = this.settings[name].width || 200;
	// 			component._modifier = 'width';
	// 		} else if (this.settings[name] && this.settings[name].height) {
	// 			element.style('flex', 'none');
	// 			element.style('height', this.settings[name].height);
	// 			component.height = this.settings[name].height || 160;
	// 			component._modifier = 'height';
	// 		}
	// 	}
	// },

	/**
  * [_attachComponentEvents description]
  * @param  {component} component [description]
  */
	_attachComponentEvents: function _attachComponentEvents(component) {
		var _this = this;

		var name = component.getName();

		/**
   * 	toggled
   */
		component.on('toggled', function () {
			_this.emit('resize');
		}).on('resizing', function () {
			_this.emit('resize');
		}).on('display', function (state) {
			_this.emit('display', [name, state]);
		});

		this.on('resize', function () {
			component.emit('resize');
		}).on('drag:', function () {
			component.emit('resize');
		}).on('normalize', function () {
			component.emit('resize');
		}).on('maximize', function () {
			component.emit('resize');
		}).on('minimize', function () {
			component.emit('resize');
		});
	}
};

module.exports = container;

},{"../container":5}],22:[function(require,module,exports){
'use strict';

/**
 * Element options
 */

module.exports = {
	name: 'layout',
	prefix: 'ui',
	component: ['body'],

	tag: 'div',

	settings: {
		list: {
			width: 320
		},
		navi: {
			width: 230,
			display: "normalized"
		}
	},
	resizer: {
		modifier: {
			row: {
				size: 'width',
				from: 'left',
				mode: {
					y: false
				}
			},
			column: {
				size: 'height',
				from: 'top',
				mode: {
					x: false
				}
			}
		}
	}
};

},{}],23:[function(require,module,exports){
'use strict';

var Element = require("../element");

var resize = {

	/**
  * _initResizeBorder description
  * @param  {component} component [description]
  */

	_initResizer: function _initResizer(component) {
		var name = component.options.name;

		var container = component.container || component.options.container.element;
		var direction = this._initResizerDirection(container);
		var modifier = this.options.resizer.modifier[direction];

		if (!direction || !modifier || !container) {
			return;
		}

		var resizer = this.resizer[name] = new Element('div.ui-resizer').inject(container);

		resizer.attribute('data-name', name);

		if (modifier.size) {
			resizer.addClass('resizer-' + modifier.size);
		}

		this._initResizerDrag(resizer, modifier, component);
		this._initResizerEvent(component, resizer, modifier);
	},

	/**
  * _initResizerDirection - description
  *
  * @param  {type} container description
  * @return {type}           description
  */
	_initResizerDirection: function _initResizerDirection(container) {
		var direction;

		if (container.hasClass('flex-column')) {
			direction = 'column';
		} else if (container.hasClass('flex-raw')) {
			direction = 'row';
		}

		return direction;
	},

	/**
  * _initResizerDrag
  */
	_initResizerDrag: function _initResizerDrag(resizer, modifier, component) {
		var _this = this;

		var self = this;

		var element = component.element;
		var from = modifier.from;
		var size = modifier.size;

		// the last statement is temporary before i fix the component correctly
		var container = component.container || component.options.container.element;
		var last = component.options.last;

		var draggable = DragDrop.bind(resizer.dom, {
			//anchor: anotherElement,
			boundingBox: 'offsetParent',
			dragstart: function dragstart() {
				self.emit('resizeStart', component);
				//self.mask.setStyle('display', 'block');
			},
			drag: function drag(evt) {
				//self.mask.setStyle('display', 'block');
				var coord = {};

				var c = {};

				coord[from] = parseInt(element.compute(from).replace('px', ''));

				c[from] = parseInt(resizer.compute(from).replace('px', ''));

				if (last) {
					console.log('--');
					var csize = container.getSize()[size];
					element.style(size, csize - c[from]);
				} else {
					element.style(size, c[from] - coord[from]);
				}

				//this._updateSize(component, resizer, modifier);
				_this.emit('drag', evt);
			},
			dragend: function dragend(evt) {
				//self.mask.setStyle('display', 'none');

				// var coord = {};

				// coord[modifier.from] = parseInt(element.compute(modifier.from).replace('px', ''));
				// coord[modifier.size] = parseInt(element.compute(modifier.size).replace('px', ''));

				// var size = element.style(container)[modifier.size];
				// self.emit('resizer', [component.main, modifier.size, size]);
				// component.emit('resizeComplete', [modifier.size, size]);

				// component[modifier.size] = size;
				_this.emit('resizeEnd', evt);
			}
		});

		return draggable;
	},

	/**
  * [_initResizerEvent description]
  * @param  {component} component [description]
  * @param  {element} resizer   [description]
  * @param  {string} modifier  [description]
  */
	_initResizerEvent: function _initResizerEvent(component, resizer, modifier) {
		var _this2 = this;

		resizer.on('click', function (e) {
			e.stopPropagation();
		});
		resizer.on('mousedown', function (e) {
			e.stopPropagation();
		});
		resizer.on('mouseup', function (e) {
			e.stopPropagation();
		});

		this.on('drag', function () {
			_this2._updateSize(component, resizer, modifier);
		});
		this.on('maximize', function () {
			_this2._updateSize(component, resizer, modifier);
		});
		this.on('normalize', function () {
			_this2._updateSize(component, resizer, modifier);
		});
		this.on('resize', function () {
			_this2._updateSize(component, resizer, modifier);
		});
	},

	/**
  * _updateSize
  * @param  {component} component [description]
  * @param  {element} resizer   [description]
  * @param  {string} modifier  [description]
  */
	_updateSize: function _updateSize(component, resizer, modifier) {
		// the last statement is temporary before i fix the component correctly
		var container = component.container || component.options.container.element;
		var element = component.element;
		var from = modifier.from;
		var size = modifier.size;

		var coord = {};
		coord[from] = element.getCoord()[from];
		coord[size] = element.getSize()[size];

		// for the last component
		// the resizer is on the left or on the top
		if (component.options.last) {
			var csize = container.getSize()[size];
			resizer.style(from, csize - coord[size] - 3);
		} else {
			resizer.style(from, coord[from] + coord[size] - 3);
		}

		this.emit('size');
	}
};

module.exports = resize;

},{"../element":12}],24:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ("value" in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var View = require('./view');
var Emitter = require("./module/emitter");
var bind = require('./module/bind');

var Element = require('./element');

//var Surface = require('./view/surface');
//var Collection = require('./view/collection');
//var Filter = require('./view/filter');
//var Select = require('./view/select');
//var Search = require('./list/search');

var defaults = require('./list/options');

/**
 * List view class
 * @class
 * @param {Object} options Default options for view
 * @extends {View}
 * @since 0.0.4
 * @author Jerome Vial
 *
 * @type {prime}
 */

var List = (function (_View) {
	_inherits(List, _View);

	function List() {
		_classCallCheck(this, List);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));
	}

	_createClass(List, [{
		key: 'init',

		/**
   * [_initView description]
   * @return  Class instance
   */
		value: function init(options) {
			_get(Object.getPrototypeOf(List.prototype), 'init', this).call(this, options);

			Object.assign(this.options, [defaults, options].reduce(Object.assign, {}));

			this.name = this.options.name;

			this.filters = [];
			this.data = [];

			this.items = [];

			if (this.options.render) {
				this.render = this.options.render;
			}

			return this;
		}

		/**
   * [_initList description]
   * @param  {Object} options this class options
   * @return {Object} The class instance	
   */

	}, {
		key: 'build',
		value: function build(options) {
			_get(Object.getPrototypeOf(List.prototype), 'build', this).call(this);

			options = options || this.options;

			this.items = [];

			//this.element.addClass('type-'+this.tmpl._type);
			this.element.addClass('view-' + this.options.name);

			//this.content = this.c.body;

			//this._initSearch();

			var self = this;

			this.c.body.delegate('click', '.ui-button', function (event, item) {
				//console.log(event, item);
				self.select(item, event);
			});

			//this.container.emit('resize');
			return this;
		}

		/**
   * select
   * @param  {Element} item  [description]
   * @param  {event} event The caller event
   * @return        [description]
   */

	}, {
		key: 'select',
		value: function select(item, event) {

			this.item = item;

			this.emit('selected', item[0]);
		}

		/**
   * Setter
   * @param {string} prop
   * @param {string} value
   */

	}, {
		key: 'set',
		value: function set(prop, value, options) {

			switch (prop) {
				case 'list':
					this.setList(value, options);
					break;
				default:
					this.setList(value, options);
			}

			return this;
		}

		/**
   * Set list
   * @param {Array} list List of info object
   * @return {Object} The class instance
   */

	}, {
		key: 'setList',
		value: function setList(list) {

			for (var i = 0; i < list.length; i++) {
				var item = this.render(list[i]);

				item.element.store('info', list[i]);

				this.addItem(item, i);
			}

			return this;
		}

		/**
   * Insert info
   * @param  {Object} info Info object
   * @param  {integer} x    [description]
   * @param  {integer} y    [description]
   * @return {Object} The class instance
   */

	}, {
		key: 'insert',
		value: function insert(info, x, y) {

			if (this.list.indexOf(info._id) > -1) return;

			this.list.push(info._id);

			var item = this.addItem(info);

			return this;
		}

		/**
   * [add description]
   * @param {Object} item [description]
   */

	}, {
		key: 'addItem',
		value: function addItem(item, index) {

			if (!item) {
				return;
			}

			var where = 'bottom';

			item.inject(this.c.body, where);
			this.items.push(item);

			//this._initDragItem(item);
			return item;
		}

		/**
   * Reverse the list order
   * @return {Object} The class instance
   */

	}, {
		key: 'reverse',
		value: function reverse() {
			this.list.reverse();
			this.update(this.list);

			return this;
		}
	}]);

	return List;
})(View);

module.exports = List;

},{"./element":12,"./list/options":25,"./module/bind":26,"./module/emitter":29,"./view":31}],25:[function(require,module,exports){
'use strict';

/**
 * [defaults description]
 */

module.exports = {
	name: 'list',
	base: 'view',
	prefix: 'ui',
	comp: ['body'],
	bind: {
		'add': 'new'
	}
};

},{}],26:[function(require,module,exports){
'use strict';

/**
 * Bind module
 * @module module/bind
 */

function _typeof2(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _typeof(obj) {
	return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
}

module.exports = {

	/**
  * Iterate and bind passed Object
  * @param {Object} options
  * @return {Object}      this.bind
  */
	bind: function bind(options) {
		options = options || this.options.bind;

		if (!options) return;

		if (!options._list) {
			this._bindObject(options);
		} else {
			var list = options._list;

			for (var i = 0; list.length > i; i++) {
				var bind = binding[list[i]];
				this.binding = this.binding || {};

				this._bindObject(bind);
			}
		}

		return this;
	},

	/**
  * Bind an object
  * @param  {Object} obj obj whit key and value to be bound
  * @return {void}
  */
	_bindObject: function _bindObject(obj) {

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				var value = obj[key];

				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
					this._bindKey(key, value);
				} else {
					this._bindList(key, value);
				}
			}
		}
	},

	/**
  * Bind a list of events to a specific object
  * @param  {string} key Object path that will listen
  * @param  {Array} values List if values to bind
  * @return {void}
  */
	_bindList: function _bindList(key, values) {

		for (var i = 0; i < values.length; i++) {
			this._bindKey(key, values[i]);
		}
	},

	/**
  * Bind to object path
  * get the event,
  * get the reference to the last key of the first object,
  * check if there is a event or a mehtod to bind
  * @param  {string} key Object path that will listen
  * @param  {string} val Object path to be bound
  * @return {void}
  */
	_bindKey: function _bindKey(key, val) {
		var eventKeys = key.split('.');
		var ev = eventKeys[eventKeys.length - 1];

		eventKeys.pop();
		var listener = this._path(eventKeys.join('.'));

		var valKeys = val.split('.');

		//Check if it's an event
		if (valKeys[valKeys.length - 2] === 'emit') {
			var emit = valKeys[valKeys.length - 1];
			this._bindEvent(listener, ev, emit, val);
		} else {
			this._bindMethod(listener, ev, val);
		}
	},

	/**
  * Listen to the given event and trigger another
  * @param  {Object} listener Object to listen
  * @param  {string} ev Event that will be listened
  * @param  {string} emit Event that will be emitted
  * @param  {string} val Method path to be bound
  * @return {void}
  */
	_bindEvent: function _bindEvent(listener, ev, emit, val) {

		var valKeys = val.split('.');
		valKeys.splice(-2, 2);

		var bound = this._path(valKeys.join('.'));

		if (listener && listener.on && bound && bound.emit) {
			listener.on(ev, bound.emit.bind(bound, emit));
		}
	},

	/**
  * Listen to the given event and bind to the given method
  * @param  {Object} listener Object to listen
  * @param  {string} ev Event that will be listened
  * @param  {string} val Method path to be bound
  * @return {void}
  */
	_bindMethod: function _bindMethod(listener, ev, val) {
		var method = this._path(val);

		var valKeys = val.split('.');
		valKeys.pop();
		var bound = this._path(valKeys.join('.'));

		if (method && method.bind && bound) {
			listener.on(ev, method.bind(bound));
		}
	},

	/**
  * Return the last reference from an object
  * @param  {string} str Object path for example key1.key2.key3
  * @return {value} The value of the last reference
  */
	_path: function _path(str) {
		if (!str) return this;else if (!str.match(/\./)) return this[str];

		var last;

		var keys = str.split('.');
		for (var i = 0, l = keys.length; i < l; i++) {
			var key = keys[i];

			last = last || this;
			last = last[key];
		}

		return last;
	}

};

},{}],27:[function(require,module,exports){
'use strict';

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var instance = null;

/**
 * 
 */

var Controller = (function () {

	/** 
   * Setting up block level variable to store class state
   * , set's to null by default.
   * credits: http://amanvirk.me/singleton-classes-in-es6/
 */

	function Controller() {
		_classCallCheck(this, Controller);

		if (!instance) {
			instance = this;
		}

		this.components = this.components || [];
		this.component = this.component || {};

		return instance;
	}
	/**
  * [register description]
  * @param  {component} component [description]
  * @return {Object} The class instance
  */

	_createClass(Controller, [{
		key: 'register',
		value: function register(component) {
			this.components.push(component);

			this.component[component.name] = this.component[component.name] || [];

			this.component[component.name].push(component);

			return this;
		}

		/**
   * [focus description]
   * @param  {component} component [description]
   * @return {Object} The class instance
   */

	}, {
		key: 'focus',
		value: function focus(component) {
			if (component === null) {
				return;
			}

			if (this.active !== component) {
				if (this.active) this.blur(this.active);

				this.active = component;
				component.emit('focus');
			}

			return;
		}

		/**
   * [blur description]
   * @param  {component} component [description]
   * @return {Object} The class instance
   */

	}, {
		key: 'blur',
		value: function blur(component) {
			component.emit('blur', component);

			return;
		}
	}]);

	return Controller;
})();

module.exports = Controller;

},{}],28:[function(require,module,exports){
(function (process,global){
'use strict';

var kindOf = require("mout/lang/kindOf");

var callbacks = {
    timeout: {},
    frame: [],
    immediate: []
};

/**
 * defer
 * @class
 * @author https://github.com/kamicane
 */

var push = function push(collection, callback, context, defer) {

    var iterator = function iterator() {
        iterate(collection);
    };

    if (!collection.length) defer(iterator);

    var entry = {
        callback: callback,
        context: context
    };

    collection.push(entry);

    return function () {
        var io = collection.indexOf(entry);
        if (io > -1) collection.splice(io, 1);
    };
};

/**
 * [iterate description]
 * @param  {Array} collection [description]
 * @return {void}            [description]
 */
var iterate = function iterate(collection) {
    var time = Date.now();

    collection.splice(0).forEach(function (entry) {
        entry.callback.call(entry.context, time);
    });
};

var defer = function defer(callback, argument, context) {
    return kindOf(argument) === "Number" ? defer.timeout(callback, argument, context) : defer.immediate(callback, argument);
};

if (global.process && process.nextTick) {

    defer.immediate = function (callback, context) {
        return push(callbacks.immediate, callback, context, process.nextTick);
    };
} else if (global.setImmediate) {

    defer.immediate = function (callback, context) {
        return push(callbacks.immediate, callback, context, setImmediate);
    };
} else if (global.postMessage && global.addEventListener) {

    addEventListener("message", function (event) {
        if (event.source === global && event.data === "@deferred") {
            event.stopPropagation();
            iterate(callbacks.immediate);
        }
    }, true);

    defer.immediate = function (callback, context) {
        return push(callbacks.immediate, callback, context, function () {
            postMessage("@deferred", "*");
        });
    };
} else {

    defer.immediate = function (callback, context) {
        return push(callbacks.immediate, callback, context, function (iterator) {
            setTimeout(iterator, 0);
        });
    };
}

var requestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame || function (callback) {
    setTimeout(callback, 1e3 / 60);
};

/**
 * [frame description]
 * @param  {Function} callback [description]
 * @param  {[type]}   context  [description]
 * @return {[type]}            [description]
 */
defer.frame = function (callback, context) {
    return push(callbacks.frame, callback, context, requestAnimationFrame);
};

var clear;

/**
 * [timeout description]
 * @param  {Function} callback [description]
 * @param  {[type]}   ms       [description]
 * @param  {[type]}   context  [description]
 * @return {[type]}            [description]
 */
defer.timeout = function (callback, ms, context) {
    var ct = callbacks.timeout;

    if (!clear) clear = defer.immediate(function () {
        clear = null;
        callbacks.timeout = {};
    });

    return push(ct[ms] || (ct[ms] = []), callback, context, function (iterator) {
        setTimeout(iterator, ms);
    });
};

module.exports = defer;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":1,"mout/lang/kindOf":33}],29:[function(require,module,exports){
'use strict';

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var defer = require("./defer");

var slice = Array.prototype.slice;

/**
 * Emitter is a module for managing and emitting events.
 * @class Emitter
 * @author Valerio Proietti
 * @link https://github.com/kamicane/prime/blob/master/emitter.js
 */

var Emitter = (function () {
	function Emitter(stoppable) {
		_classCallCheck(this, Emitter);

		this._stoppable = stoppable;

		return this;
	}

	_createClass(Emitter, [{
		key: "on",
		value: function on(event, fn) {
			var listeners = this._listeners || (this._listeners = {});
			var events = listeners[event] || (listeners[event] = []);

			if (events.indexOf(fn) === -1) events.push(fn);

			return this;
		}
	}, {
		key: "off",
		value: function off(event, fn) {
			var listeners = this._listeners,
			    events = undefined;

			if (listeners && (events = listeners[event])) {

				var io = events.indexOf(fn);
				if (io > -1) events.splice(io, 1);
				if (!events.length) delete listeners[event];
				for (var l in listeners) {
					return this;
				}
				delete this._listeners;
			}
			return this;
		}
	}, {
		key: "emit",
		value: function emit(event) {
			var _this = this;

			var args = slice.call(arguments, 1);

			var fire = function fire() {
				var listeners = _this._listeners;
				var events = undefined;
				if (listeners && (events = listeners[event])) {
					events.slice(0).forEach(function (event) {
						var result = event.apply(_this, args);
						if (_this._stoppable) return result;
					});
				}
			};

			if (args[args.length - 1] === Emitter.EMIT_SYNC) {
				args.pop();
				fire();
			} else {
				defer(fire);
			}

			return this;
		}
	}]);

	return Emitter;
})();

Emitter.EMIT_SYNC = {};

module.exports = Emitter;

},{"./defer":28}],30:[function(require,module,exports){
'use strict';

//ie?

function _typeof2(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _typeof(obj) {
  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
}

var ie = (function () {
  var undef,
      v = 3,
      div = document.createElement('div'),
      all = div.getElementsByTagName('i');
  while ((div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->', all[0])) {}
  return v > 4 ? v : undef;
})();

/**
 * css name property detection
 * @param  {[type]} prop [description]
 * @return {[type]}      [description]
 */
function cssNameProperty(prop) {
  if (ie && ie < 9) {
    for (var exp = /-([a-z0-9])/; exp.test(prop); prop = prop.replace(exp, RegExp.$1.toUpperCase())) {}
    return prop;
  } else {
    return prop;
  }
}

/**
 * Checks if given value is an array
 * @param {*} object
 * @returns {boolean}
 * @private
 */
function _isArray(object) {
  return Object.prototype.toString.call(object) === '[object Array]';
}

/**
 * Checks if given value is a string
 * @param {*} object
 * @returns {boolean}
 * @private
 */
function _isString(object) {
  return typeof object === 'string';
}

/**
 * Checks if given value is a number
 * @param {*} object
 * @returns {boolean}
 * @private
 */
function _isNumeric(object) {
  return typeof object === 'number' && isFinite(object);
}

/**
 * Checks if given value is an object
 * @param {*} object
 * @returns {boolean}
 * @private
 */
function _isObject(object) {
  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
}

/**
 * Checks if given value is a function
 * @param {*} object
 * @returns {boolean}
 * @private
 */
function _isFunction(object) {
  return typeof object === 'function';
}

/**
 * Checks if given node parameter is a DOMNode
 * @param node
 * @returns {*}
 */
function isNode(node) {
  if ((typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object') {
    return node instanceof Node;
  }
  return node && (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && typeof node.nodeType === 'number' && typeof node.nodeName === 'string';
}

/**
 * Checks if given object is a DOMElement
 * @param {Object} element
 * @returns {boolean}
 */
function isElement(element) {
  if ((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object') {
    return element instanceof HTMLElement;
  }

  return element && (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element.nodeType === 1 && typeof element.nodeName === 'string';
}

/**
 * Checks if javascript object is plain object
 * @param {Object} object
 * @returns {*|boolean}
 * @private
 */
function _isLiteralObject(object) {
  return object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === "object" && Object.getPrototypeOf(object) === Object.getPrototypeOf({});
}

/**
 * Checks if object is iterable
 * @param {Object} object
 * @returns {boolean}
 * @private
 */
function _isIterable(object) {
  // if (Dom.isNode(object) || Dom.isElement(object) || object === window) {
  //     return false;
  // }

  var r = _isLiteralObject(object) || _isArray(object) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.length !== undefined;
  return r;
}

/**
 *
 * @param {Object} object
 * @param {Function} callback
 * @private
 */
function _each(object, callback) {
  if (_isArray(object) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object['length'] !== undefined) {
    for (var i = 0, l = object.length; i < l; i++) {
      callback.apply(object[i], [object[i], i]);
    }
    return;
  }

  if (_isLiteralObject(object)) {
    for (var key in object) {
      callback.apply(object[key], [object[key], key]);
    }
  }
}

exports._isArray = _isArray;
exports._isString = _isString;
exports._isFunction = _isFunction;
exports._isNumeric = _isNumeric;
exports._isObject = _isObject;
exports.isElement = isElement;
exports.isNode = isNode;
exports._isIterable = _isIterable;
exports._isLiteralObject = _isLiteralObject;
exports._each = _each;
exports.cssNameProperty = cssNameProperty;

},{}],31:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ("value" in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Container = require('./container');
var defaults = require('./view/options');

var bind = require('./module/bind');

//var Dragging = require('./view/dragging');
//var Loader = require('./view/loader');
//var Limit = require('./view/limit');
//var Scroll = require('./view/scroll');
//var LayoutView = require('./view/layout');
//var Toolbar = require('./toolbar/toolbar');
//var Zoom = require('./view/zoom');

//var viewCtrl = require('./view/ctrl'),

/**
 * View
 * class
 * @param {Object} Default options for view
 * @since 0.0.4
 */

var View = (function (_Container) {
	_inherits(View, _Container);

	function View() {
		_classCallCheck(this, View);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(View).apply(this, arguments));
	}

	_createClass(View, [{
		key: 'init',

		// mixin: [Emitter, Options, binding,
		// 	Toolbar,
		// 	ctrl,
		// 	Dragging,
		// 	Limit,
		// 	Loader,
		// 	Scroll,
		// 	LayoutView,
		// 	Scrolling,
		// 	Zoom
		// ],

		/**
   * Initialize
   *
   * @param {Object} options The class options
   * @return {Object} The class instance
   * @private
   */
		value: function init(options) {
			_get(Object.getPrototypeOf(View.prototype), 'init', this).call(this, options);

			this.name = 'view';

			this.options = [defaults, options].reduce(Object.assign, {});
			this.container = this.options.container;

			this.index = 0;
			this.views = [];

			this.emit('ready');

			return this;
		}

		/**
   * Build
   *
   * @return {void}
   * @private
   * 
   */

	}, {
		key: 'build',
		value: function build() {
			_get(Object.getPrototypeOf(View.prototype), 'build', this).call(this);

			// if (opts.toolbar)
			// 	this._initToolbar(opts.toolbar);

			// if ( opts.resizable )
			// 	this._initResizer();

			this.emit('built');

			return this;
		}

		/**
   * Clear the content of the view
   * @return {Object} This class instance
   */

	}, {
		key: 'clear',
		value: function clear() {
			if (this.content && this.content.empty) {
				this.content.empty();
			}
		}

		/**
   * Close
   * @return {Object} This class instance
   * @private
   */

	}, {
		key: 'close',
		value: function close() {
			this.container.close();

			return this;
		}
	}]);

	return View;
})(Container);

module.exports = View;

},{"./container":5,"./module/bind":26,"./view/options":32}],32:[function(require,module,exports){
'use strict';

module.exports = {
	name: 'view',
	prefix: 'ui',
	tag: 'div',
	bind: {}
};

},{}],33:[function(require,module,exports){


    var _rKind = /^\[object (.*)\]$/,
        _toString = Object.prototype.toString,
        UNDEF;

    /**
     * Gets the "kind" of value. (e.g. "String", "Number", etc)
     */
    function kindOf(val) {
        if (val === null) {
            return 'Null';
        } else if (val === UNDEF) {
            return 'Undefined';
        } else {
            return _rKind.exec( _toString.call(val) )[1];
        }
    }
    module.exports = kindOf;


},{}],"material":[function(require,module,exports){
'use strict';

//automatically generated, do not edit!
//run `node build` instead
module.exports = {
    'component': require('./lib/component'),
    'container': require('./lib/container'),
    'control': require('./lib/control'),
    'button': require('./lib/control/button'),
    'field': require('./lib/control/field'),
    'switch': require('./lib/control/switch'),
    'form': require('./lib/form'),
    'layout': require('./lib/layout'),
    'list': require('./lib/list'),
    'view': require('./lib/view')
};

},{"./lib/component":2,"./lib/container":5,"./lib/control":8,"./lib/control/button":9,"./lib/control/field":10,"./lib/control/switch":11,"./lib/form":18,"./lib/layout":20,"./lib/list":24,"./lib/view":31}]},{},[])
//# sourceMappingURL=material.js.map
