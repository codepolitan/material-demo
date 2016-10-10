(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emitter = require('material/lib/module/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _component = require('material/lib/component');

var _component2 = _interopRequireDefault(_component);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _layout = require('material/lib/layout');

var _layout2 = _interopRequireDefault(_layout);

var _view = require('material/lib/view');

var _view2 = _interopRequireDefault(_view);

var _list = require('material/lib/list');

var _list2 = _interopRequireDefault(_list);

var _button = require('material/lib/control/button');

var _button2 = _interopRequireDefault(_button);

var _button3 = require('./view/button');

var _button4 = _interopRequireDefault(_button3);

var _checkbox = require('./view/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _switch = require('./view/switch');

var _switch2 = _interopRequireDefault(_switch);

var _field = require('./view/field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Container from 'material/lib/container';


// demo


var demos = {
  button: _button4.default,
  checkbox: _checkbox2.default,
  switch: _switch2.default,
  field: _field2.default
};

/**
 * @class
 */

var Demo = function (_Emitter) {
  _inherits(Demo, _Emitter);

  /**
   * @constructor
   * @param  {Object} options - The application options
   * @return {Object} this
   */

  function Demo(options) {
    _classCallCheck(this, Demo);

    //console.log('ready', document.body);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).call(this));

    _this.options = [_options2.default, options].reduce(Object.assign, {});

    _this.layout = new _layout2.default(_this.options.layout).insert(document.body);
    _this.initNaviView();
    _this.initMainView();
    _this.initSideView();

    _this.initDemo(_this.body);

    //this.controller = new Controller();
    return _this;
  }

  _createClass(Demo, [{
    key: 'initDemo',
    value: function initDemo(body) {

      demos.button(body);
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

      var toolbar = new _component2.default({
        class: 'ui-toolbar'
      }).insert(head);

      var button = new _button2.default({
        icon: 'mdi-navigation-menu',
        type: 'action',
        label: null
      }).insert(toolbar);

      button.on('press', function (e) {
        console.log('press', e);
        navi.toggle(e);
      });

      //console.log('instance', typeof button);

      this.initNaviList();
    }

    /**
     * [initMapView description]
     * @return {instance} Map view instance
     */

  }, {
    key: 'initMapView',
    value: function initMapView() {
      var mapView = new Map({
        component: ['head', 'body'],
        container: this.layout.main.c.body
      });

      return mapView;
    }

    /**
     * Init Navigation view
     * @return {Object} this - This class instance
     */

  }, {
    key: 'initNaviList',
    value: function initNaviList() {
      var _this2 = this;

      var listView = new _list2.default({
        component: ['head', 'body'],
        container: this.layout.navi.c.body,
        render: function render(info) {
          //console.log('render', info);
          var item;

          if (info.type === 'separator') {
            item = new _component2.default({
              class: 'ui-separator'
            });
          } else {
            var item = new _button2.default({
              label: info.name,
              icon: info.icon,
              css: 'icon-text'
            }).on('press', function () {
              var name = item.label.text().toLowerCase();
              _this2.updateDemoView(name);
            });
          }

          return item;
        }
      });

      listView.set('list', this.options.components);

      listView.on('selected', function (item) {
        console.log('item selected', item);
      });

      return this;
    }
  }, {
    key: 'updateDemoView',
    value: function updateDemoView(name) {
      //console.log('updateDemoView', name);
      this.body.empty();

      if (demos[name]) {
        demos[name](this.body);
      }
    }

    /**
     * initSideView
     * @return {instance} The class instance
     */

  }, {
    key: 'initSideView',
    value: function initSideView() {
      //console.log('initSideView contact', contactInfo, contactTemplate);

      return this;
    }

    /**
     * [initTest description]
     * @return {instance} The class instance
     */

  }, {
    key: 'initMainView',
    value: function initMainView() {
      //return;
      var mainbody = this.layout.main;
      var fieldIdx = 0;

      var view = new _view2.default({
        comp: ['body']
      }).insert(mainbody);

      var body = this.body = view.c.body;

      return this;
    }
  }]);

  return Demo;
}(_emitter2.default);

module.exports = Demo;

},{"./options":3,"./view/button":4,"./view/checkbox":5,"./view/field":6,"./view/switch":7,"material/lib/component":10,"material/lib/control/button":21,"material/lib/layout":25,"material/lib/list":29,"material/lib/module/emitter":35,"material/lib/view":38}],2:[function(require,module,exports){
'use strict';

var domready = require('material/lib/module/domready');
var Demo = require('./app.js');

domready(function () {
	console.log('start demo');
	new Demo();
});

},{"./app.js":1,"material/lib/module/domready":34}],3:[function(require,module,exports){
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
  components: [{ name: 'Button', icon: 'mdi-content-inbox' }, { name: 'Checkbox', icon: 'mdi-action-done' }, { name: 'Field', icon: 'mdi-action-query-builder' }, { name: 'Switch', icon: 'mdi-action-done' }, { type: 'separator' }, { name: 'Draft', icon: 'mdi-content-draft' }, { name: 'Sent', icon: 'mdi-content-send' }]
};

module.exports = options;

},{}],4:[function(require,module,exports){
'use strict';

// view

var _component = require('material/lib/component.js');

var _component2 = _interopRequireDefault(_component);

var _button = require('material/lib/control/button.js');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function (body) {

  new _button2.default({
    //type: 'action',
    label: 'Flat'
  }).insert(body);

  new _button2.default({
    label: 'Raised',
    type: 'raised',
    primary: true
  }).on('press', function (e) {
    console.log('press', e);
    fieldIdx++;
    new Field({
      label: 'field' + fieldIdx,
      name: 'field'
    }).insert(body);
  }).insert(body);

  new _button2.default({
    icon: 'mdi-content-inbox',
    label: 'Inbox',
    css: 'icon-text'
  }).insert(body);

  new _button2.default({
    type: 'action',
    primary: true,
    css: 'is-primary'
  }).on('press', function () {
    console.log('switch state', switchControl.toggle());
  }).insert(body);

  //console.log('---', primaryButton.style());

  new _button2.default({
    icon: 'mdi-content-send',
    type: 'action'
  }).insert(body);
};
// controls

},{"material/lib/component.js":10,"material/lib/control/button.js":21}],5:[function(require,module,exports){
'use strict';

var _component = require('material/lib/component.js');

var _component2 = _interopRequireDefault(_component);

var _checkbox = require('material/lib/control/checkbox.js');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function (body) {
  new _component2.default({
    class: 'ui-separator'
  }).insert(body);

  new _checkbox2.default({
    label: 'Checkbox'
  }).on('change', function (value) {
    console.log('checked', value);
  }).insert(body);

  new _checkbox2.default({
    label: 'Checkbox checked',
    value: true
  }).on('change', function (value) {
    console.log('checked', value);
  }).insert(body);

  new _checkbox2.default({
    label: 'Checkbox disabled',
    disabled: true
  }).on('change', function (value) {
    console.log('checked', value);
  }).insert(body);
};
// controls

},{"material/lib/component.js":10,"material/lib/control/checkbox.js":22}],6:[function(require,module,exports){
'use strict';

var _component = require('material/lib/component.js');

var _component2 = _interopRequireDefault(_component);

var _textfield = require('material/lib/control/textfield.js');

var _textfield2 = _interopRequireDefault(_textfield);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */
var checkbox = function checkbox(body) {

  new _component2.default({
    class: 'ui-separator'
  }).insert(body);

  new _textfield2.default({
    label: 'material',
    name: 'field'
  }).insert(body);
};
// controls


module.exports = checkbox;

},{"material/lib/component.js":10,"material/lib/control/textfield.js":24}],7:[function(require,module,exports){
'use strict';

// switch

var _switch = require('material/lib/control/switch.js');

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function (body) {

  var switchControl = new _switch2.default({
    label: 'Switch'
  }).on('change', function (value) {
    //console.log('checked', value);
  }).insert(body);

  new _switch2.default({
    label: 'Disabled',
    disabled: true
  }).insert(body);
};

},{"material/lib/control/switch.js":23}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * DragDrop.js
 *
 * A JavaScript micro-framework for adding drag-and-drop functionality
 * to elements for advanced UI development.
 *
 * @author     James Brumond
 * @version    0.3.0
 * @copyright  Copyright 2011 James Brumond
 * @license    Dual licensed under MIT and GPL
 */

/*jshint browser: true, bitwise: false, camelcase: false, eqnull: true, latedef: false,
  plusplus: false, jquery: true, shadow: true, smarttabs: true, loopfunc: true */

(function () {

	var

	// Is this a touch device?
	touchEvents = 'ontouchstart' in window,
	   

	// A class to add when an element is being dragged
	dragClass = 'drag',
	   

	/**
  * The DragDrop namespace
  *
  * Example:
  * 
  *   DragDrop.bind ( element[, options ]);
  *   DragDrop.unbind ( reference );
  *
  * @access  public
  */
	DragDrop = (function () {
		var self = {},
		   

		// Determine the events to bind to
		events = touchEvents ? {
			start: 'touchstart',
			move: 'touchmove',
			end: 'touchend'
		} : {
			start: 'mousedown',
			move: 'mousemove',
			end: 'mouseup'
		},
		   

		// Elements already bound
		bindings = [],
		   

		// Check if a given binding (element/anchor pair) already exists
		bindingExists = function bindingExists(element, anchor) {
			for (var i = 0, c = bindings.length; i < c; i++) {
				if (bindings[i] && bindings[i].element === element && bindings[i].anchor === anchor) {
					return true;
				}
			}
			return false;
		},
		   

		// Do something with a given binding's given event stack
		withBindingEvent = function withBindingEvent(reference, event, func) {
			if (bindings[reference._id] && bindings[reference._id].events[event]) {
				func(bindings[reference._id].events[event]);
			}
		},
		   

		// Parse the arguments of DragDrop.bind
		parseOptions = function parseOptions(element, options) {
			options = options || {};
			options.element = element;
			options.anchor = options.anchor || element;
			options.boundingBox = options.boundingBox || null;
			options.releaseAnchors = options.releaseAnchors || [];
			options.releaseAnchors.unshift(document);
			return options;
		},
		   

		// The next binding ID to use
		nextBinding = 1,
		   

		// ------------------------------------------------------------------
		//  A constructor for a resource type used in referencing bindings

		BindingReference = function BindingReference() {
			this._id = nextBinding++;
		};

		BindingReference.prototype.unbind = function () {
			return DragDrop.unbind(this);
		};

		BindingReference.prototype.bindEvent = function (event, func) {
			return DragDrop.bindEvent(this, event, func);
		};

		BindingReference.prototype.unbindEvent = function (event, func) {
			return DragDrop.unbindEvent(this, event, func);
		};

		BindingReference.prototype.invokeEvent = function (event, source) {
			return DragDrop.invokeEvent(this, event, source);
		};

		BindingReference.prototype.setBoundingBox = function (box) {
			bindings[this._id].boundingBox = box;
		};

		// ----------------------------------------------------------------------------
		//  Public Functions

		// Make an element draggable
		self.bind = function (element, options) {
			options = parseOptions(element, options);
			if (!isObject(options.element)) {
				throw new Error('Must give an element to drag');
			}
			if (getStyle(options.element, 'position') === 'static') {
				throw new Error('Cannot drag-drop an element with position:static');
			}
			// Check to make sure the elements aren't already bound
			if (!bindingExists(options.element, options.anchor)) {
				// Initialize the binding object
				var reference = new BindingReference();
				var binding = {
					element: options.element,
					anchor: options.anchor,
					releaseAnchors: options.releaseAnchors,
					dragging: false,
					event: null,
					shouldUnbind: false,
					boundingBox: options.boundingBox,
					events: {
						beforedrag: Callstack(options.beforedrag),
						dragstart: Callstack(options.dragstart),
						dragend: Callstack(options.dragend),
						drag: Callstack(options.drag),
						unbind: Callstack(options.unbind)
					}
				};
				// Bind the first event
				binding.event = Events.bind(binding.anchor, events.start, function (e) {
					// Make sure it's a left click or touch event
					if (window.event && e.button === 1 || e.button === 0 || touchEvents) {
						stopEvent(e);
						// Call any "beforedrag" events before calculations begin
						binding.events.beforedrag.call(binding.element, new DragEvent('beforedrag', e, binding));
						// Make sure everyone knows the element is being dragged
						binding.dragging = true;
						addClass(binding.element, dragClass);
						// Start calculating movement
						var startX = getPos(binding.element, 'left');
						var startY = getPos(binding.element, 'top');
						// These are used in some bounding box calculations
						var startOffsetLeft = binding.element.offsetLeft;
						var startOffsetTop = binding.element.offsetTop;
						var startTotalOffset = getOffset(binding.element);
						// A place to hold on to event functions we are going to unbind later
						var tempEvents = [];
						// The target for the move and end events is dependent on the input type
						var target = touchEvents ? binding.anchor : document;
						// Bind the movement event
						tempEvents.push(Events.bind(target, events.move, function (e2) {
							// Find all needed offsets
							var offsetX = e2.clientX - e.clientX;
							var offsetY = e2.clientY - e.clientY;
							var offsetWidth = binding.element.offsetWidth;
							var offsetHeight = binding.element.offsetHeight;
							// Find the new positions
							var posX = startX + offsetX;
							var posY = startY + offsetY;
							// Enforce any bounding box
							if (binding.boundingBox) {
								var box = binding.boundingBox;
								var minX, maxX, minY, maxY;
								// Bound inside offset parent
								if (box === 'offsetParent') {
									var parent = binding.element.offsetParent;
									if (getStyle(binding.element, 'position') === 'relative') {
										minX = -startOffsetLeft;
										minY = -startOffsetTop;
									} else {
										minX = minY = 0;
									}
									maxX = parent.clientWidth + minX;
									maxY = parent.clientHeight + minY;
								}
								// Bound to the dimensions of the window
								else if (box === 'windowSize') {
										var dimensions = getWindowSize();
										if (getStyle(binding.element, 'position') === 'relative') {
											minX = -startTotalOffset.x;
											minY = -startTotalOffset.y;
										} else {
											minX = minY = 0;
										}
										maxX = dimensions.x + minX;
										maxY = dimensions.y + minY;
									}
									// Manual bounding box
									else {
											minX = box.x.min;
											maxX = box.x.max;
											minY = box.y.min;
											maxY = box.y.max;
										}
								posX = Math.max(minX, Math.min(maxX - offsetWidth, posX));
								posY = Math.max(minY, Math.min(maxY - offsetHeight, posY));
							}
							// Move the element
							binding.element.style.left = posX + 'px';
							binding.element.style.top = posY + 'px';
							// Call any "drag" events
							binding.events.drag.call(binding.element, new DragEvent('drag', e2, binding));
							return stopEvent(e2);
						}));
						// Bind the release events
						for (var i = 0, c = binding.releaseAnchors.length; i < c; i++) {
							var elem = binding.releaseAnchors[i];
							tempEvents.push(Events.bind(elem, events.end, onRelease(elem)));
						}
						// Avoid text selection problems
						document.body.focus();
						tempEvents.push(Events.bind(document, 'selectstart', false));
						tempEvents.push(Events.bind(binding.anchor, 'dragstart', false));
						// Call any "dragstart" events
						binding.events.dragstart.call(binding.element, new DragEvent('dragstart', e, binding));
						return false;
					}
					function onRelease(elem) {
						return function (e2) {
							// Unbind move and end events
							for (var i = 0, c = tempEvents.length; i < c; i++) {
								Events.unbind(tempEvents[i]);
							}
							// Clean up...
							binding.dragging = false;
							removeClass(binding.element, dragClass);
							if (binding.shouldUnbind) {
								DragDrop.unbind(binding.element, binding.anchor);
							}
							// Call any "dragend" events
							binding.events.dragend.call(binding.element, new DragEvent('dragend', e2, binding, {
								releaseAnchor: elem
							}));
							return stopEvent(e2);
						};
					}
				});
				// Add the binding to the list
				bindings[reference._id] = binding;
				return reference;
			}
		};

		// Remove an element's draggableness
		self.unbind = function (reference) {
			if (reference instanceof BindingReference) {
				var id = reference._id;
				if (bindings[id]) {
					var binding = bindings[id];

					if (binding.dragging) {
						binding.shouldUnbind = true;
					} else {
						Events.unbind(binding.event);
						bindings[id] = null;
					}
					// Call any "unbind" events
					binding.events.unbind.call(binding.element, new DragEvent('unbind', { target: true }, binding));
				}
			}
		};

		// Bind a drag event
		self.bindEvent = function (reference, event, func) {
			withBindingEvent(reference, event, function (stack) {
				stack.push(func);
			});
		};

		// Unbind a drag event
		self.unbindEvent = function (reference, event, func) {
			withBindingEvent(reference, event, function (stack) {
				stack.remove(func);
			});
		};

		// Manually invoke a drag event
		self.invokeEvent = function (reference, event, source) {
			withBindingEvent(reference, event, function (stack) {
				stack.call(bindings[reference._id].element, new DragEvent(event, source, reference));
			});
		};

		return self;
	})(),
	   

	// ----------------------------------------------------------------------------
	//  Helper Functions

	// Array Remove - By John Resig (MIT Licensed)
	arrayRemove = function arrayRemove(array, from, to) {
		var rest = array.slice((to || from) + 1 || array.length);
		array.length = from < 0 ? array.length + from : from;
		return array.push.apply(array, rest);
	},
	   

	// Get the position of an element
	getPos = function getPos(elem, from) {
		var pos = parseFloat(getStyle(elem, from));
		return isNaN(pos) ? 0 : pos;
	},
	   

	// Get a style property from an element
	getStyle = function getStyle(elem, prop) {
		if (elem.currentStyle) {
			return elem.currentStyle[prop];
		} else if (window.getComputedStyle) {
			return document.defaultView.getComputedStyle(elem, null).getPropertyValue(prop);
		} else if (elem.style) {
			return elem.style[prop];
		}
	},
	   

	// Get the dimensions of the window
	getWindowSize = function getWindowSize() {
		return {
			x: window.innerWidth || document.documentElement.clientWidth || body().clientWidth,
			y: window.innerHeight || document.documentElement.clientHeight || body().clientHeight
		};
	},
	   

	// Get the total offset position of an element in the document
	getOffset = function getOffset(elem) {
		var x = 0;
		var y = 0;
		if (elem.offsetParent) {
			do {
				x += elem.offsetLeft;
				y += elem.offsetTop;
			} while (elem = elem.offsetParent);
		}
		return { x: x, y: y };
	},
	   

	// Stop an event
	stopEvent = function stopEvent(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		if (evt.stopPropagation) {
			evt.stopPropagation();
		}
		evt.returnValue = false;
		return false;
	},
	   

	// Regular expressions for matching classnames
	cnRegexes = {},
	   

	// Remove a class from an element
	removeClass = function removeClass(elem, cn) {
		if (!cnRegexes[cn]) {
			cnRegexes[cn] = new RegExp('(^|\\s)+' + cn + '(\\s|$)+');
		}
		elem.className = elem.className.replace(cnRegexes[cn], ' ');
	},
	   

	// Add a class to an element
	addClass = function addClass(elem, cn) {
		removeClass(elem, cn);
		elem.className += ' ' + cn;
	},
	   

	// Check for a non-null object
	isObject = function isObject(value) {
		return !!(value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object');
	},
	   

	// Gets the target property of an event
	getEventTarget = function getEventTarget(evt) {
		var target;
		if (evt.target) {
			target = evt.target;
		} else if (evt.srcElement) {
			target = evt.srcElement;
		}
		if (target.nodeType === 3) {
			target = target.parentNode;
		}
		return target;
	},
	   

	/**
  * A stackable function
  *
  * @access  private
  * @param   function  an initial function
  * @return  function
  */
	Callstack = function Callstack(func) {
		var stack = [];
		var result = function result() {
			var ret;
			for (var i = 0, c = stack.length; i < c; i++) {
				ret = stack[i].apply(this, arguments);
			}
			return ret;
		};
		result.push = function () {
			stack.push.apply(stack, arguments);
		};
		result.remove = function () {
			var args = Array.prototype.slice.call(arguments);
			var result = [];
			OUTER: for (var i = 0, c1 = stack.length; i < c1; i++) {
				for (var j = 0, c2 = args.length; j < c2; j++) {
					if (stack[i] === args[j]) {
						continue OUTER;
					}
				}
				result.push(stack[i]);
			}
			stack = result;
		};
		if (typeof func === 'function') {
			stack.push(func);
		}
		return result;
	},
	   

	/**
  * Custom event constructor
  *
  * @access  private
  * @param   string    type
  * @param   object    original event object
  */
	DragEvent = function DragEvent(type, original, binding, extras) {
		this.type = type;
		this.originalEvent = original;
		this.altKey = original.altKey || false;
		this.ctrlKey = original.ctrlKey || false;
		this.shiftKey = original.shiftKey || false;
		this.timestamp = original.timestamp || +new Date();
		this.pos = getPosition(original);
		this.binding = binding;
		this.target = getEventTarget(original);

		if (extras) {
			for (var i in extras) {
				if (extras.hasOwnProperty(i)) {
					this[i] = extras[i];
				}
			}
		}
	},
	   

	/**
  * A namespace with functions for event binding
  *
  * Example:
  *
  *   Bind
  *    var evt = Events.bind(obj, 'event', function() { ... });
  *
  *   Unbind
  *    Events.unbind(evt);
  *     -OR-
  *    evt.unbind();
  *
  * @access  private
  */
	Events = (function () {

		var

		// Bind an event
		bindEvent = (function () {
			if (document.addEventListener) {
				return function (obj, event, func) {
					obj.addEventListener(event, func, false);
				};
			} else if (document.attachEvent) {
				return function (obj, event, func) {
					obj.attachEvent('on' + event, func);
				};
			} else {
				return function () {};
			}
		})(),
		   

		// Unbind an event
		unbindEvent = (function () {
			if (document.removeEventListener) {
				return function (obj, event, func) {
					obj.removeEventListener(event, func, false);
				};
			} else if (document.detachEvent) {
				return function (obj, event, func) {
					obj.detachEvent('on' + event, func);
				};
			} else {
				return function () {};
			}
		})();

		// Build the return value
		return {
			bind: function bind(obj, event, func) {
				var oldFunc = func === false ? function (e) {
					return stopEvent(e);
				} : func;
				func = function (e) {
					return oldFunc.call(obj, e || window.event);
				};
				bindEvent(obj, event, func);
				var ret = function ret() {
					unbindEvent(obj, event, func);
				};
				ret.unbind = function () {
					ret();
				};
				return ret;
			},
			unbind: function unbind(unbinder) {
				unbinder();
			}
		};
	})();

	function getPosition(evt) {
		var posX = 0;
		var posY = 0;
		if (evt.targetTouches) {
			posX = evt.targetTouches[0].pageX;
			posY = evt.targetTouches[0].pageY;
		} else if (evt.pageX || evt.pageY) {
			posX = evt.pageX;
			posY = evt.pageY;
		} else if (evt.clientX || evt.clientY) {
			posX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x: posX, y: posY };
	}

	module.exports = DragDrop;
})();

},{}],10:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _emitter = require('./module/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _controller = require('./module/controller');

var _controller2 = _interopRequireDefault(_controller);

var _bind = require('./module/bind');

var _bind2 = _interopRequireDefault(_bind);

var _element = require('./component/element');

var _element2 = _interopRequireDefault(_element);

var _events = require('./component/events');

var _events2 = _interopRequireDefault(_events);

var _attribute = require('./component/attribute');

var _attribute2 = _interopRequireDefault(_attribute);

var _style = require('./component/style');

var _style2 = _interopRequireDefault(_style);

var _storage = require('./component/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// element related modules

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
      this.name = this.constructor.name.toLowerCase();

      // merge options

      // implement element methods
      Object.assign(this, _element2.default, _storage2.default, _events2.default, _style2.default, _attribute2.default, _bind2.default);

      this.document = window.document;

      if (this.options.props) {
        this._initProps(this.options.props);
      }

      this.controller = new _controller2.default();

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

      this.content = _element2.default;

      // insert if container options is given
      if (opts.container) {
        //console.log(this.name, opts.container);
        this.insert(opts.container);
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

      if (this.name !== 'component') {
        this.addClass(opts.prefix + '-' + this.name);
      }

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

        if (value) {
          this.setAttribute(name, value);
        }
      }

      return this;
    }
  }]);

  return Component;
})(_emitter2.default);

