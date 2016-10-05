(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Emitter = require("material/lib/module/emitter");

//var Controller = require('material/lib/module/controller.js');
// main component
var Component = require('material/lib/component.js');
var defaults = require('./options');

// var Container = require('material/lib/container.js');
var Layout = require('material/lib/layout.js');
var List = require('material/lib/list.js');

// controls
var Button = require('material/lib/control/button.js');

/**
 * @class
 */

var Demo = (function (_Emitter) {
	_inherits(Demo, _Emitter);

	//mixin: [Options, Emitter],

	/**
  * @constructor
  * @param  {Object} options - The application options
  * @return {Object} this
  */

	function Demo(options) {
		_classCallCheck(this, Demo);

		//console.log('ready', document.body);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).call(this));

		_this.options = [defaults, options].reduce(Object.assign, {});

		_this.layout = new Layout(_this.options.layout).inject(document.body);
		_this.initNaviView();
		_this.initMainView();

		_this.initData(function (list) {
			console.log(list.photos.photo.length);
			_this.mainView.set('list', list.photos.photo);
		});
		return _this;
	}

	/**
  * [initData description]
  * @return {[type]} [description]
  */

	_createClass(Demo, [{
		key: 'initData',
		value: function initData(callback) {
			console.log('initData');

			var flickrAPI = "";
			flickrAPI += "https://api.flickr.com/services/rest/?";
			flickrAPI += "&method=flickr.photos.search";
			flickrAPI += "&api_key=9012151640d5486e63780579ff3b9cae";
			flickrAPI += "&tags=Altuve";
			flickrAPI += "&per_page=5";
			flickrAPI += "&page=1";
			flickrAPI += "&format=json";

			// UPDATE: Request plain old JSON
			flickrAPI += "&nojsoncallback=1";

			var xhr = new XMLHttpRequest();
			xhr.open("GET", flickrAPI, true);
			xhr.send();

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					var object = JSON.parse(xhr.responseText);
					console.log('xhr response', object);
					callback(object);
				}
			};
		}

		/**
   * [initNaviView description]
   * @return {Object} this - This class instance
   */

	}, {
		key: 'initNaviView',
		value: function initNaviView() {
			var navi = this.layout.navi;
			var head = this.layout.c.head;

			var toolbar = new Component({
				class: 'ui-toolbar'
			}).inject(head);

			var button = new Button({
				icon: 'mdi-navigation-menu',
				type: 'action',
				label: null
			}).inject(toolbar);

			button.on('press', function (e) {
				console.log('press', e);
				navi.toggle(e);
			});

			this.initNaviList();
		}

		/**
   * Init Navigation view
   * @return {Object} this - This class instance
   */

	}, {
		key: 'initNaviList',
		value: function initNaviList() {

			var listView = new List({
				component: ['head', 'body'],
				container: this.layout.navi.c.body,
				render: function render(info) {
					//console.log('render', info);
					var item;

					if (info.type === 'separator') {
						item = new Component({
							css: 'ui-separator'
						});
					} else {
						item = new Button({
							label: info.name,
							icon: info.icon,
							css: 'icon-text'
						});
					}

					return item;
				}
			});

			listView.set('list', [{ name: 'Inbox', icon: 'mdi-content-inbox' }, { name: 'Snoozed', icon: 'mdi-action-query-builder' }, { name: 'Done', icon: 'mdi-action-done' }, { type: 'separator' }, { name: 'Draft', icon: 'mdi-content-draft' }, { name: 'Sent', icon: 'mdi-content-send' }]);

			listView.on('selected', function (item) {
				console.log('item selected', item);
			});

			return this;
		}

		/**
   * initSideView
   * @return {instance} The class instance
   */

	}, {
		key: 'initMainView',
		value: function initMainView() {
			this.mainView = new List({
				component: ['head', 'body'],
				container: this.layout.main.c.body,
				render: function render(info) {
					//console.log('render', info);
					var item;

					if (info.type === 'separator') {
						item = new Component({
							css: 'ui-separator'
						});
					} else {
						item = new Button({
							label: info.title,
							css: 'icon-text'
						});
					}

					return item;
				}
			});

			return this;
		}
	}]);

	return Demo;
})(Emitter);