module.exports = Component;

},{"./component/attribute":11,"./component/element":12,"./component/events":13,"./component/options":14,"./component/storage":15,"./component/style":16,"./module/bind":31,"./module/controller":32,"./module/emitter":35}],11:[function(require,module,exports){
'use strict';

/**
 * Module fieldset
 * @module component/
 */

module.exports = {

    /**
     * Set element
     * @param  {string} name The  name
     * @param  {string} value The  value
     * @return {Object} This class instance
     */

    setAttribute: function setAttribute(name, value) {
        if (value !== null) {
            this.element.setAttribute(name, '' + value);
        } else {
            this.element.removeAttribute(name);
        }
    },

    /**
     * Get element
     * @param  {string} name The  name
     * @param  {string} value The  value
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

        if (!this.hasClass(className)) this.element.className += ' ' + className;

        return this;
    },

    /**
     * [removeClass description]
     * @param  {string} className [description]
     * @return {void}           [description]
     */
    removeClass: function removeClass(className) {
        if (this.hasClass(className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            this.element.className = this.element.className.replace(reg, ' ');
        }
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

        return this.element.textContent;
    }
};

},{}],12:[function(require,module,exports){
'use strict';

var _morpheus = require('morpheus');

var _morpheus2 = _interopRequireDefault(_morpheus);

var _insertion = require('../module/insertion');

var _insertion2 = _interopRequireDefault(_insertion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	createElement: function createElement(string, document) {
		document = document || this.document;
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
		this.emit('insert');

		this.container = container;

		if (container && container.element) {
			container = container.element;
		} else if (container instanceof HTMLElement) {
			container = container;
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

		this.emit('insert');

		// insert component element to the dom tree using Dom
		_insertion2.default[method](container, this.element);

		this.isInjected = true;
		this.emit('injected');

		return this;
	},

	/**
  * [animate description]
  * @return {} This class instance
  */
	animate: function animate(prop, options, callback) {

		var opts = Object.assign(prop, options);

		//console.log('animate', options);
		if (callback) options.complete = callback;

		var animation = (0, _morpheus2.default)(this.element, opts);
		//this.style(style);

		return animation;
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
		var el = this.element;
		return el.parentNode ? el.parentNode.removeChild(el) : el;
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

},{"../module/insertion":36,"morpheus":40}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
'use strict';

/**
 * Component options
 */

var options = {
	prefix: 'ui',
	type: null,
	tag: 'div',
	attr: ['accesskey', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone', 'hidden', 'id', 'lang', 'spellcheck', 'style', 'tabindex', 'title', 'translate', 'type']
};

module.exports = options;

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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
            return this._getComputedStyle(_style);
        }

        //get array of this.elements
        if ((0, _utils._isArray)(_style)) {
            var css = {};
            for (var i in _style) {
                css[_style[i]] = this._getComputedStyle(_style[i]);
            }
            return css;
        }

        if ((0, _utils._isLiteralObject)(_style)) {
            //set csses
            for (var j in _style) {
                this.element.style[j] = _style[j];
            }
            return _style;
        }

        return false;
    }
};

},{"../module/utils":37}],17:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _options = require('./container/options');

var _options2 = _interopRequireDefault(_options);

var _display = require('./container/display');

var _display2 = _interopRequireDefault(_display);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
			this.options = [_options2.default, options].reduce(Object.assign, {});

			Object.assign(this, _display2.default);

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

			this.component[name] = new _component2.default().addClass(this.name + '-' + name).insert(element);

			return this.component[name];
		}
	}]);

	return Container;
})(_component2.default);

module.exports = Container;

},{"./component":10,"./container/display":18,"./container/options":19}],18:[function(require,module,exports){
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
    var _this = this;

    console.log('minimize');
    if (!this.display) {
      this._initDisplay();
    }

    this.emit('minimize');

    var prop = {
      //stop: () => {},
      duration: 200,
      easing: 'ease-out',
      complete: function complete() {
        _this.emit('display', 'minimized');
      }
    };

    prop[this._modifier] = 0;

    if (this.animation) this.animation.stop();

    this.animation = this.animate(prop);

    this._display = 'minimized';

    this.emit('display', 'minimized');

    return this;
  },

  /**
   * [normalize description]
   * @return {Object} The class instance
   */
  normalize: function normalize() {
    var _this2 = this;

    if (!this.display) {
      this._initDisplay();
    }

    this.emit('normalize');

    var size = this[this._modifier];

    var option = {
      //stop: () => {},
      duration: 200,
      easing: 'ease-out',
      complete: function complete() {
        _this2.emit('display', 'normalized');
      }
    };

    var property = {};
    property[this._modifier] = size;

    if (this.animation) this.animation.stop();

    this.animation = this.animate(property, option);
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULTS = {
    //disabled: false
    error: false
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

            this.value = this.options.value;
            this.readonly = this.options.read;

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
            this.input.setAttribute('value', value);
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
})(_component2.default);

module.exports = Control;

},{"./component":10}],21:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
    prefix: 'ui',
    type: null, // push, file
    tag: 'span',
    ripple: {
        duration: '300',
        equation: 'ease-out'
    },
    bind: {
        'click': '_onClick',
        'mousedown': '_onMouseDown',
        'mouseup': '_onMouseUp',
        'mouseout': '_onMouseOut'
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
 * }).insert(document.body);
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
                this.setAttribute('data-name', opts.name);
            }

            this.setAttribute('title', opts.text);

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

            this.icon = new _component2.default(prop).insert(this.element);

            // prepare use of svg
            // this.iconsvg = new Element('svg', prop).insert(this.element);
            // this.svguse = new Element('use').insert(this.iconsvg);

            // this.iconsvg.setAttribute('viewBox', '0 0 24 24');
            // this.svguse.setAttribute('xlripple:href','/vendor/icon/content-send.svg');

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
                this.label = new _component2.default({
                    tag: 'span.ui-text'
                }).insert(this.element, position);
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

            this.sensor = new _component2.default({
                tag: 'div.ui-sensor'
            }).insert(this.element);
        }

        /**
         * _onClick
         * @param  {Event} e The related event
         */

    }, {
        key: '_onClick',
        value: function _onClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.press(e);
        }

        /**
         * _onMouseDown description
         * @param  {Event} e The related event
         */

    }, {
        key: '_onMouseDown',
        value: function _onMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            this.addClass('is-active');
            this._showRipple(e);
        }

        /**
         * _onMouseDown description
         * @param  {Event} e The related event
         */

    }, {
        key: '_onMouseUp',
        value: function _onMouseUp(e) {
            e.preventDefault();
            e.stopPropagation();
            this.removeClass('is-active');
            if (!this.rippleActive) this._hideRipple(e);
        }

        /**
         * _onMouseDown description
         * @param  {Event} e The related event
         */

    }, {
        key: '_onMouseOut',
        value: function _onMouseOut(e) {
            e.preventDefault();
            e.stopPropagation();
            this.removeClass('is-active');
            this._hideRipple(e);
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
            var _this2 = this;

            if (!this.size) {
                this.size = this.offset();
            }

            if (!this.ripple) {
                this.ripple = new _component2.default({
                    tag: 'span.ui-ripple'
                }).insert(this, 'top');
            }

            var rippleCoord = this._rippleCoord(this.size);
            var options = this.options.ripple;

            var startLeft = e.offsetX || this.size.width / 2;
            var startTop = e.offsetY || this.size.height / 2;

            this.ripple.style({
                left: startLeft + 'px',
                top: startTop + 'px',
                width: '5px',
                height: '5px',
                opacity: 1
            });

            this.rippleActive = true;

            // stop animation if exists
            if (this.animation) {
                this.animation.stop();
            }

            this.animation = this.ripple.animate({
                width: rippleCoord.size,
                height: rippleCoord.size,
                left: rippleCoord.left,
                top: rippleCoord.top,
                opacity: 0.2,
                duration: options.duration,
                easing: options.equation,
                complete: function complete() {
                    _this2.rippleActive = false;
                    if (!_this2.hasClass('is-active')) _this2._hideRipple();
                }
            });
        }

        /**
         * [_hideRipple description]
         */

    }, {
        key: '_hideRipple',
        value: function _hideRipple() {
            var _this3 = this;

            if (!this.ripple) return;

            this.animation.stop();

            this.animation = this.ripple.animate({
                opacity: 0,
                duration: '200',
                easing: this.options.equation,
                complete: function complete() {
                    if (_this3.ripple) {
                        _this3.ripple.destroy();
                        _this3.ripple = null;
                    }
                }
            });
        }

        /**
         * Get ripple final coordiantes
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
                size: size * 2,
                top: top,
                left: size / -2
            };
        }
    }]);

    return Button;
})(_component2.default);

module.exports = Button;

},{"../component":10}],22:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _control = require('../control');

var _control2 = _interopRequireDefault(_control);

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
    name: 'checkbox',
    // base: 'field',
    prefix: 'ui',
    label: null,
    checked: false,
    error: false,
    value: false,
    bind: {
        'control.click': 'toggle',
        'label.click': 'toggle',

        // for accessibility purpose
        'input.click': 'toggle',
        'input.focus': '_onInputFocus',
        'input.blur': '_onInputBlur'
    }
};

/**
 * Switch class
 * @class
 * @extends Control
 */

var Checkbox = (function (_Control) {
    _inherits(Checkbox, _Control);

    function Checkbox() {
        _classCallCheck(this, Checkbox);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).apply(this, arguments));
    }

    _createClass(Checkbox, [{
        key: 'init',

        /**
         * Constructor
         * @param  {Object} options The class options
         * @return {Object} This class instance
         */
        value: function init(options) {
            _get(Object.getPrototypeOf(Checkbox.prototype), 'init', this).call(this, options);
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
            _get(Object.getPrototypeOf(Checkbox.prototype), 'build', this).call(this);

            var text = this.options.label || this.options.text;

            if (this.options.disabled) {
                this.addClass('is-disabled');
            }

            this._initInput();
            this._initControl();

            if (this.options.label !== null) {
                this.label = new _component2.default({
                    tag: 'span.checkbox-label'
                }).insert(this.element);

                this.label.text(text);
            }

            if (this.value) {
                this.check();
            }
        }

        /**
         * [initControl description]
         * @return {void} [description]
         */

    }, {
        key: '_initControl',
        value: function _initControl() {
            this.control = new _component2.default({
                tag: 'span.checkbox-control'
            }).insert(this.element);
        }

        /**
         * [initInput description]
         * @return {[type]} [description]
         */

    }, {
        key: '_initInput',
        value: function _initInput() {
            this.input = new _component2.default({
                tag: 'input',
                type: 'checkbox'
            }).insert(this.element);

            if (this.options.disabled) {
                this.input.setAttribute('disabled', 'disabled');
            }

            if (this.value) {
                this.input.setAttribute('checked', 'checked');
            }
        }
    }, {
        key: '_onInputFocus',
        value: function _onInputFocus() {
            this.addClass('is-focused');
        }
    }, {
        key: '_onInputBlur',
        value: function _onInputBlur() {
            this.removeClass('is-focused');
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
                this.check();
            } else {
                this.unCheck();
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

            this.input.element.focus();

            if (this.value) {
                this.unCheck(true);
            } else {
                this.check();
            }

            return this;
        }

        /**
         * setTrue
         */

    }, {
        key: 'check',
        value: function check() {

            this.value = true;
            this.addClass('is-checked');
            this.input.element.checked = true;
            this.emit('change', this.value);
        }

        /**
         * setFlas
         */

    }, {
        key: 'unCheck',
        value: function unCheck() {
            this.value = false;
            this.removeClass('is-checked');
            this.input.element.checked = false;
            this.emit('change', this.value);
        }
    }]);

    return Checkbox;
})(_control2.default);