module.exports = Demo;

},{"./options":3,"material/lib/component.js":4,"material/lib/control/button.js":15,"material/lib/layout.js":16,"material/lib/list.js":20,"material/lib/module/emitter":25}],2:[function(require,module,exports){
'use strict';

var domready = require('material/lib/module/domready');
var Demo = require('./app.js');

domready(function () {
	console.log('start demo');
	new Demo();
});

},{"./app.js":1,"material/lib/module/domready":24}],3:[function(require,module,exports){
'use strict';

/**
 * Element options
 * @type {Object} The Element default options
 */
var options = {
	layout: {
		component: ['head', 'body'],
		node: {
			_name: 'standard',
			_list: ['navi', 'main'],
			navi: {
				opts: {
					component: ['head', 'body']
				},
				size: 320,
				theme: 'dark'
			},
			main: {
				flex: '1',
				opts: {
					component: ['head', 'body']
				}
			}
		}
	}
};

module.exports = options;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Emitter = require('./module/emitter');
var Controller = require('./module/controller');

// element related modules
var element = require('./component/element');
var events = require('./component/events');
var style = require('./component/style');
var insertion = require('./component/insertion');
var attribute = require('./component/attribute');
var storage = require('./component/storage');

// options
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

		//this.emit('init');

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this));

		_this.init(options);
		_this.build();

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
			this.name = this.constructor.name.toLowerCase();

			//console.log(this.options);

			// merge options

			// implement element methods
			Object.assign(this, element);
			Object.assign(this, events);
			Object.assign(this, insertion);
			Object.assign(this, storage);
			Object.assign(this, style);
			Object.assign(this, attribute);

			this.document = window.document;

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
		value: function build() {
			var opts = this.options;

			this.emit('create');

			var tag = opts.tag || 'div';
			this.element = this.createElement(tag);

			this.initAttributes();
			this.setState(this.options.state);
			this.initClass();

			this.emit('created');

			this.content = element;

			// inject if container options is given
			if (opts.container) {
				//console.log(this.name, opts.container);
				this.inject(opts.container);
			}

			this.controller.register(this);

			return this;
		}
	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			console.log(this.options, options);

			Object.assign(this.options, [defaults, options].reduce(Object.assign, {}));
		}

		/**
   * Get the name of the component
   * @return {string} name - The name of the Class instance
   */

	}, {
		key: 'getName',
		value: function getName() {
			return this.options.name || this.name;
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

			this.addClass(opts.prefix + '-' + this.name);

			if (opts.base) {
				this.addClass(opts.prefix + '-' + opts.base);
			}

			if (this.options.class) {
				this.addClass(this.options.class);
			}

			for (var i = 0; i < classes.length; i++) {
				var name = classes[i];
				if (opts[name]) {
					this.addClass(name + '-' + opts[name]);
				}
			}

			if (this.options.primary) {
				this.addClass('is-primary');
			}
		}

		/**
   * Set atrributes
   * @return {Object} this
   */

	}, {
		key: 'initAttributes',
		value: function initAttributes() {

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
   * [inject description]
   * @param  {Object} container
   * @param  {string} position
   * @return {Object} The Class instance
   */

	}, {
		key: 'inject',
		value: function inject(container, position) {
			this.emit('inject');

			this.container = container;

			var c = container.element || container;

			this.insert(c, position);

			this.isInjected = true;
			this.emit('injected');

			return this;
		}
	}]);

	return Component;
})(Emitter);