module.exports = Checkbox;

},{"../component":10,"../control":20}],23:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _control = require('../control');

var _control2 = _interopRequireDefault(_control);

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
	name: 'switch',
	// base: 'field',
	prefix: 'ui',
	label: null,
	checked: false,
	error: false,
	value: false,
	bind: {
		'control.click': 'toggle',
		'label.click': 'toggle',
		// for accessibility purpose
		//'input.click': 'toggle',
		'input.focus': '_onInputFocus',
		'input.blur': '_onInputBlur'
	}
};

/**
 * Switch class
 * @class
 * @extends Control
 */

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

			if (this.options.disabled) {
				this.addClass('is-disabled');
			}

			this.initInput();
			this.initControl();
			// this.wrapper = new Component({tag: 'div.switch-wrapper'}).insert(this.element);

			if (this.options.label !== null) {
				this.label = new _component2.default({
					tag: 'span.switch-label'
				}).insert(this.element);
				this.label.text(text);
			}

			if (this.value) {
				this.check();
			}
		}

		/**
   * [initControl description]
   * @return {[type]} [description]
   */

	}, {
		key: 'initControl',
		value: function initControl() {
			this.control = new _component2.default({
				tag: 'span.switch-control'
			}).insert(this.element);

			this.track = new _component2.default({
				tag: 'span.switch-track'
			}).insert(this.control);

			this.knob = new _component2.default({
				tag: 'span.switch-knob'
			}).insert(this.track);
		}

		/**
   * [initInput description]
   * @return {[type]} [description]
   */

	}, {
		key: 'initInput',
		value: function initInput() {
			this.input = new _component2.default({
				tag: 'input',
				type: 'checkbox'
			}).insert(this.element);

			if (this.options.disabled) {
				this.input.setAttribute('disabled', 'disabled');
			}

			if (this.value) {
				this.input.setAttribute('checked', 'checked');
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
				this.check();
			} else {
				this.unCheck();
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
				this.unCheck(true);
			} else {
				this.check();
			}

			return this;
		}

		/**
   * setTrue
   */

	}, {
		key: 'check',
		value: function check() {

			this.value = true;
			this.addClass('is-checked');
			this.input.element.checked = true;
			this.emit('change', this.value);
		}

		/**
   * setFlas
   */

	}, {
		key: 'unCheck',
		value: function unCheck() {
			this.value = false;
			this.removeClass('is-checked');
			this.input.element.checked = false;
			this.emit('change', this.value);
		}
	}]);

	return Switch;
})(_control2.default);

module.exports = Switch;

},{"../component":10,"../control":20}],24:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _control = require('../control');

var _control2 = _interopRequireDefault(_control);

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
	name: 'field',
	type: 'text',
	value: null,
	error: true,
	bind: {
		'input.focus': '_onInputFocus',
		'input.blur': '_onInputBlur'
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

			//this.setOptions();

			//this.options = [ defaults, options ].reduce(Object.assign, {});
			Object.assign(this.options, [defaults, options].reduce(Object.assign, {}));

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

			this.addClass('ui-field');

			if (this.disabled) {
				this.addClass('is-disabled');
			}

			if (opts.klss) {
				this.addClass(opts.klss);
			}

			if (opts.label !== false) {
				this._initLabel();
			}

			this._initInput();
			this._initUnderline();

			// if (opts.error) {
			// 	this.initError();
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
				text = this.options.name;
			}

			this.label = new _component2.default({
				tag: 'label',
				'for': this.options.name
			}).insert(this.element);

			this.label.text(text);
		}

		/**
   * [_initInput description]
   * @return {Object} The class instance
   */

	}, {
		key: '_initInput',
		value: function _initInput() {

			this.input = new _component2.default({
				tag: 'input',
				type: this.options.type,
				value: this.options.value,
				placeholder: this.options.text
			}).insert(this.element);

			if (this.readonly) {
				this.input.setAttribute('readonly', 'readonly');
				this.input.setAttribute('tabindex', '-1');
			}

			return this.input;
		}

		/**
   * _initUnderline
   * @return {Object} The class instance
   */

	}, {
		key: '_initUnderline',
		value: function _initUnderline() {
			this.underline = new _component2.default({
				tag: 'span.field-underline'
			}).insert(this.element);
		}

		/**
   * error
   * @return {Object} The class instance
   */

	}, {
		key: 'initError',
		value: function initError() {
			this.error = new _component2.default({
				tag: 'span.error-message'
			}).insert(this.element);
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
				this.input.setAttribute('name', name);
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
   * [_onFocus description]
   * @return {Object} The class instance
   */

	}, {
		key: '_onInputFocus',
		value: function _onInputFocus(e) {

			if (this.readonly) return;
			this.setState('focus');
		}

		/**
   * [_onBlur description]
   * @return {Object} The class instance
   */

	}, {
		key: '_onInputBlur',
		value: function _onInputBlur() {

			if (this.readonly) return;
			this.setState(null);
		}

		/**
   * [setError description]
   * @param {string} error Error description
   */

	}, {
		key: 'setError',
		value: function setError(error) {
			if (error) {
				this.addClass('field-error');
				if (this.error) this.error.set('html', error);
			} else {
				if (this.error) this.removeClass('field-error');
				if (this.error) this.error.set('html', '');
			}
		}
	}]);

	return Field;
})(_control2.default);