module.exports = Component;

},{"./component/attribute":5,"./component/element":6,"./component/events":7,"./component/insertion":8,"./component/options":9,"./component/storage":10,"./component/style":11,"./module/controller":22,"./module/emitter":25}],5:[function(require,module,exports){
'use strict';

/**
 * Module fieldset
 * @module component/attribute
 */

var _utils = require('../module/utils');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

module.exports = {

    /**
     * Get/Set element attribute
     * @param  {string} name The attribute name
     * @param  {string} value The attribute value
     * @return {Object} This class instance
     */

    attribute: function attribute(name, value) {
        if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === "object") {
            for (var key in name) {
                this.setAttribute(key, name[key]);
            }
            return;
        }

        if (value === undefined) {
            return this.getAttribute(name);
        } else {
            this.setAttribute(name, value);
        }
    },

    /**
     * Set element attribute
     * @param  {string} name The attribute name
     * @param  {string} value The attribute value
     * @return {Object} This class instance
     */
    setAttribute: function setAttribute(name, value) {
        this.element.setAttribute(name, '' + value);
    },

    /**
     * Get element attribute
     * @param  {string} name The attribute name
     * @param  {string} value The attribute value
     * @return {Object} This class instance
     */
    getAttribute: function getAttribute(name) {
        return this.element.getAttribute(name) || null;
    },

    /**
     * Check if the element className passed in parameters
     * @param  {string}  className
     * @return {boolean} The result
     */
    hasClass: function hasClass(className) {
        return !!this.element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    },

    /**
     * [addClass description]
     * @param {string} className [description]
     */
    addClass: function addClass(className) {
        if (!this.hasClass(className)) {
            if (this.element.className) {
                this.element.className += ' ' + className;
            } else {
                this.element.className += className;
            }
        }

        return this;
    },

    /**
     * [removeClass description]
     * @param  {string} className [description]
     * @return {void}           [description]
     */
    removeClass: function removeClass(className) {
        var classList = ' ' + this.element.className + ' ';
        while (classList.indexOf(' ' + className + ' ') !== -1) {
            classList = classList.replace(' ' + className + ' ', '').trim();
        }this.element.className = classList;
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
     * Get or set text value of the element
     * @param {string} value The text to set
     * @returns {*}
     */
    text: function text(value) {
        if (value) {
            if (this.element.innerText) {
                this.element.innerText = value;
            } else {
                this.element.textContent = value;
            }

            return this;
        }
        return value;
    }
};

},{"../module/utils":26}],6:[function(require,module,exports){
'use strict';

var morpheus = require('morpheus');

/**
 * Element related methods
 * @module component/element
 */
module.exports = {

	/**
  * create dom element
  * @param  {string} string A simple selector string
  * @return {HTMLElement} The dom element
  */

	createElement: function createElement(string) {
		var s = this._selectorFragment(string)[0];
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
	},

	/**
  * an array of simple selector fragment objects from the passed complex selector string
  * @param  {string} selector The complex selector
  * @return {Array} returns an array of simple selector fragment objects 
  */
	_selectorFragment: function _selectorFragment(selector) {
		var fragment;
		var result = [];
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
	},

	/**
  * Inject method insert element to the domtree using Dom methods
  * @param {HTMLElement} container [description]
  * @param  {string} context - Injection context
  * @return {Object} This class intance
  */
	insert: function insert(container, context) {
		var element;

		if (container && container.element) {
			element = container.element;
		} else if (container instanceof HTMLElement) {
			element = container;
		} else {
			throw new Error("Can't insert " + container + " is not a HTMLElement object");
		}

		context = context || 'bottom';

		var contexts = ['top', 'bottom', 'after', 'before'];
		var methods = ['prepend', 'append', 'after', 'before'];

		var index = contexts.indexOf(context);
		if (index === -1) {
			return;
		}

		var method = methods[index];

		this.emit('inject');

		// insert component element to the dom tree using Dom
		this[method](element);

		this.isInjected = true;
		this.emit('injected');

		return this;
	},

	/**
  * [animate description]
  * @return {} This class instance
  */
	animate: function animate(prop, options, callback) {

		var options = Object.assign(prop, options);

		//console.log('animate', options);
		if (callback) options.complete = callback;

		var animation = morpheus(this.element, options);
		//this.style(style);

		return animation;
	},

	/**
  * [animate description]
  * @return {} This class instance
  */
	getSize: function getSize() {
		var size = {
			width: parseInt(this.style('width').replace('px', '')),
			height: parseInt(this.style('height').replace('px', ''))
		};

		return size;
	},

	/**
  * [animate description]
  * @return {} This class instance
  */
	getCoord: function getCoord() {

		var coordinate = {
			top: parseInt(this.style('top').replace('px', '')),
			left: parseInt(this.style('left').replace('px', '')),
			bottom: parseInt(this.style('bottom').replace('px', '')),
			right: parseInt(this.style('right').replace('px', ''))
		};

		return coordinate;
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
  * [dispose description]
  * @return {Object} The class instance
  */
	dispose: function dispose() {
		return this.element.parentNode ? this.element.parentNode.removeChild(this.element) : this.element;
	},

	/**
  * empty
  * @return {void}
  */
	empty: function empty() {
		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}
	},

	/**
  * [destroy description]
  * @return {Object} this class
  */
	destroy: function destroy() {
		this.element.parentNode.removeChild(this.element);

		return this;
	}
};

},{"morpheus":29}],7:[function(require,module,exports){
'use strict';

module.exports = {

	/**
  * cross browser addEvent
  * @param {string}   event The event to add
  * @param {Function} fn    [description]
  */

	addEvent: function addEvent(event, fn) {
		var self = this;
		var element = this.element;
		// avoid memory overhead of new anonymous functions for every event handler that's installed
		// by using local functions
		function listenHandler(e) {
			var ret = fn.apply(this, arguments);
			if (ret === false) {
				e.stopPropagation();
				e.preventDefault();
			}
			return ret;
		}

		function attachHandler() {
			// set the this pointer same as addEventListener when fn is called
			// and make sure the event is passed to the fn also so that works the same too
			var ret = fn.call(self.element, window.event);
			if (ret === false) {
				window.event.returnValue = false;
				window.event.cancelBubble = true;
			}
			return ret;
		}

		if (element.addEventListener) {
			element.addEventListener(event, listenHandler, false);
		} else {
			element.attachEvent("on" + event, attachHandler);
		}

		return this;
	},

	/**
  * cross browser removeEvent
  * @param  {string}   event The event to remove
  * @param  {Function} fn    [description]
  * @return {Object}         [description]
  */
	removeEvent: function removeEvent(event, fn) {
		var element = this.element;

		if (element.removeEventListener) {
			element.removeEventListener(event, fn, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, element[fn.toString() + event]);
			element[fn.toString() + event] = null;
		} else {
			element['on' + event] = function () {};
		}

		return this;
	}
};

},{}],8:[function(require,module,exports){
'use strict';

/**
 * Element insertion related methods
 * @module component/insertion
 */

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

},{"../module/utils":26}],9:[function(require,module,exports){
'use strict';

/**
 * Component options
 */

var options = {
	name: 'component',
	prefix: 'ui',
	type: null,
	tag: 'div',
	attr: ['accesskey', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone', 'hidden', 'id', 'lang', 'spellcheck', 'style', 'tabindex', 'title', 'translate', 'type']
};

module.exports = options;

},{}],10:[function(require,module,exports){
'use strict';

/**
 * Element storage related methods
 * @module component/storage
 */

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
	retrieve: function retrieve(key) {
		this.storage = this.storage || {};

		return this.storage[key];
	}
};

},{}],11:[function(require,module,exports){
'use strict';

/**
 * Element style related methods
 * @module component/style
 */

var _utils = require('../module/utils');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

module.exports = {

    /**
     * Returns current coordinates of the element,
     * relative to the document
     *
     * @param {HTMLElement} element
     * @returns {*}
     */

    offset: function offset(prop) {

        var rect = this.element.getBoundingClientRect();

        var offs = {
            top: Math.round(rect.top),
            right: Math.round(rect.right),
            bottom: Math.round(rect.bottom),
            left: Math.round(rect.left),
            width: rect.width ? Math.round(rect.width) : Math.round(this.element.offsWidth),
            height: rect.height ? Math.round(rect.height) : Math.round(this.element.offsHeight)
        };

        //fallback to css width and height
        if (offs.width <= 0) {
            offs.width = parseFloat(this._getComputedStyle('width'));
        }
        if (offs.height <= 0) {
            offs.height = parseFloat(this._getComputedStyle('height'));
        }

        if (prop) {
            return offs[prop];
        } else {
            return offs;
        }
    },

    /**
     * Gets element's computed style
     * @param {string} prop
     * @returns {*}
     * @private
     */
    _getComputedStyle: function _getComputedStyle(prop) {

        var computedStyle;

        if (typeof window.getComputedStyle === 'function') {
            //normal browsers
            computedStyle = window.getComputedStyle(this.element);
        } else if (_typeof(document.currentStyle) !== undefined) {
            //other browsers
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
        //console.log('sytle', style);

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

},{"../module/utils":26}],12:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = require('./component');
var defaults = require('./container/options');
var display = require('./container/display');

/**
 * Class representing a UI Container. Can add components.
 *
 * @extends Component
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
   * @params {Object} options The instance options
   * @return {Object} This class instance
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
			//console.log(name, position, element);
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

},{"./component":4,"./container/display":13,"./container/options":14}],13:[function(require,module,exports){
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
		console.log('toggle');
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
		console.log('minimize');
		if (!this.display) {
			this._initDisplay();
		}

		var transition = {
			duration: 500,
			easing: 'ease-out'
		};

		this.emit('minimize');

		var opts = {
			easing: transition.equation,
			duration: transition.duration
		};

		var prop = {};

		prop[this._modifier] = 0;

		this.animate(prop, opts);

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
			duration: '200',
			easing: 'ease-in',
			complete: function complete() {}
		};

		var property = {};
		property[this._modifier] = size;

		this.animate(property, option);
		this._display = 'normalized';
		this.emit('display', this._display);

		return this;
	},

	/**
  * [normalize description]
  * @return {Object} The class instance
  */
	maximize: function maximize() {

		this.style('display', null);
		this.addClass('state-focus');

		this._display = 'normalized';

		this.emit('display', this._display);

		return this;
	}
};

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = require('../component');

var defaults = {
	prefix: 'ui',
	type: null, // push, file
	element: {
		tag: 'span'
	},
	ripple: {
		duration: '300',
		equation: 'ease-out'
	}
};

/**
 * Button control class
 * @class
 * @extends Control
 * @since 0.0.1
 * @example
 * var button = new Button({
 *   label: 'Primary raised button',
 *   type: 'raised',
 *   primary: true
 * }).on('press', function(e) {
 *   console.log('button press', e);
 * }).inject(document.body);
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

			this.options = [defaults, options].reduce(Object.assign, {});

			return this;
		}

		/**
   * Build button's method
   * @override
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
				this.attribute('data-name', opts.name);
			}

			this.attribute('title', opts.text);

			if (opts.icon) {
				this._initIcon(type, opts.icon || opts.name);
			}

			this._initLabel(type);

			if (opts.ripple) {
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

			if (this.state === 'disabled') return;

			this.emit('press', e);

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

			var code = name;

			var prop = {
				'tag': 'span.ui-icon'
			};

			this.icon = new Component(prop).inject(this.element);

			// prepare use of svg
			// this.iconsvg = new Element('svg', prop).inject(this.element);
			// this.svguse = new Element('use').inject(this.iconsvg);

			// this.iconsvg.attribute('viewBox', '0 0 24 24');
			// this.svguse.attribute('xlripple:href','/vendor/icon/content-send.svg');

			if (code) this.icon.addClass(code);
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
				this.label = new Component({ tag: 'span.ui-text' }).inject(this.element, position);
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
			var _this2 = this;

			this.sensor = new Component({
				tag: 'div.ui-sensor'
			}).inject(this.element);

			this.sensor.addEvent('click', function (e) {
				_this2.press(e);
			}).addEvent('mousedown', function (e) {
				_this2.addClass('is-active');
				_this2._showRipple(e);
			}).addEvent('mouseup', function () {
				_this2.removeClass('is-active');
				if (!_this2.rippleActive) _this2._hideRipple();
			}).addEvent('mouseleave', function (e) {
				_this2.removeClass('is-active');
				_this2._hideRipple(e);
			});
		}

		/**
   * _showRipple methosd
   * @param  {string} ripple
   * @param  {string} x
   * @param  {string} y
   * @param  {Object} coord
   * @return {void}
   */

	}, {
		key: '_showRipple',
		value: function _showRipple(e) {
			var _this3 = this;

			if (!this.size) {
				this.size = this.offset();
			}

			if (!this.ripple) this.ripple = new Component({
				tag: 'span.ui-ripple'
			}).inject(this, 'top');

			if (this.animation) {
				this.animation.stop();
			}

			var coord = this._rippleCoord(this.size);
			var options = this.options.ripple;

			var startLeft = (e.offsetX || this.size.width / 2) - 5;
			var startTop = (e.offsetY || this.size.height / 2) - 5;

			this.ripple.style({
				left: startLeft + 'px',
				top: startTop + 'px',
				width: '5px',
				height: '5px',
				opacity: 1
			});

			this.rippleActive = true;

			this.animation = this.ripple.animate({
				width: coord.size * 2,
				height: coord.size * 2,
				left: coord.left,
				top: coord.top,
				opacity: 0.2,
				duration: options.duration,
				easing: options.equation,
				complete: function complete() {
					_this3.rippleActive = false;
					if (!_this3.hasClass('is-active')) _this3._hideRipple();
				}
			});
		}
	}, {
		key: '_hideRipple',
		value: function _hideRipple() {
			var options = this.options.ripple;

			if (!this.ripple) return;

			this.animation.stop();

			this.animation = this.ripple.animate({
				opacity: 0,
				duration: '300',
				easing: options.equation
			});
		}

		/**
   * [_rippleCoord description]
   * @return {Object} Size and top
   */

	}, {
		key: '_rippleCoord',
		value: function _rippleCoord(offset) {
			var size = offset.width;
			var top = -offset.height / 2;

			if (offset.width > offset.height) {
				size = offset.width;
				top = -(offset.width - offset.height / 2);
			} else if (offset.width < offset.height) {
				size = offset.height;
				top = (offset.width - offset.height) / 2;
			}

			return {
				size: size,
				top: top,
				left: size / -2
			};
		}
	}]);

	return Button;
})(Component);