module.exports = Field;

},{"../component":10,"../control":20}],25:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _container3 = require('./layout/container');

var _container4 = _interopRequireDefault(_container3);

var _resizer = require('./layout/resizer');

var _resizer2 = _interopRequireDefault(_resizer);

var _options = require('./layout/options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
			this.options = [_options2.default, options].reduce(Object.assign, {});
			this.window = window;

			Object.assign(this, _container4.default, _resizer2.default);

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
})(_container2.default);

module.exports = Layout;

},{"./container":17,"./layout/container":26,"./layout/options":27,"./layout/resizer":28}],26:[function(require,module,exports){
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
			_this.emit('resize');
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

},{"../container":17}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
'use strict';

var Component = require("../component");
var DragDrop = require("material/dist/vendor/dragdrop");

var resize = {

    /**
     * _initResizeBorder description
     * @param  {component} component [description]
     */

    _initResizer: function _initResizer(component) {
        var name = component.options.name;

        var container = component.container || component.options.container;
        var direction = this._initResizerDirection(container);
        var modifier = this.options.resizer.modifier[direction];

        if (!direction || !modifier || !container) {
            return;
        }

        var resizer = this.resizer[name] = new Component({
            tag: 'div.ui-resizer'
        }).insert(container);

        resizer.setAttribute('data-name', name);

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

        // the last statement is temporary before i fix the component correctly

        var draggable = DragDrop.bind(resizer.element, {
            //anchor: anotherElement,
            boundingBox: 'offsetParent',
            dragstart: function dragstart(ev) {
                console.log('dragstart', ev);
                //this.emit('resizeStart', component);
                //self.mask.style('display', 'block');
            },
            dragend: function dragend(ev) {
                _this.emit('drag', ev);
            },
            drag: function drag() {
                _this._onDrag(resizer, modifier, component);
            }
        });

        return draggable;
    },

    /**
     * [_onDrag description]
     */
    _onDrag: function _onDrag(resizer, modifier, component) {
        //self.mask.style('display', 'block');
        var from = modifier.from;
        var size = modifier.size;
        var container = component.container;
        var last = component.options.last;
        var style = {};
        var coord = {};

        var c = {};
        c[from] = resizer.offset(from);
        coord[from] = component.offset(from);

        if (last) {
            var csize = container.offset(size);
            style[size] = csize - c[from] + 'px';
            component.style(style);
        } else {
            style[size] = c[from] - coord[from] + 'px';
            component.style(style);
        }

        //this._updateSize(component, resizer, modifier);
        this.emit('drag');
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
        var container = component.container;
        var from = modifier.from;
        var size = modifier.size;
        var style = {};
        var coord = {};

        coord[from] = component.offset(from);
        coord[size] = component.offset(size);

        // for the last component
        // the resizer is on the left or on the top
        if (component.options.last) {
            var csize = container.offset(size);
            style[from] = csize - coord[size] - 3 + 'px';
            resizer.style(style);
        } else {
            style[from] = coord[from] + coord[size] - 3 + 'px';
            resizer.style(style);
        }

        this.emit('size');
    }
};

module.exports = resize;

},{"../component":10,"material/dist/vendor/dragdrop":9}],29:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _view = require('material/lib/view');

var _view2 = _interopRequireDefault(_view);

var _emitter = require('./module/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _options = require('./list/options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Surface from './view/surface';
//import Collection from './view/collection';
//import Filter from './view/filter';
//import Select from './view/select';
//import Search from './list/search';

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

			Object.assign(this.options, [_options2.default, options].reduce(Object.assign, {}));

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

			item.insert(this.c.body, where);
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
})(_view2.default);

module.exports = List;

},{"./list/options":30,"./module/emitter":35,"material/lib/view":38}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var standardNativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'mousemultiwheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'message', 'error', 'abort', 'scroll'];

/**
 * Bind module
 * @module module/bind
 * @example
 * ```
 * var bind = {
 * 	'button.click': 'press'
 * }
 *
 * this.bind(bind);
 * ```
 */
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
		} else {
			//console.log('--', listener, bound.emit);
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
			if (standardNativeEvents.indexOf(ev) < 0) {
				// attach event to the instance
				listener.on(ev, method.bind(bound));
			} else {
				// attach event to the element
				listener.addEvent(ev, method.bind(bound));
			}
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
(function (process,global){
'use strict';

/**
 * Module defer
 * @module module/defer
 */

// function kindOf from mout

var _rKind = /^\[object (.*)\]$/;
var _toString = Object.prototype.toString;
var UNDEF;

/**
 * Gets the "kind" of value. (e.g. "String", "Number", etc)
 */
function kindOf(val) {
    if (val === null) {
        return 'Null';
    } else if (val === UNDEF) {
        return 'Undefined';
    } else {
        return _rKind.exec(_toString.call(val))[1];
    }
}

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

},{"_process":8}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _defer = require('./defer');

var _defer2 = _interopRequireDefault(_defer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var slice = Array.prototype.slice;

/**
 * Emitter abstract class for managing and emitting events.
 * @class
 * @credits Valerio Proietti
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
		key: 'on',
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
		key: 'off',
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
		key: 'emit',
		value: function emit(event) {
			var self = this;
			var args = slice.call(arguments, 1);

			//console.log('emit', event);

			var fire = function fire() {
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
				fire();
			} else {
				(0, _defer2.default)(fire);
			}

			return this;
		}
	}]);

	return Emitter;
})();

Emitter.EMIT_SYNC = {};

module.exports = Emitter;

},{"./defer":33}],36:[function(require,module,exports){
'use strict';

/**
 * Element insertion related methods
 * @module module/insertion
 */

module.exports = {

  /**
   * Inserts content specified by the container argument at the end of HTMLElement
   *
   * @param {HTMLElement} container
   * @param {String|HTMLElement} html
   * @return {HTMLElement} inserted element
   */

  append: function append(container, element) {

    container.appendChild(element);
    return element;
  },

  /**
   * Inserts content specified by the html argument at the beginning of HTMLElement
   *
   * @param {HTMLElement} container
   * @param {string|HTMLElement} html
   * @returns {HTMLElement} inserted container
   */
  prepend: function prepend(container, element) {

    container.insertBefore(element, container.firstChild);
    return element;
  },

  /**
   * Inserts content specified by the html argument after the HTMLElement
   *
   * @param {HTMLElement} container
   * @returns {HTMLElement} inserted container
   */
  after: function after(container, element) {

    container.parentNode.insertBefore(element, container.nextSibling);
    return element;
  },

  /**
   * Inserts content specified by the html argument before the HTMLElement
   *
   * @param {HTMLElement} container
   * @returns {HTMLElement} inserted container
   */
  before: function before(container, element) {

    container.insertBefore(element, container);
    return element;
  },

  /**
   * Replaces given html container with content specified in html parameter
   *
   * @param {HTMLElement} container
   * @param {string|HTMLElement} html
   * @returns {HTMLElement} inserted container
   */
  replace: function replace(container, element) {

    container.parentNode.replaceChild(element, container);
    return element;
  },

  /**
   * Removes HTMLElement from dom tree
   *
   * @param {HTMLElement} container
   * @returns {HTMLElement} removed container
   */
  remove: function remove(element) {

    var parent = element.parentNode;
    return parent.removeChild(element);
  }
};

},{}],37:[function(require,module,exports){
'use strict';

/**
 * Utility functions
 * @module module/utils
 */

/**
 * Checks if given value is an array
 * @param {*} object
 * @returns {boolean}
 * @private
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _isArray(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
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
exports._isIterable = _isIterable;
exports._isLiteralObject = _isLiteralObject;
exports._each = _each;
exports._indexOf = _indexOf;

},{}],38:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _options = require('./view/options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Dragging from './view/dragging';
//import Loader from './view/loader';
//import Limit from './view/limit';
//import Scroll from './view/scroll';
//import LayoutView from './view/layout';
//import Toolbar from './toolbar/toolbar';
//import Zoom from './view/zoom';

//import viewCtrl from './view/ctrl',

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

			this.options = [_options2.default, options].reduce(Object.assign, {});
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
})(_container2.default);

module.exports = View;

},{"./container":17,"./view/options":39}],39:[function(require,module,exports){
'use strict';

module.exports = {
	name: 'view',
	prefix: 'ui',
	tag: 'div',
	component: ['body']
};

},{}],40:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=demo.js.map