module.exports = Button;

},{"../component":4}],16:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
				console.log('---');
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

				component.addClass('container-' + name);

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

},{"./container":12,"./layout/container":17,"./layout/options":18,"./layout/resizer":19}],17:[function(require,module,exports){
'use strict';

var Emmitter = require('../module/emitter');
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
			component.addClass('theme' + '-' + component.options.theme);
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

},{"../container":12,"../module/emitter":25}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
'use strict';

var Component = require("../component");

var resize = {

	/**
  * _initResizeBorder description
  * @param  {component} component [description]
  */

	_initResizer: function _initResizer(component) {
		var name = component.options.name;

		console.log(component.container);

		var container = component.container || component.options.container;
		var direction = this._initResizerDirection(container);
		var modifier = this.options.resizer.modifier[direction];

		if (!direction || !modifier || !container) {
			return;
		}

		var resizer = this.resizer[name] = new Component({
			tag: 'div.ui-resizer'
		}).inject(container);

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
		var container = component.container;
		var last = component.options.last;

		var draggable = DragDrop.bind(resizer.element, {
			//anchor: anotherElement,
			boundingBox: 'offsetParent',
			dragstart: function dragstart(ev) {
				console.log('dragstart', ev);
				//this.emit('resizeStart', component);
				//self.mask.style('display', 'block');
			},
			dragend: function dragend(ev) {
				console.log('dragend');
				//this.emit('resizeEnd', ev);
			},
			drag: function drag(ev) {
				//self.mask.style('display', 'block');
				var coord = {};

				var c = {};

				coord[from] = component.offset(from);

				c[from] = resizer.offset(from);

				if (last) {

					var csize = container.getSize()[size];
					var style = {};style[size] = csize - c[from] + 'px';
					component.style(style);
				} else {
					var style = {};style[size] = c[from] - coord[from] + 'px';
					component.style(style);
				}

				//this._updateSize(component, resizer, modifier);
				_this.emit('drag', ev);
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
		//console.log('_updateSize', component.container);
		var container = component.container;
		var from = modifier.from;
		var size = modifier.size;

		var coord = {};
		coord[from] = component.offset(from);
		coord[size] = component.offset(size);

		// for the last component
		// the resizer is on the left or on the top
		if (component.options.last) {
			var csize = container.offset(size);
			//console.log();
			var style = {};style[from] = csize - coord[size] - 3 + 'px';
			resizer.style(style);
		} else {
			//console.log(from, coord[from] + coord[size] -3);
			var style = {};style[from] = coord[from] + coord[size] - 3 + 'px';
			resizer.style(style);
			//console.log(resizer);
		}

		this.emit('size');
	}
};

module.exports = resize;

},{"../component":4}],20:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = require('./view');
var Emitter = require("./module/emitter");

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

			//this.addClass('type-'+this.tmpl._type);
			this.addClass('view-' + this.options.name);

			//this.content = this.c.body;

			//this._initSearch();

			var self = this;

			// this.c.body.delegate('click', '.ui-button', function(event, item){
			//    	//console.log(event, item);
			//    	self.select(item, event);
			// });

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

				item.store('info', list[i]);

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

},{"./list/options":21,"./module/emitter":25,"./view":27}],21:[function(require,module,exports){
'use strict';

/**
 * [defaults description]
 */
module.exports = {
	name: 'list',
	base: 'view',
	prefix: 'ui',
	comp: ['body']
};

},{}],22:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

},{}],23:[function(require,module,exports){
(function (process,global){
'use strict';

/**
 * Module defer
 * @module module/defer
 */

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
 * @return {void}            [description]
 */
var iterate = function iterate(collection) {
    var time = Date.now();

    //console.log('!!', collection);

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
 * @return {Array}            [description]
 */
defer.frame = function (callback, context) {
    return push(callbacks.frame, callback, context, requestAnimationFrame);
};

var clear;

/**
 * [timeout description]
 * @param  {Function} callback [description]
 * @return {Array}            [description]
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

},{"_process":31,"mout/lang/kindOf":30}],24:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!(function (name, definition) {

  if (typeof module !== 'undefined') module.exports = definition();else if (typeof define === 'function' && _typeof(define.amd) === 'object') define(definition);else this[name] = definition();
})('domready', function () {

  var fns = [];
  var listener;
  var doc = document;
  var hack = doc.documentElement.doScroll;
  var domContentLoaded = 'DOMContentLoaded';
  var loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded) doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener);
    loaded = 1;
    while (listener = fns.shift()) {
      listener();
    }
  });

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  };
});

},{}],25:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defer = require("./defer");

var slice = Array.prototype.slice;

/**
 * Emitter abstract class for managing and emitting events.
 * @class
 * @author Valerio Proietti
 * @see https://github.com/kamicane/prime/blob/master/emitter.js
 */

var Emitter = (function () {
	function Emitter(stoppable) {
		_classCallCheck(this, Emitter);

		//if (new.target === Emitter) throw TypeError("new of abstract class Emitter");

		this._stoppable = stoppable;

		return this;
	}

	/**
  * [on description]
  * @param  {string}   event [description]
  * @param  {Function} fn    [description]
  * @return {Object} Thia class instance
  */

	_createClass(Emitter, [{
		key: "on",
		value: function on(event, fn) {
			var listeners = this._listeners || (this._listeners = {});
			var events = listeners[event] || (listeners[event] = []);

			if (events.indexOf(fn) === -1) events.push(fn);

			return this;
		}

		/**
   * [off description]
   * @param  {string}   event [description]
   * @param  {Function} fn    [description]
   * @return {}         [description]
   */

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

		/**
   * [emit description]
   * @param  {string} event The event name
   * @return {Object} this
   */

	}, {
		key: "emit",
		value: function emit(event) {
			var self = this;
			var args = slice.call(arguments, 1);

			//console.log('emit', event);

			var emit = function emit() {
				//console.log('self', self);
				var listeners = self._listeners;
				var events;
				if (listeners && (events = listeners[event])) {
					events.slice(0).forEach(function (event) {
						var result = event.apply(self, args);
						if (self._stoppable) return result;
					});
				}
			};

			if (args[args.length - 1] === Emitter.EMIT_SYNC) {
				args.pop();
				emit();
			} else {
				defer(emit);
			}

			return this;
		}
	}]);

	return Emitter;
})();

Emitter.EMIT_SYNC = {};

module.exports = Emitter;

},{"./defer":23}],26:[function(require,module,exports){
'use strict';

/**
 * Utility functions
 * @module module/utils
 */

//ie?

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

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
 * @param  {string} prop [description]
 * @return {string}      [description]
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
 * @param {Node} node
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
 * @param {HTMLElement} element
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
  if (_isArray(object) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.length !== undefined) {
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

/**
 * Array.indexOf support
 * @param {Array} array
 * @param {*} obj
 * @returns {number}
 * @private
 */
function _indexOf(array, obj) {
  if (Array.prototype.indexOf) {
    return Array.prototype.indexOf.call(array, obj);
  }
  for (var i = 0, j = array.length; i < j; i++) {
    if (array[i] === obj) {
      return i;
    }
  }
  return -1;
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
exports._indexOf = _indexOf;
exports.cssNameProperty = cssNameProperty;

},{}],27:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = require('./container');
var defaults = require('./view/options');

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

},{"./container":12,"./view/options":28}],28:[function(require,module,exports){
'use strict';

module.exports = {
	name: 'view',
	prefix: 'ui',
	tag: 'div',
	component: ['body']
};

},{}],29:[function(require,module,exports){
/*!
  * Morpheus - A Brilliant Animator
  * https://github.com/ded/morpheus - (c) Dustin Diaz 2011
  * License MIT
  */
!function (name, definition) {
  if (typeof define == 'function') define(definition)
  else if (typeof module != 'undefined') module.exports = definition()
  else this[name] = definition()
}('morpheus', function () {

  var doc = document
    , win = window
    , perf = win.performance
    , perfNow = perf && (perf.now || perf.webkitNow || perf.msNow || perf.mozNow)
    , now = perfNow ? function () { return perfNow.call(perf) } : function () { return +new Date() }
    , fixTs = false // feature detected below
    , html = doc.documentElement
    , thousand = 1000
    , rgbOhex = /^rgb\(|#/
    , relVal = /^([+\-])=([\d\.]+)/
    , numUnit = /^(?:[\+\-]=?)?\d+(?:\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)$/
    , rotate = /rotate\(((?:[+\-]=)?([\-\d\.]+))deg\)/
    , scale = /scale\(((?:[+\-]=)?([\d\.]+))\)/
    , skew = /skew\(((?:[+\-]=)?([\-\d\.]+))deg, ?((?:[+\-]=)?([\-\d\.]+))deg\)/
    , translate = /translate\(((?:[+\-]=)?([\-\d\.]+))px, ?((?:[+\-]=)?([\-\d\.]+))px\)/
      // these elements do not require 'px'
    , unitless = { lineHeight: 1, zoom: 1, zIndex: 1, opacity: 1, transform: 1}

  // which property name does this browser use for transform
  var transform = function () {
    var styles = doc.createElement('a').style
      , props = ['webkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'Transform']
      , i
    for (i = 0; i < props.length; i++) {
      if (props[i] in styles) return props[i]
    }
  }()

  // does this browser support the opacity property?
  var opasity = function () {
    return typeof doc.createElement('a').style.opacity !== 'undefined'
  }()

  // initial style is determined by the elements themselves
  var getStyle = doc.defaultView && doc.defaultView.getComputedStyle ?
    function (el, property) {
      property = property == 'transform' ? transform : property
      property = camelize(property)
      var value = null
        , computed = doc.defaultView.getComputedStyle(el, '')
      computed && (value = computed[property])
      return el.style[property] || value
    } : html.currentStyle ?

    function (el, property) {
      property = camelize(property)

      if (property == 'opacity') {
        var val = 100
        try {
          val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity
        } catch (e1) {
          try {
            val = el.filters('alpha').opacity
          } catch (e2) {}
        }
        return val / 100
      }
      var value = el.currentStyle ? el.currentStyle[property] : null
      return el.style[property] || value
    } :
    function (el, property) {
      return el.style[camelize(property)]
    }

  var frame = function () {
    // native animation frames
    // http://webstuff.nfshost.com/anim-timing/Overview.html
    // http://dev.chromium.org/developers/design-documents/requestanimationframe-implementation
    return win.requestAnimationFrame  ||
      win.webkitRequestAnimationFrame ||
      win.mozRequestAnimationFrame    ||
      win.msRequestAnimationFrame     ||
      win.oRequestAnimationFrame      ||
      function (callback) {
        win.setTimeout(function () {
          callback(+new Date())
        }, 17) // when I was 17..
      }
  }()

  frame(function(timestamp) {
    // feature-detect if rAF and now() are of the same scale (epoch or high-res),
    // if not, we have to do a timestamp fix on each frame
    fixTs = timestamp > 1e12 != now() > 1e12
  })

  var children = []

  function has(array, elem, i) {
    if (Array.prototype.indexOf) return array.indexOf(elem)
    for (i = 0; i < array.length; ++i) {
      if (array[i] === elem) return i
    }
  }

  function render(timestamp) {
    var i, count = children.length
    if (fixTs) timestamp = now()
    for (i = count; i--;) {
      children[i](timestamp)
    }
    children.length && frame(render)
  }

  function live(f) {
    if (children.push(f) === 1) frame(render)
  }

  function die(f) {
    var rest, index = has(children, f)
    if (index >= 0) {
      rest = children.slice(index + 1)
      children.length = index
      children = children.concat(rest)
    }
  }

  function parseTransform(style, base) {
    var values = {}, m
    if (m = style.match(rotate)) values.rotate = by(m[1], base ? base.rotate : null)
    if (m = style.match(scale)) values.scale = by(m[1], base ? base.scale : null)
    if (m = style.match(skew)) {values.skewx = by(m[1], base ? base.skewx : null); values.skewy = by(m[3], base ? base.skewy : null)}
    if (m = style.match(translate)) {values.translatex = by(m[1], base ? base.translatex : null); values.translatey = by(m[3], base ? base.translatey : null)}
    return values
  }

  function formatTransform(v) {
    var s = ''
    if ('rotate' in v) s += 'rotate(' + v.rotate + 'deg) '
    if ('scale' in v) s += 'scale(' + v.scale + ') '
    if ('translatex' in v) s += 'translate(' + v.translatex + 'px,' + v.translatey + 'px) '
    if ('skewx' in v) s += 'skew(' + v.skewx + 'deg,' + v.skewy + 'deg)'
    return s
  }

  function rgb(r, g, b) {
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)
  }

  // convert rgb and short hex to long hex
  function toHex(c) {
    var m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    return (m ? rgb(m[1], m[2], m[3]) : c)
      .replace(/#(\w)(\w)(\w)$/, '#$1$1$2$2$3$3') // short skirt to long jacket
  }

  // change font-size => fontSize etc.
  function camelize(s) {
    return s.replace(/-(.)/g, function (m, m1) {
      return m1.toUpperCase()
    })
  }

  // aren't we having it?
  function fun(f) {
    return typeof f == 'function'
  }

  function nativeTween(t) {
    // default to a pleasant-to-the-eye easeOut (like native animations)
    return Math.sin(t * Math.PI / 2)
  }

  /**
    * Core tween method that requests each frame
    * @param duration: time in milliseconds. defaults to 1000
    * @param fn: tween frame callback function receiving 'position'
    * @param done {optional}: complete callback function
    * @param ease {optional}: easing method. defaults to easeOut
    * @param from {optional}: integer to start from
    * @param to {optional}: integer to end at
    * @returns method to stop the animation
    */
  function tween(duration, fn, done, ease, from, to) {
    ease = fun(ease) ? ease : morpheus.easings[ease] || nativeTween
    var time = duration || thousand
      , self = this
      , diff = to - from
      , start = now()
      , stop = 0
      , end = 0

    function run(t) {
      var delta = t - start
      if (delta > time || stop) {
        to = isFinite(to) ? to : 1
        stop ? end && fn(to) : fn(to)
        die(run)
        return done && done.apply(self)
      }
      // if you don't specify a 'to' you can use tween as a generic delta tweener
      // cool, eh?
      isFinite(to) ?
        fn((diff * ease(delta / time)) + from) :
        fn(ease(delta / time))
    }

    live(run)

    return {
      stop: function (jump) {
        stop = 1
        end = jump // jump to end of animation?
        if (!jump) done = null // remove callback if not jumping to end
      }
    }
  }

  /**
    * generic bezier method for animating x|y coordinates
    * minimum of 2 points required (start and end).
    * first point start, last point end
    * additional control points are optional (but why else would you use this anyway ;)
    * @param points: array containing control points
       [[0, 0], [100, 200], [200, 100]]
    * @param pos: current be(tween) position represented as float  0 - 1
    * @return [x, y]
    */
  function bezier(points, pos) {
    var n = points.length, r = [], i, j
    for (i = 0; i < n; ++i) {
      r[i] = [points[i][0], points[i][1]]
    }
    for (j = 1; j < n; ++j) {
      for (i = 0; i < n - j; ++i) {
        r[i][0] = (1 - pos) * r[i][0] + pos * r[parseInt(i + 1, 10)][0]
        r[i][1] = (1 - pos) * r[i][1] + pos * r[parseInt(i + 1, 10)][1]
      }
    }
    return [r[0][0], r[0][1]]
  }

  // this gets you the next hex in line according to a 'position'
  function nextColor(pos, start, finish) {
    var r = [], i, e, from, to
    for (i = 0; i < 6; i++) {
      from = Math.min(15, parseInt(start.charAt(i),  16))
      to   = Math.min(15, parseInt(finish.charAt(i), 16))
      e = Math.floor((to - from) * pos + from)
      e = e > 15 ? 15 : e < 0 ? 0 : e
      r[i] = e.toString(16)
    }
    return '#' + r.join('')
  }

  // this retreives the frame value within a sequence
  function getTweenVal(pos, units, begin, end, k, i, v) {
    if (k == 'transform') {
      v = {}
      for (var t in begin[i][k]) {
        v[t] = (t in end[i][k]) ? Math.round(((end[i][k][t] - begin[i][k][t]) * pos + begin[i][k][t]) * thousand) / thousand : begin[i][k][t]
      }
      return v
    } else if (typeof begin[i][k] == 'string') {
      return nextColor(pos, begin[i][k], end[i][k])
    } else {
      // round so we don't get crazy long floats
      v = Math.round(((end[i][k] - begin[i][k]) * pos + begin[i][k]) * thousand) / thousand
      // some css properties don't require a unit (like zIndex, lineHeight, opacity)
      if (!(k in unitless)) v += units[i][k] || 'px'
      return v
    }
  }

  // support for relative movement via '+=n' or '-=n'
  function by(val, start, m, r, i) {
    return (m = relVal.exec(val)) ?
      (i = parseFloat(m[2])) && (start + (m[1] == '+' ? 1 : -1) * i) :
      parseFloat(val)
  }

  /**
    * morpheus:
    * @param element(s): HTMLElement(s)
    * @param options: mixed bag between CSS Style properties & animation options
    *  - {n} CSS properties|values
    *     - value can be strings, integers,
    *     - or callback function that receives element to be animated. method must return value to be tweened
    *     - relative animations start with += or -= followed by integer
    *  - duration: time in ms - defaults to 1000(ms)
    *  - easing: a transition method - defaults to an 'easeOut' algorithm
    *  - complete: a callback method for when all elements have finished
    *  - bezier: array of arrays containing x|y coordinates that define the bezier points. defaults to none
    *     - this may also be a function that receives element to be animated. it must return a value
    */
  function morpheus(elements, options) {
    var els = elements ? (els = isFinite(elements.length) ? elements : [elements]) : [], i
      , complete = options.complete
      , duration = options.duration
      , ease = options.easing
      , points = options.bezier
      , begin = []
      , end = []
      , units = []
      , bez = []
      , originalLeft
      , originalTop

    if (points) {
      // remember the original values for top|left
      originalLeft = options.left;
      originalTop = options.top;
      delete options.right;
      delete options.bottom;
      delete options.left;
      delete options.top;
    }

    for (i = els.length; i--;) {

      // record beginning and end states to calculate positions
      begin[i] = {}
      end[i] = {}
      units[i] = {}

      // are we 'moving'?
      if (points) {

        var left = getStyle(els[i], 'left')
          , top = getStyle(els[i], 'top')
          , xy = [by(fun(originalLeft) ? originalLeft(els[i]) : originalLeft || 0, parseFloat(left)),
                  by(fun(originalTop) ? originalTop(els[i]) : originalTop || 0, parseFloat(top))]

        bez[i] = fun(points) ? points(els[i], xy) : points
        bez[i].push(xy)
        bez[i].unshift([
          parseInt(left, 10),
          parseInt(top, 10)
        ])
      }

      for (var k in options) {
        switch (k) {
        case 'complete':
        case 'duration':
        case 'easing':
        case 'bezier':
          continue
        }
        var v = getStyle(els[i], k), unit
          , tmp = fun(options[k]) ? options[k](els[i]) : options[k]
        if (typeof tmp == 'string' &&
            rgbOhex.test(tmp) &&
            !rgbOhex.test(v)) {
          delete options[k]; // remove key :(
          continue; // cannot animate colors like 'orange' or 'transparent'
                    // only #xxx, #xxxxxx, rgb(n,n,n)
        }

        begin[i][k] = k == 'transform' ? parseTransform(v) :
          typeof tmp == 'string' && rgbOhex.test(tmp) ?
            toHex(v).slice(1) :
            parseFloat(v)
        end[i][k] = k == 'transform' ? parseTransform(tmp, begin[i][k]) :
          typeof tmp == 'string' && tmp.charAt(0) == '#' ?
            toHex(tmp).slice(1) :
            by(tmp, parseFloat(v));
        // record original unit
        (typeof tmp == 'string') && (unit = tmp.match(numUnit)) && (units[i][k] = unit[1])
      }
    }
    // ONE TWEEN TO RULE THEM ALL
    return tween.apply(els, [duration, function (pos, v, xy) {
      // normally not a fan of optimizing for() loops, but we want something
      // fast for animating
      for (i = els.length; i--;) {
        if (points) {
          xy = bezier(bez[i], pos)
          els[i].style.left = xy[0] + 'px'
          els[i].style.top = xy[1] + 'px'
        }
        for (var k in options) {
          v = getTweenVal(pos, units, begin, end, k, i)
          k == 'transform' ?
            els[i].style[transform] = formatTransform(v) :
            k == 'opacity' && !opasity ?
              (els[i].style.filter = 'alpha(opacity=' + (v * 100) + ')') :
              (els[i].style[camelize(k)] = v)
        }
      }
    }, complete, ease])
  }

  // expose useful methods
  morpheus.tween = tween
  morpheus.getStyle = getStyle
  morpheus.bezier = bezier
  morpheus.transform = transform
  morpheus.parseTransform = parseTransform
  morpheus.formatTransform = formatTransform
  morpheus.animationFrame = frame
  morpheus.easings = {}

  return morpheus

});

},{}],30:[function(require,module,exports){


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


},{}],31:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=flickr.js.map
