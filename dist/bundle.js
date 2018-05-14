(function () {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var domready = createCommonjsModule(function (module) {
/*!
 * domready (c) Dustin Diaz 2014 - License MIT
 */
!(function (name, definition) {
  module.exports = definition();
}('domready', function () {
  var fns = [];
  var listener;
  var doc = document;
  var hack = doc.documentElement.doScroll;
  var domContentLoaded = 'DOMContentLoaded';
  var loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded) {
    doc.addEventListener(domContentLoaded, listener = function () {
      doc.removeEventListener(domContentLoaded, listener);
      loaded = 1;
      while (listener = fns.shift()) listener();
    });
  }

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  }
}));
});

var emitter = {
  on (event, cb) {
    this.event = this.event || {};
    this.event[event] = this.event[event] || [];
    this.event[event].push(cb);
    return this
  },
  off (event, cb) {
    this.event = this.event || {};
    if (event in this.event === false) return
    this.event[event].splice(this.event[event].indexOf(cb), 1);
    return this
  },
  emit (event /* , args... */) {
    this.event = this.event || {};
    if (event in this.event === false) return
    for (var i = 0; i < this.event[event].length; i++) {
      this.event[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    return this
  }
};

'use strict';

/**
 * Element insertion related methods
 * @module module/dom
 */

/**
 * Inserts content specified by the container argument at the end of HTMLElement
 *
 * @param {HTMLElement} container
 * @param {String|HTMLElement} html
 * @return {HTMLElement} inserted element
 */
function append (container, element) {
  container.appendChild(element);
  return element
}

/**
 * Inserts content specified by the html argument at the beginning of HTMLElement
 *
 * @param {HTMLElement} container
 * @param {string|HTMLElement} html
 * @returns {HTMLElement} inserted container
 */
function prepend (container, element) {
  return container.insertBefore(element, container.firstChild)
}

/**
 * Inserts content specified by the html argument after the HTMLElement
 *
 * @param {HTMLElement} container
 * @returns {HTMLElement} inserted container
 */
function after (container, element) {
  return container.parentNode.insertBefore(element, container.nextSibling)
}

/**
 * Inserts content specified by the html argument before the HTMLElement
 *
 * @param {HTMLElement} container
 * @returns {HTMLElement} inserted container
 */
function before (container, element) {
  return container.insertBefore(element, container)
}

/**
 * Replaces given html container with content specified in html parameter
 *
 * @param {HTMLElement} container
 * @param {string|HTMLElement} html
 * @returns {HTMLElement} inserted container
 */
function replace (container, element) {
  return container.parentNode.replaceChild(element, container)
}

/**
 * Removes HTMLElement from dom tree
 *
 * @param {HTMLElement} container
 * @returns {HTMLElement} removed container
 */
function remove (element) {
  var parent = element.parentNode;
  return parent.removeChild(element)
}

/**
 * [dispose description]
 * @return {Object} The class instance
 */
function dispose (element) {
  var el = element;
  return (el.parentNode) ? el.parentNode.removeChild(el) : el
}

/**
 * empty
 * @return {void}
 */
function empty (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * [destroy description]
 * @return {Object} this class
 */
function destroy (element) {
  return element.parentNode.removeChild(element)
}

var dom = { append, prepend, after, before, replace, remove, destroy, empty, dispose };

/**
 * This function checks if the element className passed in parameters
 *
 * @since 0.0.6
 * @module css/has
 * @category Element
 * @param {...Array} [arrays] The arrays to process.
 * @param {Function} iteratee The function to combine
 *  grouped values.
 * @returns {Array} Returns the new array of grouped elements.
 * @see unzip, unzipWith, zip, zipObject, zipObjectDeep, zipWith
 * @example
 *
 * has(element, 'show');
 * // => [111, 222]
 */
function has(element, className) {
  if (!element || !className) {
    return false
  }

  return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

/**
 * This function adds className to the element's attribute class
 *
 * @since 0.0.6
 * @module css/add
 * @category css
 * @param {HTMLElement} element Related element
 * @param {String} className the className to add
 *  grouped values.
 * @returns {HTMLElement} The augmented element
 * @example
 *
 * add(element, 'hidden');
 * // => <div class="element hidden">...</div>
 */
function add(element, className) {
  if (!element || !className) {
    return
  }

  let classNames = className.split(' ');

  for (var i = 0; i < classNames.length; i++) {
    var cn = classNames[i];
    if (!has(element, cn)) {
      element.classList.add(cn);
    }
  }
  return element
}

/**
 * This function removes className to the element's attribute class
 *
 * @since 0.0.6
 * @module css/remove
 * @category css
 * @param {HTMLElement} element Related element
 * @param {String} className the className to add
 * @returns {HTMLElement} The element with the removed className
 * @example
 *
 * remove(element, 'hidden');
 * // => <div class="element">...</div>
 */
function remove$1(element, className) {
  if (!element || !className) {
    return
  }

  element.classList.remove(className);

  return element
}

/**
 * This function toggles className from the element's attribute class
 *
 * @since 0.0.6
 * @module css/toggle
 * @category Element
 * @param {HTMLElement} element Related element
 * @param {String} className the className to add
 *  grouped values.
 * @returns {HTMLElement} The modified element
 * @example
 *
 * toggle(element, 'hidden');
 * // => <div class="element">...</div>
 * toggle(element, 'hidden');
 * // => <div class="element hidden">...</div>
 */
function toggle(element, className) {
  if (has(element, className)) {
    remove$1(element, className);
  } else {
    add(element, className);
  }

  return element
}

var css = { has, add, remove: remove$1, toggle };

'use strict';

/**
 * app options
 * @type {Object}
 */

var options = {
  name: 'material-demo',
  components: [
    { name: 'Typography' },
    { name: 'Components', type: 'divider' },
    { name: 'Button' },
    { name: 'Card' },
    { name: 'Checkbox' },
    { name: 'Dialog' },
    { name: 'Drawer' },
    { name: 'Field' },
    { name: 'Menu' },
    { name: 'Progress' },
    { name: 'Select' },
    { name: 'Slider' },
    { name: 'Snackbar' },
    { name: 'Switch' },
    { name: 'Tabs' },
    { name: 'Toolbar' },
    { name: 'Views', type: 'divider' },
    { name: 'List' },
    { name: 'Form' },
    { name: 'Calendar' },
    { type: 'divider' },
    { name: 'ripple' },
    { name: 'elevation' },
    { name: 'color' }
  ]
};

function is (object) {
  return object &&
    typeof object === 'object' &&
    Object.getPrototypeOf(object) === Object.getPrototypeOf({})
}

'use strict';

function insert (element, container, context) {
  if (!element || !container) return

  element = element.root || element;
  container = container.root || container;

  context = context || 'bottom';

  var contexts = ['top', 'bottom', 'after', 'before'];
  var methods = ['prepend', 'append', 'after', 'before'];

  var index = contexts.indexOf(context);
  if (index === -1) {
    return
  }

  var method = methods[index];

  // insert component element to the dom tree using dom
  dom[method](container, element);

  return element
}

class Layout {
  /**
   * [constructor description]
   * @param  {?} schema    [description]
   * @param  {?} container [description]
   * @return {?}           [description]
   */
  constructor (schema, container) {
    this.component = this.create(schema, container);

    return this
  }

  /**
   * [create description]
   * @param  {?} schema    [description]
   * @param  {?} container [description]
   * @param  {?} structure [description]
   * @return {?}           [description]
   */
  create (schema, container, structure, level) {
    level = level || 0;
    level++;

    // console.log('level', level, schema)
    // console.log('-------------')

    structure = structure || {};
    let component = null;

    for (var i = 0; i < schema.length; i++) {
      // console.log('index', i, typeof schema[i])
      var name;
      var options = {};

      if (schema[i] instanceof Object &&
        typeof schema[i] === 'function') {
        if (is(schema[i + 2])) {
          options = schema[i + 2];
        }

        if (typeof schema[i + 1] === 'string') {
          name = schema[i + 1];
          options.name = name;
        }

        component = new schema[i](options);

        if (name) {
          structure[name] = component;
        }

        if (component) {
          this.display(component.root, options);
          this.style(component, options);
        }

        if (level === 1) {
          structure.root = component.root;
        }

        if (component && container) {
          if (component.insert) component.insert(container);
          else insert(component, container);
        }
      } else if (Array.isArray(schema[i])) {
       // console.log('------', schema[i])
        if (component == null) {
          component = container;
        }
        this.create(schema[i], component, structure, level);
      }
    }

    return structure
  }

  /**
   * [_initFlexDirection description]
   * @param  {Element} container Init direction for the given container
   * @param  {string} direction (horizontal,vertical)
   */
  display (element, options) {
    var display = options.display;
    var direction = options.direction || 'horizontal';

    if (!element || !display) return

    if (direction === 'horizontal') {
      element.className += ' ' + 'flex-row';
    } else if (direction === 'vertical') {
      element.className += ' ' + 'flex-column';
    }
  }

  /**
   * [style description]
   * @param  {?} component [description]
   * @return {?}           [description]
   */
  style (component) {
    var options = component.options || {};

    // console.log('component', component);

    if (options.flex) {
      css.add(component.root, 'flex-' + options.flex);
    } else {
      var size = options.size;
      if (options.size && options.width) {
        component.root.width = size + 'px';
      } else if (options.size && options.height) {
        component.root.height = size + 'px';
      }
    }

    if (options.position) {
      component.root.position = options.position;
    }

    if (options.bottom) {
      component.root.bottom = options.bottom;
    }

    if (options.hide) {
      component.root.display = 'none';
    }

    if (options.theme) {
      css.add(component.root, 'theme' + '-' + options.theme);
    }
  }

  /**
   * [get description]
   * @param  {?} name [description]
   * @return {?}      [description]
   */
  get (name) {
    if (name) return this.component[name]
    else return this.component
  }
}

function classify (element, options) {
  css.add(element, options.prefix + '-' + options.class);

  if (options.name) {
    css.add(element, options.class + '-' + options.name);
  }

  if (options.type) {
    //css.add(element, options.class + '-' + options.type)
    css.add(element, 'type-' + options.type);
  }

  if (options.color) {
    css.add(element, options.color + '-color');
  }

  if (options.css) {
    css.add(element, options.css);
  }

  if (options.elevation) {
    css.add(element, 'elevation-z' + options.elevation);
  }

  if (options.name) {
    // console.log('name', options.name)
    element.dataset.name = options.name;
  }

  if (options.label) {
    element.title = options.label;
  }

  if (options.style) {
    var styles = options.style.split(' ');
    for (var i = 0; i < styles.length; i++) {
      css.add(element, 'style-' + styles[i]);
    }
  }

  if (options.theme) {
    element.classList.add(options.theme + '-theme');
  }
}

function create (options) {
  var element = document.createElement(options.tag || 'div');

  classify(element, options);

  return element
}

function create$2 (tag, className) {
  tag = tag || 'div';

  var element = document.createElement(tag);
  css.add(element, className);

  return element
}

const KEYCODE = {
  ENTER: 13,
  SPACE: 32
};

var control = {
  /**
   * [toggle description]
   * @return {Object} The class instance
   */
  toggle () {
    if (this.disabled) return

    this.focus();

    if (this.checked) {
      this.check(false);
    } else {
      this.check(true);
    }

    return this
  },

  /**
   * Set checkbox value
   * @param {boolean} value [description]
   */
  check (checked) {
    if (checked) {
      css.add(this.root, 'is-checked');
      this.element.input.checked = true;
      this.checked = true;
      this.emit('change', this.checked);
    } else {
      css.remove(this.root, 'is-checked');
      this.element.input.checked = false;
      this.checked = false;
      this.emit('change', this.checked);
    }
    return this
  },

  /**
   * [initLabel description]
   * @return {?} [description]
   */
  label (label) {
    if (!label) return

    this.element = this.element || {};

    if (!this.element.label) {
      this.element.label = create$2('label', this.options.class + '-label');
    }

    this.element.label.textContent = label;

    insert(this.element.label, this.root);
  },

  /**
   * [_initIcon description]
   * @param  {string} type
   * @return {string}
   */
  icon (icon) {
    if (!icon) return

    var position = 'top';
    if (this.options.type === 'text-icon') {
      position = 'bottom';
    }

    this.element = this.element || {};

    this.element.icon = create$2('i', this.options.class + '-icon');
    insert(this.element.icon, this.root, position);

    this.element.icon.innerHTML = icon;
  },

  /**
   * [initLabel description]
   * @return {?} [description]
   */
  error (error) {
    error = error || this.options.error;
    if (this.options.error === null) return

    let text = this.options.error || this.options.text;

    if (!this.element.error) { this.element.error = create$2('error', this.options.class + '-error'); }

    if (text) {
      this.element.error.textContent = text;
    }

    insert(this.element.error, this.root, 'bottom');
  },

  disable () {
    this.disabled = true;

    this.element.input.setAttribute('disabled', 'disabled');
    css.add(this.root, 'is-disabled');
    return this
  },

  enable () {
    this.disabled = false;

    this.element.input.removeAttribute('disabled');
    css.remove(this.root, 'is-disabled');
    return this
  },

  keydown (e) {
    if (e.altKey) return

    switch (e.keyCode) {
      case KEYCODE.ENTER:
      case KEYCODE.SPACE:
        e.preventDefault();
        this.toggle(e);
        break
      default:
        break
    }
  },

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   * @return {Object} The class instance
   */
  get (prop) {
    switch (prop) {
      case 'name':
        this.getName();
        break
      // case 'value':
      //   this.setValue(prop)
      //   break
      // case 'label':
      //   this.setLabel(prop)
      //   break
      default:
        this.setValue(prop);
    }

    return this
  },

  getName () {
    return this.root.dataset.name
  },

  /**
   * [_onInputFocus description]
   * @return {?} [description]
   */
  focus () {
    if (this.disabled === true) return this

    css.add(this.root, 'is-focused');
    if (this.element.input !== document.activeElement) { this.element.input.focus(); }
    return this
  },

  /**
   * [_onInputBlur description]
   * @return {?} [description]
   */
  blur () {
    css.remove(this.root, 'is-focused');
    return this
  }
};

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
function _isArray (object) {
  return Object.prototype.toString.call(object) === '[object Array]'
}

/**
 * Checks if javascript object is plain object
 * @param {Object} object
 * @returns {*|boolean}
 * @private
 */
function _isLiteralObject (object) {
  return object && typeof object === 'object' && Object.getPrototypeOf(object) === Object.getPrototypeOf({})
}

/**
 * Checks if object is iterable
 * @param {Object} object
 * @returns {boolean}
 * @private
 */
function _isIterable (object) {
  var r = _isLiteralObject(object) ||
    _isArray(object) ||
    (typeof object === 'object' &&
      object !== null &&
      object.length !== undefined);

  return r
}

/**
 *
 * @param {Object} object
 * @param {Function} callback
 * @private
 */
function _each (object, callback) {
  if (_isArray(object) || (typeof object === 'object' && object.length !== undefined)) {
    for (var i = 0, l = object.length; i < l; i++) {
      callback.apply(object[i], [object[i], i]);
    }
    return
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

/**
 * Element style related methods
 * @module component/style
 */
function get (element, style) {
  // console.log('get', element, style);
  // get array of elements
  if (_isArray(style)) {
    var css = {};
    for (var i in list) {
      css[list[i]] = this.get(element, list[i]);
    }
    return css
  } else {
    var computedStyle;

    if (typeof window.getComputedStyle === 'function') { // normal browsers
      computedStyle = window.getComputedStyle(element);
    } else if (typeof document.currentStyle !== undefined) { // other browsers
      computedStyle = element.currentStyle;
    } else {
      computedStyle = element.style;
    }

    if (style) {
      return computedStyle[style]
    } else {
      return computedStyle
    }
  }
}

/**
 * set element style
 * @param { ? } element [description]
 * @param {?} style   [description]
 */
function set$1 (element, style) {
  if (_isIterable(element) && _isLiteralObject(style)) {
    _each(element, function (e) {
      set$1(e, style);
    });
    return element
  }

  if (_isLiteralObject(style)) {
    // console.log('style', element, style);
    for (var i in style) {
      element.style[i] = style[i];
    }
    return style
  }

  return false
}

var style = { get, set: set$1 };

'use strict';

/**
 * Element style related methods
 * @module component/style
 */
function offset (element, prop) {
  var rect = element.getBoundingClientRect();

  var offset = {
    top: Math.round(rect.top),
    right: Math.round(rect.right),
    bottom: Math.round(rect.bottom),
    left: Math.round(rect.left),
    width: rect.width ? Math.round(rect.width) : Math.round(element.offsetWidth),
    height: rect.height ? Math.round(rect.height) : Math.round(element.offsetHeight)
  };

  // css width and height
  if (offset.width <= 0) {
    offset.width = parseFloat(style.get(element, 'width'));
  }
  if (offset.height <= 0) {
    offset.height = parseFloat(style.get(element, 'height'));
  }

  if (prop) {
    return offset[prop]
  } else {
    return offset
  }
}

const defaults$2 = {
  transition: '.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
  opacity: ['1', '.3']
};

/**
 * init ripple
 * @param  {?} container [description]
 * @return {?}           [description]
 */
function init (instance) {
  instance.on('built', (container) => {
    set(container);
  });
}

/**
 * this function set the event listener
 * @param {HTMLElement} container [description]
 */
function set (container) {
  container.addEventListener('mousedown', (e) => {
    show(e);
  });
}

/**
 * show method
 * @param  {event} e The event related to the the touch
 * @param  {Object} coord
 * @return {void}
 */
function show (e) {
  // console.log('show', e);
  var container = e.target;
  var offs = offset(container);

  let ripple = create$2('div', 'material-ripple');
  let end = coordinate(offs);
  let initial = {
    left: (e.offsetX || offs.width / 2) + 'px',
    top: (e.offsetY || offs.height / 2) + 'px'
  };

  ripple.style.left = initial.left;
  ripple.style.top = initial.top;
  //ripple.style.opacity = defaults.opacity[1]
  ripple.style.transition = defaults$2.transition;

  insert(ripple, container, 'top');

  setTimeout(() => {
    // console.log('style coord', end);
    ripple.style.left = end.left;
    ripple.style.top = end.top;
    ripple.style.width = end.size;
    ripple.style.height = end.size;
    //ripple.style.opacity = defaults.opacity[1]
  }, 1);

  document.body.onmouseup = () => {
    destroy$1(ripple);
  };
}

/**
 * this method hides the given ripple
 * @return {Object} Size and position
 */
function destroy$1 (ripple) {
  if (ripple.parentNode) { ripple.style.opacity = '0'; }

  document.body.onmouseup = null;

  setTimeout(() => {
    if (ripple.parentNode) { ripple.parentNode.removeChild(ripple); }
  }, 1000);
}

/**
 * Get ripple final coordinates
 * @return {Object} Size and position
 */
function coordinate (o) {
  var size = o.width;
  var top = -o.height / 2;

  if (o.width > o.height) {
    top = -(o.width - o.height / 2);
  }

  return {
    size: (size * 2) + 'px',
    top: top + 'px',
    left: (size / -2) + 'px'
  }
}

/**
 * extract.f extract a function from a string using dot
 * @param  {string} func A string representing a function accessible in dot notation
 * @return {function}      The function
 */
function f(instance, func) {
  if (!func) return

  if (typeof func === 'function') {
    return func
  } else if (!func.match(/\./)) return instance[func]
  var iteration;

  var keys = func.split('.');
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];

    iteration = iteration || instance;
    iteration = iteration[key];
  }

  return iteration
}

/**
 * extract.e extract a event and the context
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function e(instance, ev) {
  if (!ev) return instance
  else if (!ev.match(/\./)) return instance[ev]
  var iteration;
  var obj = {};
  var element;

  var keys = ev.split('.');
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];

    iteration = iteration || instance;
    iteration = iteration[key];

    if (i === keys.length - 2) {
      element = iteration;
    }
  }

  obj.element = element;
  obj.name = keys[keys.length - 1];
  return obj
}

var extract = { e, f };

'use strict';

var attach = {
  attach: function (events) {
    events = events || this.options.events;
    if (!events) return

    // console.log('attach', events, this)
    var instance = this;
    events.map((def) => {
      // console.log('map', def)

      var e = extract.e(instance, def[0]);
      var f = extract.f(instance, def[1]);

      e.element.addEventListener(e.name, f.bind(this));
    });

    return this
  }
};

'use strict';

const defaults$1 = {
  prefix: 'material',
  class: 'button',
  tag: 'button',
  events: [
    ['root.click', 'handleClick']
  ]
};

/**
 * Class that represents a button
 * @class
 * @since 0.0.1
 * @example
 * var button = new Button({
 *   label: 'Button raised',
 *   type: 'raised',
 *   color: 'primary'
 * }).on('click', function(e) {
 *   console.log('button click', e);
 * }).insert(document.body);
 */
class Button {
  /**
   * The init method of the Button class
   * @param  {Object} options [description]
   * @private
   * @return {Object} The class instance
   */
  constructor (options) {
    this.init(options);
    this.build();
    this.setup();
    this.attach();

    this.emit('ready');

    return this
  }

  /**
   * [init description]
   * @param  {?} options [description]
   * @return {?}         [description]
   */
  init (options) {
    this.options = Object.assign({}, defaults$1, options || {});
    Object.assign(this, control, emitter, attach, init);

    this.element = this.element || {};

    // init module
    init(this);

    this.emit('init');
  }

  /**
   * Build button's method
   * @override
   * @return {void}
   */
  build () {
    this.element = {};

    this.root = create(this.options);

    this.options.label = this.options.label || this.options.text;

    this.root.setAttribute('aria-label', this.options.label || this.options.name);

    this.label(this.options.label);
    this.icon(this.options.icon);

    if (this.options.container) {
      insert(this.root, this.options.container);
    }

    this.emit('built', this.root);

    return this
  }

  /**
   * insert method
   * @param  {?} container [description]
   * @param  {?} context   [description]
   * @return {?}           [description]
   */
  insert (container, context) {
    insert(this.root, container, context);

    return this
  }

  /**
   * [setup description]
   * @return {?} [description]
   */
  setup () {
    this.element.input = this.root;

    if (this.options.name) {
      this.root.dataset.name = this.options.name;
    }

    // if (this.options.label) {
    //   this.root.title = this.options.label
    // }

    if (this.options.content) {
      this.root.innerHTML = this.options.content;
    }
  }

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   * @return {Object} The class instance
   */
  set (prop, value) {
    switch (prop) {
      case 'disabled':
        this.disable(value);
        break
      case 'value':
        this.setValue(value);
        break
      case 'label':
        this.setLabel(value);
        break
      default:
        this.setValue(prop);
    }

    return this
  }

  /**
   * [_onElementMouseDown description]
   * @param  {event} e
   * @return {void}
   */
  handleClick (e) {
    e.preventDefault();

    if (this.disabled === true) return
    if (this.options.upload) return

    // this.publish('click');
    this.emit('click', e);

    return this
  }
}

'use strict';

const defaults$4 = {
  prefix: 'material',
  class: 'button',
  tag: 'button',
  events: [
    ['root.click', 'handleClick']
  ]
};

/**
 * Class that represents a button
 * @class
 * @since 0.0.1
 * @example
 * var button = new Button({
 *   label: 'Button raised',
 *   type: 'raised',
 *   color: 'primary'
 * }).on('click', function(e) {
 *   console.log('button click', e);
 * }).insert(document.body);
 */
class Button$2 {
  /**
   * The init method of the Button class
   * @param  {Object} options [description]
   * @private
   * @return {Object} The class instance
   */
  constructor (options) {
    this.init(options);
    this.build();
    this.setup();
    this.attach();

    this.emit('ready');

    return this
  }

  /**
   * [init description]
   * @param  {?} options [description]
   * @return {?}         [description]
   */
  init (options) {
    this.options = Object.assign({}, defaults$4, options || {});
    Object.assign(this, control, emitter, attach, init);

    this.element = this.element || {};

    // init module
    init(this);

    this.emit('init');
  }

  /**
   * Build button's method
   * @override
   * @return {void}
   */
  build () {
    this.element = {};

    this.root = create(this.options);

    this.options.label = this.options.label || this.options.text;

    this.root.setAttribute('aria-label', this.options.label || this.options.name);

    this.label(this.options.label);
    this.icon(this.options.icon);

    if (this.options.container) {
      insert(this.root, this.options.container);
    }

    this.emit('built', this.root);

    return this
  }

  /**
   * insert method
   * @param  {?} container [description]
   * @param  {?} context   [description]
   * @return {?}           [description]
   */
  insert (container, context) {
    insert(this.root, container, context);

    return this
  }

  /**
   * [setup description]
   * @return {?} [description]
   */
  setup () {
    this.element.input = this.root;

    if (this.options.name) {
      this.root.dataset.name = this.options.name;
    }

    // if (this.options.label) {
    //   this.root.title = this.options.label
    // }

    if (this.options.content) {
      this.root.innerHTML = this.options.content;
    }
  }

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   * @return {Object} The class instance
   */
  set (prop, value) {
    switch (prop) {
      case 'disabled':
        this.disable(value);
        break
      case 'value':
        this.setValue(value);
        break
      case 'label':
        this.setLabel(value);
        break
      default:
        this.setValue(prop);
    }

    return this
  }

  /**
   * [_onElementMouseDown description]
   * @param  {event} e
   * @return {void}
   */
  handleClick (e) {
    e.preventDefault();

    if (this.disabled === true) return
    if (this.options.upload) return

    // this.publish('click');
    this.emit('click', e);

    return this
  }
}

var iconBack = `
<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0h24v24H0z" fill="none" />
  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
</svg>`;

var iconForward = `
<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0h24v24H0z" fill="none" />
  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
</svg>`;

'use strict';

const defaults$3 = {
  prefix: 'material',
  class: 'calendar',
  target: '.week-day',
  functions: ['newEvent'],
  rangedays: 7,
  months: ['January', 'February', 'Mars', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  days: ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday'],
  mode: 'view',
  range: [8, 18],
  display: 'three',
  weekend: [0, 1],
  events: [
    ['root.dblclick', 'add']
  ]
};

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
class Calendar {
  /**
   * init
   * @return {Object} The class options
   */
  constructor (options) {
    this.options = Object.assign({}, defaults$3, options || {});

    this.init();
    this.build();
    this.attach();

    return this
  }

  /**
   * [_initView description]
   * @return  Class instance
   */
  init (options) {
    // assign modules
    Object.assign(this, emitter, attach);

    // init function
    this._initFunction(this.options.functions);

    this.date = this.options.date || new Date();

    this.firstDay = this.getFirstDayOfWeek(this.date);

    this.firstDay.setHours(0);
    this.firstDay.setMinutes(0);
    this.firstDay.setSeconds(0);

    return this
  }

  /**
   * getMonday
   * @param  {Date} d
   * @return {Date}
   */
  getFirstDayOfWeek (d) {
    d = new Date(d);
    var day = d.getDay();
    var diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday

    return new Date(d.setDate(diff))
  }

  /**
   * [_initFunction description]
   * @param  {?} functions [description]
   * @return {?}           [description]
   */
  _initFunction (functions) {
    functions = functions || [];

    for (var i = 0; i < functions.length; i++) {
      var name = functions[i];
      if (this.options[name]) {
        this[name] = this.options[name];
      }
    }
  }

  /**
   * [_initList description]
   * @param  {Object} options this class options
   * @return {Object} The class instance
   */
  build () {
    // define main tag
    var tag = this.options.tag || 'div';

    this.root = create$2(tag, this.options.prefix + '-' + this.options.class);

    this.buildWeek();

    if (this.options.container) {
      insert(this.root, this.options.container);
    }

    return this
  }

  /**
   * [buildWeek description]
   * @return {[type]} [description]
   */
  buildWeek () {
    this.buildHeader();
    this.buildAllDay();
    this.buildBody();

    this.body.scrollTop = 480;

    return this
  }

  /**
   * [buildHeader description]
   * @return {[type]} [description]
   */
  buildHeader () {
    this.header = create$2('header');
    insert(this.header, this.root);

    this.buildHeadline();

    var element = create$2('div');
    insert(element, this.header);
    css.add(element, 'header-days');

    var date = new Date(this.firstDay);
    var days = this.options.rangedays;

    var margin = create$2('div');
    css.add(margin, 'margin');
    insert(margin, element);

    for (var i = 0; i < days; i++) {
      var dow = this.options.days[date.getDay()];
      var dom = (date.getMonth() + 1) + '/' + date.getDate();

      var cell = create$2('div');
      cell.innerHTML = '<div class="first">' + dow + '</div><div class="second">' + dom + '</div>';
      css.add(cell, 'date');
      insert(cell, element);

      date.setDate(date.getDate() + 1);
    }
  }

  /**
   * [buildHeadline description]
   * @return {?} [description]
   */
  buildHeadline () {
    this.headline = create$2('div', this.options.class + '-headline');

    insert(this.headline, this.header);

    var year = this.firstDay.getFullYear();

    var month = this.options.months[this.firstDay.getMonth()];

    var monthIndex = create$2('div', 'month-year');
    monthIndex.innerHTML = '<b>' + month + '</b> ' + year;
    insert(monthIndex, this.headline);

    this.buildNavigation();
  }

  /**
   * [buildNavigation description]
   * @return {?} [description]
   */
  buildNavigation () {
    var navigation = create$2('div', this.options.prefix + '-toolbar');
    insert(navigation, this.headline);

    var back = new Button$2({
      icon: iconBack,
      style: 'dense'
    }).on('click', () => {
      this.back();
    }).insert(navigation);

    css.add(back.root, 'compact');

    var today = new Button$2({
      style: 'dense',
      label: 'today'
    }).on('click', () => {
      this.goto();
    }).insert(navigation);

    css.add(today.root, 'compact');

    var next = new Button$2({
      icon: iconForward,
      style: 'dense'
    }).on('click', () => {
      this.next();
    }).insert(navigation);

    css.add(next.root, 'compact');
  }

  /**
   * [_initAllDay description]
   * @param  {?} head [description]
   * @return {?}      [description]
   */
  buildAllDay () {
    var allday = create$2('div', 'allday');
    insert(allday, this.header);

    var dow = new Date(this.firstDay);
    var days = this.options.rangedays;

    var label = create$2('label', 'label');
    label.innerHTML = 'all-day';
    insert(label, allday);

    for (var i = 0; i < days; i++) {
      var day = create$2('div', 'date');
      day.setAttribute('data-date', this.dateToString(dow));
      insert(day, allday);

      dow.setDate(dow.getDate() + 1);
    }
  }

  /**
   * [_initBody description]
   * @param  {?} content [description]
   * @return {?}         [description]
   */
  buildBody () {
    var cells = [];

    var firstDay = this.firstDay;

    var days = this.options.rangedays;

    this.body = create$2('div');
    css.add(this.body, this.options.class + '-body');
    insert(this.body, this.root);

    var hours = create$2('div');
    css.add(hours, 'hours');
    insert(hours, this.body);

    this.initCanvas();

    for (var i = 0; i < 24; i++) {
      var hour = create$2('div');
      css.add(hour, 'hour');
      insert(hour, hours);

      hour.innerHTML = i + ':00';
    }

    var sday = new Date(firstDay);
    for (var k = 0; k < days; k++) {
      var day = create$2('div');
      css.add(day, 'week-day');
      day.setAttribute('data-date', this.dateToString(sday));
      insert(day, this.body);

      sday.setDate(sday.getDate() + 1);
    }

    this.cells = cells;

    // content.scrollTop = 460;
  }

  /**
   * _dateToString
   * @param  {Date} d
   * @return {Date}
   */
  dateToString (d) {
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    var date = year + '-' + month + '-' + day;

    return date
  }

  /**
   * [_initCanvas description]
   * @param  {?} content [description]
   * @return {?}         [description]
   */
  initCanvas () {
    var canvas = create$2('canvas');
    css.add(canvas, 'canvas');
    canvas.width = '2000';
    canvas.height = '1440';
    insert(canvas, this.body);

    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#dedbdb';

    var offset = 6;

    for (var j = 0; j <= 24; j++) {
      ctx.beginPath();

      if (j < this.options.range[0] - 1 || j > this.options.range[1] - 1) {
        ctx.strokeStyle = '#F2F2F2';
      } else {
        ctx.strokeStyle = '#D9D9D9';
      }

      var y = j * 60 + 0.5;

      ctx.moveTo(0, y + 60 + offset);
      ctx.lineTo(2000, y + 60 + offset);
      ctx.stroke();
    }
  }

  /**
   * [onSelect description]
   * @param  {?} e [description]
   * @return {?}   [description]
   */
  add (e) {
    if (e.target && e.target.matches(this.options.target)) {
      var data = e.target.getAttribute('data-date');

      var d = data.split(/-/);

      var time = this.roundTime(e.offsetY / 60);

      var h = parseInt(time);
      var m = (time - h) * 60;

      var date = new Date(d[0], d[1], d[2], h, m);

      this.emit('add', date);
    }
  }

  /**
   * [roundTime description]
   * @param  {?} value [description]
   * @return {?}       [description]
   */
  roundTime (value) {
    var step = 0.5;
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv
  }

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   */
  set (prop, value, options) {
    console.log('set calendart', prop, value);
    switch (prop) {
      case 'week':
        this.setWeek(value, options);
        break
      default:
        this.setWeek(value, options);
    }

    return this
  }

  /**
   * Set list
   * @param {Array} list List of info object
   * @return {Object} The class instance
   */
  setWeek (data) {
    this.buildWeek(data);
    return this
  }

  /**
   * next
   * @return {void}
   */
  next () {
    this.firstDay.setDate(this.firstDay.getDate() + this.options.rangedays);

    this.root.innerHTML = '';

    this.buildWeek();
  }

  /**
   * back
   * @return {void}
   */
  back () {
    this.firstDay.setDate(this.firstDay.getDate() - this.options.rangedays);

    this.root.innerHTML = '';

    this.buildWeek();
  }

  /**
   * [goto description]
   * @param  {?} date [description]
   * @return {?}      [description]
   */
  goto (date) {
    date = date || new Date();

    this.firstDay = this.getFirstDayOfWeek(this.date);
    this.root.innerHTML = '';

    this.buildWeek();
  }

  newEvent (date) {
    // console.log('new Event', date);
  }

  empty () {
    console.log('empty');
    this.root.innerHTML = '';
  }
}

'use strict';

var insert$2 = {

  /**
   * [insert description]
   * @param  {?} container [description]
   * @param  {?} context   [description]
   * @param  {?} debug     [description]
   * @return {?}           [description]
   */
  insert (container, context) {
    var element = this.root;

    this.insertElement(element, container, context);

    return this
  },

  /**
   * [insertElement description]

   * @param  {?} element   [description]
   * @param  {?} container [description]
   * @param  {?} context   [description]
   * @param  {?} debug     [description]
   * @return {?}           [description]
   */
  insertElement (element, container, context) {
    if (container && container.root) {
      container = container.root;
    }

    this.container = container;

    // if (debug) {
    // console.log('insert', container);
    // }

    // this.emit('insert');

    context = context || 'bottom';

    var contexts = ['top', 'bottom', 'after', 'before'];
    var methods = ['prepend', 'append', 'after', 'before'];

    var index = contexts.indexOf(context);
    if (index === -1) {
      return
    }

    var method = methods[index];

    // this.emit('insert');

    // insert component element to the dom tree using Dom
    // console.log('dom', method, element);
    dom[method](container, element);
    // this.emit('injected');
    //
    return element
  }
};

'use strict';

// import modules
let defaults$5 = {
  prefix: 'material',
  class: 'card',
  tag: 'div'
};

class Card {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.init(options);
    this.build();
  }

  init (options) {
    this.options = Object.assign({}, defaults$5, options || {});
    Object.assign(this, insert$2);
  }

  /**
   * build the component using the super method
   * @return {Object} The class instance
   */
  build () {
    this.root = create(this.options);

    if (this.options.layout) {
      this.layout = new Layout(this.options.layout, this.root);
    }
  }
}

var events = {

  /**
   * cross browser addEvent
   * @param {string}   event The event to add
   * @param {Function} fn    [description]
   */
  addEvent (event, fn) {
    var element = this.root;
    // avoid memory overhead of new anonymous functions for every event handler that's installed
    // by using local functions
    function listenHandler (e) {
      var ret = fn.apply(this, arguments);
      if (ret === false) {
        e.stopPropagation();
        e.preventDefault();
      }
      return (ret)
    }

    function attachHandler () {
      // set the this pointer same as addEventListener when fn is called
      // and make sure the event is passed to the fn also so that works the same too
      var ret = fn.call(element, window.event);
      if (ret === false) {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
      }
      return (ret)
    }

    if (element.addEventListener) {
      element.addEventListener(event, listenHandler, false);
    } else {
      element.attachEvent('on' + event, attachHandler);
    }

    return this
  },

  /**
   * cross browser removeEvent
   * @param  {string}   event The event to remove
   * @param  {Function} fn    [description]
   * @return {Object}         [description]
   */
  removeEvent (event, fn) {
    var element = this.root;

    if (element.removeEventListener) {
      element.removeEventListener(event, fn, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + event, element[fn.toString() + event]);
      element[fn.toString() + event] = null;
    } else {
      element['on' + event] = function () {};
    }

    return this
  }
};

'use strict';

const defaults$6 = {
  prefix: 'material',
  class: 'component',
  tag: 'span'
};

/**
 * Base class for all ui components
 * @class
 * @param {Object} options - The component options
 * @return {Object} The class Instance
 */

/**
 * Class representing a UI Container. Can add components.
 *
 * @extends Component
 * @return {parent} The class instance
 * @example new Container({
 *   container: document.body
 * });
 */
class Component {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.init(options);
    this.build();

    return this
  }

  /**
   * init method
   * @param  {Object} Options
   * @return {Object} Instance
   */
  init (options) {
    this.options = Object.assign({}, defaults$6, options || {});

    Object.assign(this, emitter, events, insert$2);

    return this
  }

  /**
   * Build Method
   * @return {Object} This class instance
   */
  build () {
    this.root = create(this.options);

    if (this.options.container) {
      this.insert(this.options.container);
    }

    return this
  }
}

'use strict';

const defaults$7 = {
  prefix: 'material',
  class: 'container',
  tag: 'div'
};

/**
 * Class representing a UI Container. Can add components.
 *
 * @extends Component
 * @return {parent} The class instance
 * @example new Container({
 *   container: document.body
 * });
 */
class Container {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    // init and build
    this.init(options);
    this.build();

    return this
  }

  /**
   * Init class
   * @params {Object} options The instance options
   * @return {Object} This class instance
   */
  init (options) {
    this.options = Object.assign({}, defaults$7, options || {});
    Object.assign(this, emitter);

    return this
  }

  /**
   * [build description]
   * @return {Object} This class  instance
   */
  build () {
    this.root = create(this.options);

    if (this.options.container) {
      insert(this.root, this.options.container);
    }

    return this
  }

  insert (container, context) {
    insert(this.root, container, context);
    return this
  }
}

function label (root, text, options) {
  text = text || null;

  var prefix = options.class || options.prefix;

  var label = create$2('label', prefix + '-label');
  label.textContent = text;
  label.setAttribute('for', options.name);
  insert(label, root);

  return label
}

'use strict';

function init$1 (element, attribute) {
  for (var key in attribute) {
    if (attribute.hasOwnProperty(key)) {
      element.setAttribute(key, attribute[key]);
    }
  }

  return element
}

function set$2 (element, name, value) {
  return element.setAttribute(name, '' + value)
}

function get$1 (element, name) {
  return element.getAttribute(name) || null
}

function remove$2 (element, name) {
  return element.removeAttribute(name)
}

var attribute = { init: init$1, set: set$2, get: get$1, remove: remove$2 };

function isObject (object) {
  return object &&
    typeof object === 'object' &&
    Object.getPrototypeOf(object) === Object.getPrototypeOf({})
}

function process (string) {
  const tags = string.match(/^[\w-]+/);
  const ids = string.match(/#([\w-]+)/);
  const classes = string.match(/\.[\w-]+/g);
  const names = string.match(/\$([\w-]+)/);

  const properties = {
    tag: tags ? tags[0] : 'div'
  };

  if (ids) properties.id = ids[1];
  if (names) properties.name = names[1];

  if (classes) {
    properties.class = classes
      .join(' ')
      .replace(/\./g, '');
  }

  return properties
}

function build (schema, container, object, level) {
  let element;
  object = object || {};

  for (var i = 0; i < schema.length; i++) {
    if (typeof schema[i] === 'string') {
      var property = process(schema[i]);
      element = create$2(property.tag, property.class);
      insert(element, container);

      if (property.name) { object[property.name] = element; }
    } else if (isObject(schema[i])) {
      attribute.init(element, schema[i]);
    } else if (Array.isArray(schema[i])) {
      build(schema[i], element, object, level);
    }
  }

  return object
}

var icon = `
<svg width="18px" height="18px" class="checkbox-icon" viewBox="0 0 18 18">
  <polygon class="checkbox-check" points="7 14.42 2 9.42 3.41 8.01 7 11.59 14.59 4 16 5.42"></polygon>
</svg>`;

'use strict';

let defaults$8 = {
  prefix: 'material',
  class: 'checkbox',
  type: 'control',
  // modules: [events, control, emitter, attach],
  build: ['$root.material-checkbox', {},
    ['input$input', {}],
    ['span$control.checkbox-control']
  ],
  events: [
    ['element.control.click', 'click', {}],
    ['element.label.click', 'toggle', {}],
    // for accessibility purpose
    // ['element.input.click', 'toggle', {}],
    ['element.input.focus', 'focus'],
    ['element.input.blur', 'blur'],
    ['element.input.keydown', 'keydown', {}]
  ]
};
/**
 * Checkbox control class
 * @class
 * @extends Control
 * @since 0.0.1
 * @example
 * var chkbox = checkbox({
 *   label: 'Primary raised button',
 *   type: 'raised',
 *   primary: true
 * }).on('click', function(e) {
 *   console.log('button click', e);
 * }).insert(document.body);
 */
class Checkbox {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.init(options);
    this.build();
    this.attach();

    return this
  }

  /**
   * Constructor
   * @param  {Object} options The class options
   * @return {Object} This class instance
   */
  init (options) {
    this.options = Object.assign({}, defaults$8, options || {});
    Object.assign(this, events, control, emitter, attach);

    return this
  }

  /**
   * build the component using the super method
   * @return {Object} The class instance
   */
  build () {
    this.element = build(this.options.build);
    this.root = this.element.root;

    this.element.control.innerHTML = icon;

    var text = this.options.text || this.options.label;

    this.element.label = label(this.root, text, this.options);

    this.element.input.setAttribute('type', 'checkbox');
    this.element.input.setAttribute('name', this.options.name);
    this.element.input.setAttribute('aria-label', this.options.name);

    if (this.options.value) {
      this.element.input.setAttribute('value', this.options.value);
    }

    if (this.options.disabled) {
      this.disabled = this.options.disabled;
      this.element.input.setAttribute('disabled', 'disabled');
      css.add(this.root, 'is-disabled');
    }

    if (this.options.checked) {
      this.check(true);
    }

    if (this.options.value) {
      this.set('value', this.value);
    }

    // insert if container options is given
    if (this.options.container) {
      insert(this.root, this.options.container);
    }

    return this
  }

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   * @return {Object} The class instance
   */
  set (prop, value) {
    switch (prop) {
      case 'checked':
        this.check(value);
        break
      case 'value':
        this.setValue(value);
        break
      case 'label':
        this.setLabel(value);
        break
      default:
        this.check(prop);
    }

    return this
  }

  /**
   * [insert description]
   * @param  {?} container [description]
   * @param  {?} context   [description]
   * @return {?}           [description]
   */
  insert (container, context) {
    insert(this.root, container, context);

    return this
  }

  /**
   * [click description]
   * @param  {event} e [description]
   * @return {?}   [description]
   */
  click (e) {
    this.toggle(e);
    this.element.input.focus();

    return this
  }

  /**
   * Set checkbox value
   * @param {boolean} value [description]
   */
  setValue (value) {
    console.log('setValue', value);
    this.value = value;
    this.element.input.setAttribute('value', value);

    return this
  }
}

'use strict';

let instance = null;

/**
 *
 */
class Controller {
  /**
   * Setting up block level variable to store class state
   * , set's to null by default.
   * credits: http://amanvirk.me/singleton-classes-in-es6/
   */
  constructor () {
    if (!instance) {
      instance = this;
    }

    this.components = this.components || [];
    this.component = this.component || {};

    this.init();

    return instance
  }

  init () {
    this.subscribe('settings', (message) => {
      // console.log('settings', message);
      // this.setSettings(message.key, message.value);
    });
  }

  // setSettings(key, value) {
  //   var text = Cookies.get(key);

  //   var current = {};

  //   if (text) {
  //     current = JSON.parse(text);
  //   }

  //   console.log('settings value', current, value);
  //   //settings = [settings, value].reduce(Object.assign, {});
  //   var settings = merge(current, value);

  //   console.log('settings ' + key, settings);

  //   Cookies.set(key, JSON.stringify(settings));

  // }

  // getSettings(key) {
  //   var json = Cookies.get(key);

  //   if (!json) {
  //     return null;
  //   }
  //   var value = JSON.parse(json);

  //   console.log('settings' + key, value);

  //   return value;

  // }

  /**
   * [register description]
   * @param  {component} component [description]
   * @return {Object} The class instance
   */
  register (component) {
    this.components.push(component);

    this.component[component.name] = this.component[component.name] || [];

    this.component[component.name].push(component);

    return this
  }

  /**
   * This method subscribes to a specific topic
   * @param  {string}   topic
   * @param  {Function} callback
   * @return {boolean} true
   */
  subscribe (topic, callback) {
    this._topics = this._topics || {};

    // _log.debug('subscribe', topic);
    if (!this._topics.hasOwnProperty(topic)) {
      this._topics[topic] = [];
    }

    this._topics[topic].push(callback);
    return true
  }

  /**
   * This method unsubscribes to a specific topic
   * @param  {string}   topic
   * @param  {Function} callback
   * @return {boolean} true
   */
  unsunscribe (topic, callback) {
    this._topics = this._topics || {};
    // _log.debug('unsubscribe', topic);
    if (!this._topics.hasOwnProperty(topic)) {
      return false
    }

    for (var i = 0, len = this._topics[topic].length; i < len; i++) {
      if (this._topics[topic][i] === callback) {
        this._topics[topic].splice(i, 1);
        return true
      }
    }

    return false
  }

  /**
   * [publish description]
   * @return {?} [description]
   */
  publish () {
    this._topics = this._topics || {};

    var args = Array.prototype.slice.call(arguments);
    var topic = args.shift();
    // _log.debug('publish', topic);
    if (!this._topics.hasOwnProperty(topic)) {
      return false
    }

    for (var i = 0, len = this._topics[topic].length; i < len; i++) {
      this._topics[topic][i].apply(undefined, args);
    }
    return true
  }
}

var controller = new Controller();

var event = {

  /**
   * cross browser addEvent
   * @param {string}   event The event to add
   * @param {Function} fn    [description]
   */
  add (element, event, fn) {
    // check if element is a compoenent
    element = element.root || element;

    // avoid memory overhead of new anonymous functions for every event handler that's installed
    // by using local functions
    function listenHandler (e) {
      var ret = fn.apply(this, arguments);
      if (ret === false) {
        e.stopPropagation();
        e.preventDefault();
      }
      return (ret)
    }

    function attachHandler () {
      // set the this pointer same as addEventListener when fn is called
      // and make sure the event is passed to the fn also so that works the same too
      var ret = fn.call(element, window.event);
      if (ret === false) {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
      }
      return (ret)
    }

    if (element.addEventListener) {
      element.addEventListener(event, listenHandler, false);
    } else {
      element.attachEvent('on' + event, attachHandler);
    }

    return this
  },

  /**
   * cross browser removeEvent
   * @param  {string}   event The event to remove
   * @param  {Function} fn    [description]
   * @return {Object}         [description]
   */
  remove (element, event, fn) {
    element = element.root || element;

    if (element.removeEventListener) {
      element.removeEventListener(event, fn, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + event, element[fn.toString() + event]);
      element[fn.toString() + event] = null;
    } else {
      element['on' + event] = function () {};
    }

    return this
  }
};

'use strict';

// dialog related modules
let defaults$9 = {
  prefix: 'material',
  class: 'dialog',
  tag: 'div',
  events: [
    ['root.click', 'close']
  ]
};

class Dialog {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.init(options);
    this.build();
    this.attach();

    this.root.style.display = 'none';

    return this
  }

  /**
   * Constructor
   * @param  {Object} options The class options
   * @return {Object} This class instance
   */
  init (options) {
    // init options
    this.options = Object.assign({}, defaults$9, options || {});

    // implement modules
    Object.assign(this, events, emitter, attach, insert$2);

    this.controller = controller;

    return this
  }

  /**
   * build the component using the super method
   * @return {Object} The class instance
   */
  build () {
    this.root = document.createElement('div');

    css.add(this.root, 'material-dialog');
    if (this.options.css) {
      css.add(this.root, this.options.css);
    }

    if (this.options.theme) {
      css.add(this.root, this.options.theme + '-theme');
    }

    this.surface = document.createElement('div');

    css.add(this.surface, 'dialog-surface');

    this.insertElement(this.surface, this.root);

    if (this.options.title) {
      this.buildTitle();
    }

    if (this.options.content) {
      this.buildContent();
    }

    this.buildActions();

    event.add(this.surface, 'click', function (ev) {
      ev.stopPropagation();
    });
  }

  buildTitle () {
    this.title = new Text({
      type: 'title',
      css: 'dialog-title',
      text: this.options.title
    });

    this.insertElement(this.title.root, this.surface);
  }

  buildContent () {
    if (typeof this.options.content === 'string') {
      this.content = new Text({
        type: 'content',
        css: 'dialog-content',
        text: this.options.content
      });

      this.insertElement(this.content.root, this.surface);
    } else if (_isArray(this.options.content)) {
      this.content = new Layout(this.options.content, this.surface);
    }
  }

  buildActions () {
    if (this.options.actions) {
      this.actions = new Layout(this.options.actions, this.surface);

      css.add(this.actions.get('root'), 'dialog-actions');
    } else {
      var actions;
      if (this.options.accept || this.options.cancel) {
        actions = new Toolbar({ css: 'dialog-actions' });
        this.insertElement(actions.root, this.surface);
      }

      if (this.options.cancel) {
        this.cancel = new Button(this.options.cancel)
        .on('click', () => {
          this.emit('canceled');
          this.close();
        });
        this.insertElement(this.cancel.root, actions.root);
      }

      if (this.options.accept) {
        this.accept = new Button(this.options.accept)
        .on('click', () => {
          this.emit('accepted');
          this.close();
        });
        this.insertElement(this.accept.root, actions.root);
      }
    }
  }

  close () {
    css.add(this.root, 'dialog-closing');

    var delayMillis = 200; // 1 second
    setTimeout(() => {
      this.root.style.display = 'none';
      css.remove(this.root, 'dialog-closing');
      css.remove(this.root, 'dialog-show');
    }, delayMillis);

    this.previousActive.focus();
  }

  show () {
    this.previousActive = document.activeElement;

    this.root.style.display = 'flex';
    // css.add(this.root, 'dialog-showing');

    var delayMillis = 100; // 1 second

    setTimeout(() => {
      css.add(this.root, 'dialog-show');
      // css.remove(this.root, 'dialog-showing');
    }, delayMillis);

    // var button = this.root.querySelector('button')

    // if (button) button.focus()
  }
}

'use strict';

var defaults$10 = {
  prefix: 'material',
  class: 'divider',
  tag: 'span'
};

/**
 * this class component represent an divider usually in a list
 *
 * @class
 * @extends {Component}
 * @return {Object} The class instance
 * @example new Item(object);
 */
class Divider {
  /**
   * init
   * @return {Object} The class options
   */
  constructor (options) {
    this.init(options);
    this.build();

    return this
  }

  /**
   * [init description]
   * @param  {?} options [description]
   * @return {?}         [description]
   */
  init (options) {
    this.options = Object.assign({}, defaults$10, options || {});

    Object.assign(this, insert$2);
  }

  /**
   * Build function for item
   * @return {Object} This class instance
   */
  build () {
    this.root = create(this.options);

    if (this.options.text) {
      this.root.textContent = this.options.text;
    }

    if (this.options.container) {
      this.insert(this.options.container);
    }
  }
}

function init$2 (instance) {
  // assign modules
  modules(instance);

  controller.register(instance);

  return instance
}

function modules (instance) {
  var modules = instance.options.modules;

  for (var i = 0; i < modules.length; i++) {
    if (typeof modules[i] === 'function') {
      modules[i](instance);
    } else {
      Object.assign(instance, modules[i]);
    }
  }
}

'use strict';

const defaults$11 = {
  prefix: 'material',
  class: 'drawer',
  modifier: 'width',
  state: 'closed',
  position: 'left',
  tag: 'div',
  width: '340',
  modules: [emitter, events]
};

/**
 * Class representing a UI Container. Can add components.
 *
 * @extends Component
 * @return {parent} The class instance
 * @example new Container({
 *   container: document.body
 * });
 */
class Drawer {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.options = Object.assign({}, defaults$11, options || {});

    init$2(this);

    this.build();
    this.attach();

    this.emit('ready');

    return this
  }

  /**
   * Build Method
   * @return {Object} This class instance
   */
  build () {
    this.wrapper = create$2('div');

    classify(this.wrapper, this.options);

    this.root = create$2('aside');

    css.add(this.root, 'drawer-panel');

    insert(this.root, this.wrapper);

    if (this.options.position) {
      css.add(this.root, 'position-' + this.options.position);
    }

    if (this.options.fixed) {
      this.wrapper.classList.add('is-fixed');
    }

    if (this.options.size) {
      if (this.options.position === 'top' || this.options.position === 'bottom') {
        this.root.style = 'height: ' + this.options.size + 'px;';
      } else {
        this.root.style = 'width: ' + this.options.size + 'px;';
      }
    }

    if (this.options.container) { insert(this.wrapper, this.options.container); }

    this.emit('built', this.root);

    return this
  }

  attach () {
    this.wrapper.addEventListener('click', (e) => {
      console.log(' click close');
      this.close();
    });
  }
  /**
   * [toggle description]
   * @return {Object} The class instance
   */
  toggle () {
    // console.log('toggle', this.root);
    if (this.wrapper.classList.contains('show')) {
      this.close();
    } else {
      this.open();
    }

    return this
  }

  /**
   * [minimize description]
   * @return {Object} The class instance
   */
  close () {
    // console.log('close');
    css.remove(this.wrapper, 'show');
    // css.remove(this.underlay, 'show')

    return this
  }

  /**
   * [normalize description]
   * @return {Object} The class instance
   */
  open () {
    // console.log('open');

    css.add(this.wrapper, 'show');

    return this
  }

  /**
   * [insert description]
   * @param  {?} container [description]
   * @return {?}           [description]
   */
  insert (container, context) {
    insert(this.wrapper, container, context);

    return this
  }
}

'use strict';

const defaults$12 = {
  prefix: 'material',
  class: 'form',
  tag: 'div',
  controls: ['textfield', 'checkbox', 'slider', 'switch']
};

/**
 * Form class
 *
 * @class
 * @return {Class} This class instance
 */
class Form {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.options = Object.assign({}, defaults$12, options || {});

    this.init();
    this.build();
    this.attach();

    return this
  }

  /**
   * Initialize View
   * @return {void}
   */
  init () {
    // init intanciate name

    // implement module
    Object.assign(this,
      emitter,
      attach,
      insert
    );

    this.document = window.document;
    this.controller = controller;

    // need to remove the options template to have a reference
    if (this.options.render) {
      this.render = this.options.render;
    }

    // this.key = {};

    return this
  }

  /**
   * [_initForm description]
   * @return {Object} This class instance
   */
  build () {
    var tag = this.options.tag || 'div';

    this.root = document.createElement(tag);
    css.add(this.root, this.options.prefix + '-' + this.options.class);

    // complete layout options
    this.options.root = this.root;

    this.layout = new Layout(this.options.layout, this.root);

    this._initControls(this.layout.controls);

    return this
  }

  insert (container, context) {
    insert(this.root, container, context);

    return this
  }

  /**
   * [_initControls description]
   * @param  {?} controls [description]
   * @return {?}          [description]
   */
  _initControls (controls) {
    if (!controls) return

    this.key = this.key || {};

    for (var i = 0; i < controls.length; i++) {
      var control = controls[i];
      // control.setAttribute('data-key', control.name);

      this.key[control.name] = control;

      control.on('change', function (/* value */) {
        // console.log('change', this.name, value);
      });
    }
  }

  /**
   * [_onSubmit description]
   * @return {void}
   */
  _onSubmit (e) {
    e.preventDefault();
  }

  /**
   * [initControl description]
   * @param  {?} key     [description]
   * @param  {?} section [description]
   * @return {?}         [description]
   */
  initControl (key, section) {
    var name = key.name || 'undefined';

    var control = this.render(key);

    if (control) {
      this.key[name] = control;
      control.insert(section);
      control.addEvent('keyup', function () {
        // console.log('change', name, control.get('value'));
      });

      control.setAttribute('data-key', name);
    }
    return this
  }

  /**
   * Getter
   *
   * @param {string} prop
   * @param {string} value
   * @return {Object|void}
   */
  set (prop, value) {
    switch (prop) {
      case 'info':
        return this.setInfo(value)
      case 'schema':
        return this.setSchema(value)
      default:
        return this.setInfo(prop)
    }
  }

  /**
   * [setInfo description]
   * @param {?} info [description]
   */
  setInfo (info) {
    this.info = this.original = info;

    this.parseInfo(info);
  }

  /**
   * [parseInfo description]
   * @param  {?} obj  [description]
   * @param  {?} name [description]
   * @param  {?} i    [description]
   * @return {?}      [description]
   */
  parseInfo (obj, name, i) {
    // console.log('parseInfo', obj, name, 'level ' + i);
    var level = i || 0;
    level = level + 1;
    var key;

    if (obj instanceof Object) {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          // recursive call to scan property
          var n = null;
          if (name) {
            n = name + '.' + key;
          } else {
            n = key;
          }

          this.parseInfo(obj[key], n, level);
        }
      }
    } else {
      if (this.key[name] && this.key[name].set) {
        this.key[name].set(obj);
      }
    }
  }

  /**
   * Getter
   *
   * @param {string} prop
   * @param {string} value
   * @return {Object|void}
   */
  get (prop, value) {
    switch (prop) {
      case 'key':
        return this.getValue(value)
      case 'info':
        return this.getInfo()
      case 'original':
        return this.original
      case 'options':
        return this.options
      default: // default will replace the old method see up
        return this.getInfo()
    }
  }

  // /**
  //  * Get Value for the given key
  //  * @param  {string} name defined in dot notation
  //  * @param  {Object} info
  //  * @return {Mixin} The Value of the given key
  //  */
  // getValue(name, info) {
  //   var keys = name.split(/\./);
  //   var value = null;

  //   if (!name || !info) {
  //     return;
  //   }

  //   //_log.debug('getValueFromKey', name, info);

  //   if (keys.length === 1) {
  //     value = info[keys[0]];
  //   }
  //   if (keys.length === 2 && info[keys[0]]) {
  //     if (info[keys[0]]) {
  //       value = info[keys[0]][keys[1]];
  //     }
  //   }
  //   if (keys.length === 3) {
  //     if (info[keys[0]]) {
  //       if (info[keys[0]][keys[1]]) {
  //         value = info[keys[0]][keys[1]][keys[2]];
  //       }
  //     }
  //   }

  //   return value;
  // }

  getInfo () {
    return this.info
  }
}

'use strict';

'use strict';

'use strict';

var defaults$15 = {
  prefix: 'material',
  class: 'item',
  type: 'default',
  types: {
    default: 'span',
    display4: 'h1',
    display3: 'h1',
    display2: 'h1',
    display1: 'h1',
    headline: 'h1',
    title: 'h2',
    subheading2: 'h3',
    subheading1: 'h4',
    body: 'p',
    body2: 'aside',
    caption: 'span'
  }
};

/**
 * The class represents an item ie for list
 *
 * @class
 * @return {Object} The class instance
 * @example new Item(object);
 */
class Item {
  /**
   * init
   * @return {Object} The class options
   */
  constructor (options) {
    this.init(options);
    this.build();

    return this
  }

  /**
   * [init description]
   * @param  {?} options [description]
   * @return {?}         [description]
   */
  init (options) {
    // merge options
    this.options = Object.assign({}, defaults$15, options || {});

    // define class

    // assign modules
    Object.assign(this, insert$2);
  }

  /**
   * Build function for item
   * @return {Object} This class instance
   */
  build () {
    // define main tag
    this.options.tag = this.options.types[this.options.type];

    this.root = create(this.options);

    if (this.options.text) {
      this.set(this.options.text);
    }

    if (this.options.layout) {
      this.layout = new Layout(this.options.layout, this.root);
    } else {
      if (this.options.container) {
        this.insert(this.options.container);
      }
    }
  }

  /**
   * Get or set text value of the element
   * @param {string} value The text to set
   * @returns {*}
   */
  set (value) {
    if (value) {
      if (this.root.innerText) {
        this.root.innerText = value;
      } else {
        this.root.textContent = value;
      }

      return this
    }

    return this
  }
}

'use strict';

const defaults$16 = {
  prefix: 'material',
  class: 'list',
  functions: ['render', 'select'],
  target: '.material-item',
  events: [
    ['root.click', 'handleSelect']
  ]
};

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
class List {
  /**
   * init
   * @return {Object} The class options
   */
  constructor (options) {
    this.options = Object.assign({}, defaults$16, options || {});

    this.init(this.options);
    this.build(this.options);
    this.attach(this.options.events);

    return this
  }

  /**
   * [_initView description]
   * @return  Class instance
   */
  init () {
    this.filters = [];
    this.data = [];
    this.items = [];

    // assign modules
    Object.assign(this, emitter, attach);

    // init function
    this._initFunction(this.options.functions);

    return this
  }

  /**
   * [_initFunction description]
   * @param  {?} functions [description]
   * @return {?}           [description]
   */
  _initFunction (functions) {
    for (var i = 0; i < functions.length; i++) {
      var name = functions[i];
      if (this.options[name]) {
        this[name] = this.options[name];
      }
    }
  }

  /**
   * [_initList description]
   * @param  {Object} options this class options
   * @return {Object} The class instance
   */
  build (options) {
    // define main tag
    var tag = this.options.tag || 'div';

    this.root = document.createElement(tag);
    css.add(this.root, 'material-' + this.options.class);

    if (options.name) {
      css.add(this.root, options.class + '-' + options.name);
    }

    if (this.options.list) {
      this.set('list', this.options.list);
    }

    if (this.options.container) {
      insert(this.root, this.options.container);
    }

    // this.root.addEventListener("click", function(e) {
    //   // console.log("list", this, e);
    //   // e.target was the clicked element
    // });

    return this
  }

  /**
   * [onSelect description]
   * @param  {?} e [description]
   * @return {?}   [description]
   */
  handleSelect (e) {
    // console.log('onSelect', e.target, this.options.target);
    if (e.target && e.target.matches(this.options.target)) {
      // console.log("item clicked: ", e.target);
      css.remove(this.item, 'is-selected');
      css.add(e.target, 'is-selected');

      this.select(e.target, e, this.item);
      this.item = e.target;
    }
  }

  /**
   * select
   * @param  {Element} item  [description]
   * @param  {event} event The caller event
   * @return        [description]
   */
  select (item, e, selected) {
    this.emit('select', item);
  }

  /**
   * [render description]
   * @param  {?} info [description]
   * @return {?}      [description]
   */
  render (info) {
    var item;

    if (info.type === 'divider') {
      item = new Divider();
    } else {
      item = new Item({
        name: info.name,
        text: info.text || info.name
      });
    }

    return item
  }

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   */
  set (prop, value, options) {
    switch (prop) {
      case 'list':
        this.setList(value, options);
        break
      default:
        this.setList(prop, options);
    }

    return this
  }

  /**
   * Set list
   * @param {Array} list List of info object
   * @return {Object} The class instance
   */
  setList (list) {
    for (var i = 0; i < list.length; i++) {
      this.addItem(this.render(list[i]), i);
    }

    return this
  }

  /**
   * [add description]
   * @param {Object} item [description]
   */
  addItem (item /*, index */) {
    if (!item) {
      return
    }

    var where = 'bottom';
    insert(item.root, this.root, where);

    this.items.push(item);

    return item
  }

  insert (container, context) {
    insert(this.root, container, context);
  }

  empty () {
    this.root.innerHTML = '';
    this.items = [];
    this.item = null;
  }

  /**
   * Reverse the list order
   * @return {Object} The class instance
   */
  reverse () {
    this.list.reverse();
    this.update(this.list);

    return this
  }
}

'use strict';

const defaults$17 = {
  prefix: 'material',
  class: 'menu',
  tag: 'div',
  events: [
    ['root.click', 'hide'],
    ['mask.click', 'hide']
  ]
};

/**
 * This Class represents a menu.
 *
 * @return {parent} The class instance
 * @example new Container({
 *   container: document.body
 * });
 */
class Menu {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.init(options);
    this.build();
    this.setup();

    this.attach();

    this.emit('ready');

    return this
  }

  /**
   * [init description]
   * @return {[type]} [description]
   */
  init (options) {
    this.options = Object.assign({}, defaults$17, options || {});

    Object.assign(this, emitter, events, attach, insert);
  }

  /**
   * Build Method
   * @return {Object} This class instance
   */
  build () {
    this.root = create$2(this.options.tag, this.options.css);
    this.mask = create$2(this.options.tag, this.options.class + '-mask');

    if (this.options.position) {
      this.root.style.position = this.options.position;
    }

    classify(this.root, this.options);

    if (this.options.list) {
      this.list = new List({
        // root: this.root,
        list: this.options.list,
        target: '.material-item',
        height: 600,
        label: 'Flat',
        select: (item) => {
          this.selected = item;
          this.hide();
        }
      }).insert(this.root);
    }

    this.emit('built', this.root);

    return this
  }

  insert () {
    insert(this.mask, document.body);
    insert(this.root, document.body);
  }

  setup () {
    // this.subscribe('click', () => {
    //   console.log('click');
    //   this.close();
    // });
    //
    window.addEventListener('resize', () => this.position());
  }

  show (e) {
    css.add(this.mask, 'mask-show');

    if (e) this.caller = e.target;

    css.add(this.root, this.options.class + '-show');
    this.position(this.caller);
  }

  position () {
    if (!this.caller) return
    var offs = offset(this.caller);

    var offsw = this.offset = offset(this.root);

    // console.log('offset')
    // console.log('caller', this.caller, offs, screen.width)

    this.root.style.top = offs.top + 'px';
    this.root.style.left = offs.left - offsw.width + offs.width + 'px';
    // this.root.style.right = offs.right + offs.width + offsw.width  + 'px'
  }

  hide () {
    // console.log('hide')
    css.remove(this.root, this.options.class + '-show');
    css.remove(this.mask, 'mask-show');
  }
}

'use strict';

// import Component from './component';
var defaults$18 = {
  prefix: 'material',
  class: 'progress',
  tag: 'div',
  progress: '0%',
  circular: `<svg class="progress" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>`
};

/**
 * The class represents an item ie for list
 *
 * @class
 * @return {Object} The class instance
 * @example new Item(object);
 */
class Spinner {
  /**
   * init
   * @return {Object} The class options
   */
  constructor (options) {
    this.init(options);
    this.build();

    return this
  }

  /**
   * [init description]
   * @param  {?} options [description]
   * @return {?}         [description]
   */
  init (options) {
    // merge options
    this.options = Object.assign({}, defaults$18, options || {});

    // define class

    // assign modules
    Object.assign(this, insert);
  }

  /**
   * Build function for item
   * @return {Object} This class instance
   */
  build (options) {
    this.root = create$2(this.options.tag);
    classify(this.root, this.options);

    if (this.options.type === 'circular') {
      this.root.innerHTML = this.options.circular;
    } if (this.options.type === 'indeterminate') {
      this.bar = create$2('div', 'bar');
      insert(this.bar, this.root);
    } else {
      this.bar = create$2('div', 'bar');
      insert(this.bar, this.root);

      this.set(this.options.progress);
    }

    if (this.options.container) {
      insert(this.root, this.options.container);
    }

    return this
  }

  set (progress) {
    this.bar.setAttribute('style', 'width: ' + progress);
  }
}

var icon$1 = `
<svg width="24px" class="slider-pin" height="32px" viewBox="0 0 24 32">
  <path d="M12.4799395,31.9994146 C12.4799395,31.9994146 24,18.0312233 24,11.6159251 C24,5.2006268 18.627417,0 12,0 C5.372583,0 0,5.2006268 0,11.6159251 C0,18.0312233 12.4799395,31.9994146 12.4799395,31.9994146 Z"></path>
</svg>`;

'use strict';

let defaults$19 = {
  prefix: 'material',
  class: 'slider',
  type: 'control',
  label: null,
  checked: false,
  error: false,
  value: false,
  range: [0, 100],
  step: 5,
  modules: [events, control, emitter, attach],
  mixins: [],
  build: ['$root.material-slider', {},
    ['label$label.slider-label', {}],
    ['input$input'],
    ['$control.slider-control', {},
      ['$track.slider-track', {},
        ['canvas$canvas.slider-canvas', {}],
        ['$trackvalue.slider-track-value', {}],
        ['$knob.slider-knob', {}],
        ['$marker.slider-marker', {},
          ['$value.slider-value', {}]
        ]
      ]
    ]
  ],
  events: [
    ['element.input.focus', 'focus'],
    ['element.input.blur', 'blur']
  ]
};

/**
 * Switch class
 * @class
 * @extends Control
 */
class Slider {
  /**
   * init
   * @return {Object} The class options
   */
  constructor (options) {
    this.options = Object.assign({}, defaults$19, options || {});

    this.init(this.options);
    this.build(this.options);
    this.attach();

    return this
  }

  /**
   * Constructor
   * @param  {Object} options The class options
   * @return {Object} This class instance
   */
  init (options) {
    init$2(this);

    return this
  }

  /**
   * build method
   * @return {Object} The class instance
   */
  build () {
    this.element = build(this.options.build);
    this.root = this.element.root;

    classify(this.root, this.options);

    if (this.options.container) {
      insert(this.root, this.options.container);
    }

    var value = this.element.marker.innerHTML;
    this.element.marker.innerHTML = icon$1 + value;

    if (this.options.type) {
      css.add(this.root, 'type-' + this.options.type);
    }

    // init input
    if (this.options.disabled) {
      this.disable(true);
    }

    // if (this.options.name) {
    //   this.root.dataset.name = name
    //   this.element.input.name = name
    // }

    // init text
    let text = this.options.label || this.options.text;
    this.element.label.textContent = text;

    this.options.label = this.options.label || this.options.text;

    this.initTrack();

    var delay = 50;

    setTimeout(() => {
      this.initCanvas();
    }, delay);
  }

  initCanvas () {
    window.addEventListener('resize', () => {
      console.log('resize');
      this.drawCanvas();
    }, false);
    this.drawCanvas();
  }

  drawCanvas () {
    var width = offset(this.element.track, 'width');
    var height = offset(this.element.track, 'height');

    this.element.canvas.width = width;
    this.element.canvas.height = height;

    var context = this.element.canvas.getContext('2d');
    context.lineWidth = 2;
    context.beginPath();

    context.moveTo(0, (height / 2) + 1);
    context.lineTo(width, (height / 2) + 1);
    context.strokeStyle = 'rgba(34, 31, 31, .26)';
    context.stroke();
  }

  /**
   * [buildControl description]
   * @return {?} [description]
   */
  initTrack () {
    this.element.track.addEventListener('mousedown', (ev) => {
      if (this.disabled === true) return
      this.initTrackSize();
      var position = ev.layerX;
      this.update(position);
    });

    this.element.knob.addEventListener('click', (ev) => {
      ev.stopPropagation();
    });

    this.initDragging();

    var delay = 100;

    setTimeout(() => {
      this.setValue(this.options.value);
    }, delay);
  }

  initTrackSize () {
    this._tracksize = offset(this.element.track, 'width');
    this._knobsize = offset(this.element.knob, 'width');
    this._markersize = 32; /* offset(this.element.marker, 'width') */
    this._trackleft = offset(this.element.track, 'left');
    return this
  }

  /**
   * [initDragging description]
   * @return {?} [description]
   */
  initDragging () {
    this.element.knob.onmousedown = (e) => {
      if (this.disabled === true) return

      e.stopPropagation();
      e = e || window.event;

      css.add(this.element.control, 'dragging');

      var start = 0;
      var position = 0;

      if (e.pageX) start = e.pageX;
      else if (e.clientX) start = e.clientX;

      start = this._trackleft;
      document.body.onmousemove = (e) => {
        if (this.disabled === true) return
        console.log('mousedown', this.disabled);

        e = e || window.event;
        var end = 0;
        if (e.pageX) end = e.pageX;
        else if (e.clientX) end = e.clientX;

        position = end - start;
        this.update(position);
      };
      document.body.onmouseup = (e) => {
        document.body.onmousemove = document.body.onmouseup = null;

        e = e || window.event;
        var end = 0;
        if (e.pageX) end = e.pageX;
        else if (e.clientX) end = e.clientX;

        position = end - start;
        this.update(position);
        css.remove(this.element.control, 'dragging');
      };
    };
  }

  update (position) {
    var size = this._tracksize;
    var range = this.options.range[1] - this.options.range[0];

    if (position > size) {
      position = size;
    }

    if (position < 0) {
      position = 0;
    }

    var ratio = (size / position);
    var value = Math.round((range / ratio)) + this.options.range[0];

    if (position === 0) {
      css.remove(this.element.knob, 'notnull');
    }

    this.element.knob.style.left = position - this._knobsize / 2 + 'px';
    this.element.trackvalue.style.width = (position) + 'px';
    this.element.marker.style.left = position - this._markersize / 2 + 'px';

    this.element.value.textContent = value;

    this.element.input.value = value;
    if (value > this.options.range[0]) {
      css.add(this.element.knob, 'notnull');
    } else {
      css.remove(this.element.knob, 'notnull');
    }
  }

  updateValue (value) {
    this.initTrackSize();

    var size = offset(this.element.track, 'width');
    size = parseInt(size);

    var range = this.options.range[1] - this.options.range[0];
    var ratio = value * 100 / range;
    var position = Math.round(size * ratio / 100);

    this.update(position);

    return this
  }

  /**
   * [insert description]
   * @param  {?} container [description]
   * @param  {?} context   [description]
   * @return {?}           [description]
   */
  insert (container, context) {
    insert(this.root, container, context);
  }

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   */
  set (prop, value) {
    switch (prop) {
      case 'value':
        this.setValue(value);
        break
      case 'label':
        this.setLabel(value);
        break
      default:
        this.setValue(prop);
    }

    return this
  }

  /**
   * Getter
   * @param {string} prop
   * @param {string} value
   */
  get (prop) {
    var value;

    switch (prop) {
      case 'value':
        value = this.getValue();
        break
      case 'name':
        value = this.name;
        break
      default:
        return this.getValue()
    }

    return value
  }

  /**
   * [getValue description]
   * @return {Object} The class instance
   */
  getValue () {
    return this.element.input.value
  }

  /**
   * [setValue description]
   * @param {string} value [description]
   */
  setValue (value) {
    value = value || this.options.range[0];
    this.element.input.value = value;
    this.updateValue(value);
  }

  /**
   * [setLabel description]
   * @param {?} text [description]
   */
  setLabel (text) {
    text = text || this.options.label || this.options.text;

    if (text !== null && this.label) {
      this.label.textContent = text;
    }
  }
}

'use strict';

// import modules
let defaults$20 = {
  prefix: 'material',
  class: 'snackbar',
  delay: 2000,
  theme: 'dark'
};

class Snackbar {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.options = Object.assign({}, defaults$20, options || {});

    this.init();
    this.build();
    this.show();
  }

  init () {
    Object.assign(this, insert$2);
  }

  /**
   * build the component using the super method
   * @return {Object} The class instance
   */
  build () {
    var tag = this.options.tag || 'div';

    this.root = create$2(tag);
    classify(this.root, this.options);

    this.layout = new Layout(this.options.layout, this.root);
  }

  /**
   *
   * @return {[type]} [description]
   */
  show () {
    setTimeout(() => {
      this.root.classList.add('show');
    }, 10);

    if (this.options.delay) {
      setTimeout(() => {
        this.hide();
      }, this.options.delay);
    }
  }

  hide () {
    this.root.classList.remove('show');
  }
}

'use strict';

// import control from '../control';
let defaults$21 = {
  prefix: 'material',
  class: 'switch',
  type: 'control',
  label: null,
  checked: false,
  error: false,
  value: false,
  disabled: false,
  build: ['$root.material-switch', {},
    ['input$input$switch-input', { type: 'checkbox' }],
    ['span$control.switch-control', {},
      ['span$track.switch-track', {},
        ['span$knob.switch-knob', {}]
      ]
    ],
    ['label$label.switch-label']
  ],
  events: [
    ['element.control.click', 'toggle'],
    ['element.label.click', 'toggle'],
    // for accessibility purpose
    ['element.input.click', 'toggle'],
    ['element.input.focus', 'focus'],
    ['element.input.blur', 'blur']
    // ['element.input.keydown', 'keydown']
  ]
};

/**
 * Switch class
 * @class
 * @extends Control
 */
class Switch {
  /**
   * Constructor
   * @param  {Object} options
  - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.init(options);
    this.build();
    this.attach();

    return this
  }

  /**
   * Constructor
   * @param  {Object} options The class options
   * @return {Object} This class instance
   */
  init (options) {
    this.options = Object.assign({}, defaults$21, options || {});
    Object.assign(this, emitter, control, attach, insert$2);

    this.value = this.options.value;

    return this
  }

  /**
   * build method
   * @return {Object} The class instance
   */
  build () {
    this.element = build(this.options.build);
    this.root = this.element.root;

    classify(this.root, this.options);

    if (this.options.disabled) {
      this.disable();
    }

    if (this.value) {
      this.element.input.setAttribute('checked', 'checked');
    }

    this.element.input.setAttribute('aria-label', this.options.name);

    let text = this.options.label || this.options.text || '';

    this.element.label.textContent = text;
    this.element.label.setAttribute('for', this.options.name);
    if (this.options.checked) {
      this.check(true);
    }

    if (this.options.container) {
      this.insert(this.options.container);
    }
  }

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   * @return {Object} The class instance
   */
  set (prop, value) {
    switch (prop) {
      case 'value':
        this.setValue(value);
        break
      case 'disabled':
        if (value === true) {
          this.disable();
        } else if (value === false) {
          this.enable();
        }
        break
      default:
        this.setValue(prop);
    }

    return this
  }

  get () {
    return this.value
  }

  /**
   * set switch value
   * @param {boolean} value [description]
   */
  getValue () {
    return this.value
  }

  /**
   * set switch value
   * @param {boolean} value [description]
   */
  setValue (value) {
    if (value) {
      this.check();
    } else {
      this.unCheck();
    }
  }
}

'use strict';

const defaults$22 = {
  prefix: 'material',
  class: 'tabs',
  tag: 'div',
  indicator: {
    prefix: 'material',
    class: 'indicator',
    tag: 'div'
  }
};

class Tabs {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.init(options);
    this.build();

    return this
  }

  init (options) {
    this.options = Object.assign({}, defaults$22, options || {});
    Object.assign(this, insert$2, emitter);
  }

  /**
   * Build Method
   * @return {Object} This class instance
   */
  build () {
    this.root = create(this.options);

    if (this.options.list) {
      this.list = new List({
        // root: this.root,
        list: this.options.list,
        target: '.material-button',
        height: 600,
        label: 'Flat',

        render: (info) => {
          var item;

          item = new Button$2({
            name: info.name,
            text: info.text || info.name
          });

          return item
        },
        select: (item) => {
          console.log('click');
          this.selected = item;
          this.click(item);
        }
      }).insert(this.root);
    }

    this.indicator = create(this.options.indicator);
    this.insertElement(this.indicator, this.root);

    if (this.options.container) {
      this.insert(this.options.container);
    }

    return this
  }

  click (item) {
    var or = offset(this.root);
    var o = offset(item);
    this.indicator.setAttribute('style', 'width: ' + o.width + 'px; left: ' + (o.left - or.left) + 'px;');
    this.emit('select', item.dataset.name);
  }
}

'use strict';

var defaults$23 = {
  prefix: 'material',
  class: 'text',
  type: 'default',
  types: {
    default: 'span',
    display4: 'h1',
    display3: 'h1',
    display2: 'h1',
    display1: 'h1',
    headline: 'h1',
    title: 'h2',
    subheading2: 'h3',
    subheading1: 'h4',
    body: 'p',
    body2: 'aside',
    caption: 'span'
  }
};

/**
 * this class creates a text component
 *
 * @since 0.0.6
 * @category Element
 * @param {HTMLElement} element Related element
 * @param {String} className the className to add
 *  grouped values.
 * @returns {HTMLElement} The modified element
 * @example
 *
 * var text = new Text({
 *   text: 'hello',
 *   type: 'title'
 * }).insert(document.body);
 *
 * // => Hello
 */
class Text {
  /**
   * init
   * @return {Object} The class options
   */
  constructor (options) {
    this.init(options);
    this.build();

    return this
  }

  init (options) {
    this.options = Object.assign({}, defaults$23, options || {});

    Object.assign(this, insert$2);
  }

  /**
   * Build function for item
   * @return {Object} This class instance
   */
  build () {
    this.options.tag = this.options.types[this.options.type];

    this.root = create(this.options);

    if (this.options.text) {
      this.set(this.options.text);
    }

    if (this.options.container) {
      this.insert(this.options.container);
    }
    return this
  }

  /**
   * Get or set text value of the element
   * @param {string} value The text to set
   * @returns {*}
   */
  set (value) {
    if (value) {
      if (this.root.innerText) {
        this.root.innerText = value;
      } else {
        this.root.textContent = value;
      }

      return this
    }

    return this
  }
}

var focus = {
  /**
   * focus method
   * @return {?} [description]
   */
  focus () {
    if (this.disabled === true) return this

    css.add(this.root, 'is-focused');
    if (this.element.input !== document.activeElement) { this.element.input.focus(); }
    return this
  },

  /**
   * blur method
   * @return {?} [description]
   */
  blur () {
    css.remove(this.root, 'is-focused');
    return this
  }
};

'use strict';

var defaults$24 = {
  prefix: 'material',
  class: 'textfield',
  type: 'control',
  tag: 'div',
  events: [
    // 'change': '_onChange',
    ['element.input.focus', 'focus'],
    ['element.input.blur', 'blur'],
    // ['input.keypress', '_handleInputKeyPress',
    ['element.input.keyup', '_handleInputKeyPress']
    // ['input.change', '_onChange']
    // 'input.keydown': '_handleInputKeyPress'

  ]
};

/**
 * Textfield class
 * @class
 */
class Textfield {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.options = Object.assign({}, defaults$24, options || {});

    this.init();
    this.build();
    this.attach();

    return this
  }

  /**
   * init
   * @param  {Object} options The class options
   * @return {Object} The class instance
   */
  init () {
    Object.assign(this, focus, emitter, attach);

    this.element = {};
    this.value = this.options.value;

    return this
  }

  /**
   * [build description]
   * @return {Object} The class instance
   */
  build () {
    // create a new div as input element
    var tag = this.options.tag || 'div';
    this.root = create$2(tag, this.options.prefix + '-' + this.options.class);

    this.buildLabel();
    this.buildInput();
    this.buildUnderline();

    if (this.disabled) {
      css.add(this.root, 'is-disabled');
    }

    // insert if container this.options is given
    if (this.options.container) {
      // console.log(this.name, opts.container);
      insert(this.root, this.options.container);
    }
  }

  buildLabel () {
    this.label = create$2('label', this.options.class + '-label');
    insert(this.label, this.root);

    if (this.options.label !== false) {
      this.setLabel();
    }
  }

  /**
   * [_initInput description]
   * @return {Object} The class instance
   */
  buildInput () {
    this.element.input = create$2('input', this.options.class + '-input');
    this.element.input.setAttribute('type', 'text');
    insert(this.element.input, this.root);

    if (!this.options.value) {
      css.add(this.root, 'is-empty');
    }

    if (this.readonly) {
      this.element.input.setAttribute('readonly', 'readonly');
      this.element.input.setAttribute('tabindex', '-1');
    }

    return this.element.input
  }

  /**
   * _initUnderline
   * @return {Object} The class instance
   */
  buildUnderline () {
    this.underline = create$2('span', this.options.class + '-underline');
    insert(this.underline, this.root);
  }

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   */
  set (prop, value) {
    switch (prop) {
      case 'value':
        this.setValue(value);
        break
      case 'label':
        this.setLabel(value);
        break
      case 'disabled':
        if (value === true) {
          this.disable();
        } else if (value === false) {
          this.enable();
        }
        break
      default:
        this.setValue(prop);
    }

    return this
  }

  /**
   * [buildLabel description]
   * @return {Object} The class instance
   */
  setLabel (label) {
    label = label || this.options.label;
    var text;

    if (label === null || label === false) {
      text = '';
    } else if (this.options.label) {
      text = label;
    } else {
      text = this.options.name;
    }

    this.label.textContent = text;
  }


  disable () {
    this.disabled = true;

    this.element.input.setAttribute('disabled', 'disabled');
    css.add(this.root, 'is-disabled');
    return this
  }

  enable () {
    this.disabled = false;

    this.element.input.removeAttribute('disabled');
    css.remove(this.root, 'is-disabled');
    return this
  }


  /**
   * Getter
   * @param {string} prop
   * @param {string} value
   */
  get (prop) {
    var value;

    switch (prop) {
      case 'value':
        value = this.getValue();
        break
      case 'name':
        value = this.name;
        break
      default:
        return this.getValue()
    }

    return value
  }

  /**
   * [getValue description]
   * @return {Object} The class instance
   */
  getValue () {
    // console.log('getValue', this);
    return this.element.input.value
  }

  /**
   * [setValue description]
   * @param {string} value [description]
   */
  setValue (value) {
    this.element.input.value = value;

    if (value) {
      css.remove(this.root, 'is-empty');
    } else {
      css.add(this.root, 'is-empty');
    }

    this.emit('change', value);
  }

  /**
   * Setter for the state of the component
   * @param {string} state active/disable etc...
   */
  setState (state) {
    if (this.state) {
      css.remove(this.root, 'state-' + this.state);
    }

    if (state) {
      css.add(this.root, 'state-' + state);
    }

    this.state = state;
    this.emit('state', state);

    return this
  }

  /**
   * [_initValue description]
   * @return {Object} The class instance
   */
  _initValue () {
    var opts = this.options;

    // create a new div as input element
    if (opts.value) {
      this.setValue(opts.value);
    }
  }

  /**
   * [_onFocus description]
   * @return {Object} The class instance
   */
  _handleInputKeyPress (e) {
    // console.log('_handleInputKeyPress', e);

    if (this.get('value') === '') {
      css.add(this.root, 'is-empty');
    } else {
      css.remove(this.root, 'is-empty');
    }

    this.emit('change', this.getValue());
  }

  /**
   * [setError description]
   * @param {string} error Error description
   */
  setError (error) {
    if (error) {
      this.addClass('field-error');
      if (this.error) { this.error.set('html', error); }
    } else {
      if (this.error) { this.removeClass('field-error'); }
      if (this.error) { this.error.set('html', ''); }
    }
  }

  insert (container, context) {
    insert(this.root, container, context);
  }
}

'use strict';

const defaults$25 = {
  prefix: 'material',
  class: 'toolbar',
  tag: 'header'
};

class Toolbar {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.init(options);
    this.build();
    this.attach();
    return this
  }

  init (options) {
    this.options = Object.assign({}, defaults$25, options || {});
    Object.assign(this, insert$2);

    console.log('waterfALL', this.options.waterfall);

    this.waterfall = this.options.waterfall;
  }

  /**
   * Build Method
   * @return {Object} This class instance
   */
  build () {
    this.root = create(this.options);

    console.log(this.options.height, this.options.fixed);

    if (this.options.height) {
      this.root.style.height = this.options.height + 'px';
    }

    if (this.options.fixed) {
      console.log('is-fixed');
      this.root.classList.add('is-fixed');
    }

    if (this.options.flexible) {
      this.root.classList.add('is-flexible');
    }

    // if (this.options.container) {
    //   this.insert(this.options.container)
    // }

    return this
  }

  attach () {
    this.root.addEventListener('DOMNodeInserted', (e) => {
      var textNode = e.target;
      if (textNode !== this.root) return

      var size = this.size = offset(this.root, 'height');

      var view = this.view = this.root.parentNode;

      console.log('view', view);

      var padding = window.getComputedStyle(view)['padding-top'];
      // console.log('paddingTop', padding)
      // if (!padding) padding = window.getComputedStyle(this.root.parentNode, 'padding')
      // console.log('padding', padding)

      padding = parseInt(padding, 10);
      // size = parseInt(size, 10)

      this.padding = padding;

      // console.log(' toolbar inserted in', size, 'padding', padding)
      var ptop = this.ptop = size + padding;

      // console.log('ptop', ptop)

      if (document.body == view) {
        console.log('toolbar container body');
        this.root.classList.add('toolbar-body');
      }

      view.setAttribute('style', 'padding-top: ' + ptop + 'px');

      this.scroll(view);
    });
  }

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   * @return {Object} The class instance
   */
  set (prop, value) {
    switch (prop) {
      case 'minimize':
        this.root.setAttribute('style', 'height: 64px');
        break
      case 'value':
        this.setValue(value);
        break
      case 'label':
        this.setLabel(value);
        break
      default:
        this.check(prop);
    }

    return this
  }

  scroll (view) {
    // console.log('initScroll')

    var isBody = false;

    var element = view;

    this.scrolling = view;

    if (view === document.body) {
      isBody = true;
      element = document;
      this.scrolling = document.body;
    }

    view.classList.add();

    element.addEventListener('scroll', (e) => {
      var scrollTop;
      if (isBody) {
        scrollTop = (document.documentElement ||
       document.body.parentNode ||
       document.body).scrollTop;
      } else {
        scrollTop = view.scrollTop;
      }

      if (scrollTop > 0) {
        this.root.classList.add('is-scrolled');
      } else {
        this.root.classList.remove('is-scrolled');
      }

      // console.log('scroll', scrollTop)

      this.update(e, scrollTop);
    });
  }

  update (e, scrollTop) {
    if (this.options.fixed) { this.fixed(e, scrollTop); }
    if (this.options.flexible) { this.flexible(e, scrollTop); }
  }

  flexible (e, scrollTop) {
    var size = offset(this.root, 'height');
    // console.log('flexible', size, this.root.offsetHeight, scrollTop)
    // if (scrollTop < this.size) {
    //
    var height = '64';
    if (size < height) {
      this.root.style.height = height + 'px';
    } else {
      height = this.size - scrollTop;
      if (height < 64) height = 64;
      this.root.style.height = height + 'px';
    }

    // console.log('scroll', this.root.style.top, scrollTop)

    // if (scrollTop > 50) {
    //   this.root.style.trans = scrollTop + 'px'
    // } else {
    //   this.root.style.top = scrollTop + 'px'
    // }
    // }
      // this.root.style.top = scrollTop + 'px'
      // this.root.style.height = this.size - scrollTop
    // } else {
    //   console.log('size scroll', this.size, scrollTop)

    //   this.root.style.height = this.size - scrollTop + 'px'
    //   // this.root.style.top = scrollTop + 'px'
    // }
  }

  fixed (e, scrollTop) {
    if (scrollTop > 0) {
      this.root.style.transform = 'translateY(' + scrollTop + 'px)';
    } else {
      this.root.style.transform = 'translateY(' + scrollTop + 'px)';
    }
  }

  waterfall$ (e) {}
}

'use strict';

const defaults$26 = {
  prefix: 'material',
  class: 'view',
  type: null,
  element: {
    tag: 'span',
    type: null
  }
};

/**
 * Class representing a UI Container. Can add components.
 *
 * @extends Component
 * @return {parent} The class instance
 * @example new Container({
 *   container: document.body
 * });
 */
class View {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.options = Object.assign({}, defaults$26, options || {});
    // init and build
    this.init(options);
    this.build();

    return this
  }

  /**
   * Init class
   * @params {Object} options The instance options
   * @return {Object} This class instance
   */
  init (options) {
    this.options.name = this.options.name;

    // implement modules
    Object.assign(this, emitter);

    // this.controller = controller;

    return this
  }

  /**
   * [build description]
   * @return {Object} This class  instance
   */
  build (props) {
    var tag = this.options.tag || 'div';

    this.root = create$2(tag, this.options.prefix + '-' + this.options.class);

    if (this.options.name) {
      css.add(this.root, this.options.class + '-' + this.options.name);
    }

    if (this.options.css) {
      css.add(this.root, this.options.css);
    }

    if (this.options.container) {
      // console.log(this.options.name, opts.container);
      insert(this.root, this.options.container);
    }

    return this
  }

  insert (container, context) {
    insert(this.root, container, context);
    return this
  }
}

'use strict';

var iconNavi = `
<svg height="24" viewBox="0 0 24 24" width="24">
  <path d="M0 0h24v24H0z" fill="none" />
  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
</svg>`;

var iconMore = `
<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0h24v24H0z" fill="none" />
  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
</svg>`;

// import components
const TITLE = 'Material';

console.log('layout --', document.body);

/**
 * Application Layout
 */
var layout = [
  [Toolbar, 'head', { type: 'app', display: 'flex', direction: 'horizontal', color: 'primary' },
    [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
    [Text, 'title', { css: 'pin-bottom', text: TITLE }],
    [Button, 'menu-more', { icon: iconMore, type: 'action' }]
  ],
  [Drawer, 'navi', { fixed: 1, css: 'drawer-temporary', display: 'flex', direction: 'horizontal', type: 'temporary' },
    [Toolbar, 'navi-head', { fixed: 1, flexible: 1 },
      [Button, 'menu-navi-head', { icon: iconNavi, type: 'action' }],
      [Text, 'title', { text: TITLE }]
    ],
    [List, 'navi-list', { flex: '1' }]
  ],
  [Menu, 'more-menu', { position: 'fixed' },
    [Checkbox, 'darktheme', { text: 'Dark theme' }],
    [Checkbox, 'rtl', { text: 'RTL' }]
  ],
  [View, 'main', { position: 'fixed' }]
];

var cookies = createCommonjsModule(function (module, exports) {
/*
 * Cookies.js - 1.2.4-pre
 * https://github.com/ScottHamper/Cookies
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global, undefined) {
  'use strict';

  var factory = function (window) {
    if (typeof window.document !== 'object') {
      throw new Error('Cookies.js requires a `window` with a `document` object')
    }

    var Cookies = function (key, value, options) {
      return arguments.length === 1
        ? Cookies.get(key) : Cookies.set(key, value, options)
    };

    // Allows for setter injection in unit tests
    Cookies._document = window.document;

    // Used to ensure cookie keys do not collide with
    // built-in `Object` properties
    Cookies._cacheKeyPrefix = 'cookey.'; // Hurr hurr, :)

    Cookies._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

    Cookies.defaults = {
      path: '/',
      secure: false
    };

    Cookies.get = function (key) {
      if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
        Cookies._renewCache();
      }

      var value = Cookies._cache[Cookies._cacheKeyPrefix + key];

      return value === undefined ? undefined : decodeURIComponent(value)
    };

    Cookies.set = function (key, value, options) {
      options = Cookies._getExtendedOptions(options);
      options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

      Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

      return Cookies
    };

    Cookies.expire = function (key, options) {
      return Cookies.set(key, undefined, options)
    };

    Cookies._getExtendedOptions = function (options) {
      return {
        path: options && options.path || Cookies.defaults.path,
        domain: options && options.domain || Cookies.defaults.domain,
        expires: options && options.expires || Cookies.defaults.expires,
        secure: options && options.secure !== undefined ? options.secure : Cookies.defaults.secure
      }
    };

    Cookies._isValidDate = function (date) {
      return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())
    };

    Cookies._getExpiresDate = function (expires, now) {
      now = now || new Date();

      if (typeof expires === 'number') {
        expires = expires === Infinity
          ? Cookies._maxExpireDate : new Date(now.getTime() + expires * 1000);
      } else if (typeof expires === 'string') {
        expires = new Date(expires);
      }

      if (expires && !Cookies._isValidDate(expires)) {
        throw new Error('`expires` parameter cannot be converted to a valid Date instance')
      }

      return expires
    };

    Cookies._generateCookieString = function (key, value, options) {
      key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
      key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
      value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
      options = options || {};

      var cookieString = key + '=' + value;
      cookieString += options.path ? ';path=' + options.path : '';
      cookieString += options.domain ? ';domain=' + options.domain : '';
      cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
      cookieString += options.secure ? ';secure' : '';

      return cookieString
    };

    Cookies._getCacheFromString = function (documentCookie) {
      var cookieCache = {};
      var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

      for (var i = 0; i < cookiesArray.length; i++) {
        var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

        if (cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
          cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
        }
      }

      return cookieCache
    };

    Cookies._getKeyValuePairFromCookieString = function (cookieString) {
      // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
      var separatorIndex = cookieString.indexOf('=');

      // IE omits the "=" when the cookie value is an empty string
      separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

      var key = cookieString.substr(0, separatorIndex);
      var decodedKey;
      try {
        decodedKey = decodeURIComponent(key);
      } catch (e) {
        if (console && typeof console.error === 'function') {
          console.error('Could not decode cookie with key "' + key + '"', e);
        }
      }

      return {
        key: decodedKey,
        value: cookieString.substr(separatorIndex + 1) // Defer decoding value until accessed
      }
    };

    Cookies._renewCache = function () {
      Cookies._cache = Cookies._getCacheFromString(Cookies._document.cookie);
      Cookies._cachedDocumentCookie = Cookies._document.cookie;
    };

    Cookies._areEnabled = function () {
      var testKey = 'cookies.js';
      var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
      Cookies.expire(testKey);
      return areEnabled
    };

    Cookies.enabled = Cookies._areEnabled();

    return Cookies
  };
  var cookiesExport = (global && typeof global.document === 'object') ? factory(global) : factory;

  // AMD support
  if (typeof undefined === 'function' && undefined.amd) {
    undefined(function () {
      return cookiesExport
    });
    // CommonJS/Node.js support
  } else {
    // Support Node.js specific `module.exports` (which can be a function)
    {
      exports = module.exports = cookiesExport;
    }
    // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
    exports.Cookies = cookiesExport;
  }
})(typeof window === 'undefined' ? commonjsGlobal : window);
});

'use strict';

var typography = function (body) {
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
  ];

  let list = [
    [Text, 'typography', {
      type: 'subheading1',
      text: 'Too many type sizes and styles at once can wreck any layout. A typographic scale has a limited set of type sizes that work well together along with the layout grid.'
    }],
    [Text, 'typography', {
      type: 'subheading1',
      text: 'These sizes and styles were developed to balance content density and reading comfort under typical usage conditions. Type sizes are specified with sp (scaleable pixels) to enable large type modes for accessibility.'
    }]
  ];

  types.map((type) => {
    return list.push([Text, type, {type: type.toLowerCase().replace(/\s+/g, ''), text: type}])
  });

  var typography = [Container, 'typography', {}].concat(list);

  var layout = [View, 'typography', {}, typography];

  new Layout(layout, body);
};

var iconStar = `
<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>
 `;

var iconAccessibility = `
<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
</svg>`;

var iconPhone = `
<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
</svg>
 `;

var iconHappy = `
<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.99 2C6.47 2 2 6.47 2 12s4.47 10 9.99 10S22 17.53 22 12 17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-10.06L14.06 11l1.06-1.06L16.18 11l1.06-1.06-2.12-2.12zm-4.12 0L9.94 11 11 9.94 8.88 7.82 6.76 9.94 7.82 11zM12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>
 `;

var iconLink = `
<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
</svg>`;

'use strict';

// import material components
var button$1 = function (body) {
  var layout = new Layout([View, 'button', {},
    [Container, 'top', {},
      [Text, 'title', { type: 'title', text: 'Buttons' }],
      [Text, 'title', { text: 'Buttons communicate the action that will occur when the user touches them.' }]
    ],
    [Container, 'hero', {},
      [Button, 'first', { text: 'Flat', color: 'primary' }],
      [Button, 'second', { text: 'Raised', type: 'raised', color: 'primary' }],
      [Button, 'third', { icon: iconStar, type: 'action', color: 'secondary' }],
      [Button, 'fourth', { icon: iconStar, text: 'text' }],
      [Button, 'fifth', { icon: iconStar, type: 'floating', color: 'secondary' }]
    ],
    [Container, 'containerbutton', {},
      [Container, 'button-default', {},
        [Text, 'standard-button', { text: 'Standard Button', type: 'subheading2' }],
        [Container, 'buttons-container', {},
          [Button, 'default', { text: 'default' }],
          [Button, 'default-icontext', { icon: iconHappy, text: 'icon text' }],
          [Button, 'default-compact', { text: 'Compact', style: 'compact' }],
          [Button, 'default-dense', { text: 'Dense', style: 'dense' }],
          [Button, 'default-densecompact', { text: 'Compact dense', style: 'compact dense' }],
          [Button, 'default-link', { text: 'Link', tag: 'a' }]
        ],
        [Container, 'buttons-container', {},
          [Button, 'default', { text: 'default', color: 'primary' }],
          [Button, 'default-icontext', { icon: iconHappy, text: 'icon text', color: 'primary' }],
          [Button, 'default-compact', { text: 'Compact', style: 'compact', color: 'primary' }],
          [Button, 'default-dense', { text: 'Dense', style: 'dense', color: 'primary' }],
          [Button, 'default-densecompact', { text: 'Compact dense', style: 'compact dense', color: 'primary' }],
          [Button, 'default-link', { text: 'Link', color: 'primary', tag: 'a' }]
        ],
        [Container, 'buttons-container', {},
          [Button, 'default', { text: 'default', color: 'secondary' }],
          [Button, 'default-icontext', { icon: iconHappy, text: 'icon text', color: 'secondary' }],
          [Button, 'default-compact', { text: 'Compact', style: 'compact', color: 'secondary' }],
          [Button, 'default-dense', { text: 'Dense', style: 'dense', color: 'secondary' }],
          [Button, 'default-densecompact', { text: 'Compact dense', style: 'compact dense', color: 'secondary' }],
          [Button, 'default-link', { text: 'Link', color: 'secondary', tag: 'a' }]
        ],
        [Text, 'raised-button', { text: 'Raised Button', type: 'subheading2' }],
        [Container, 'buttons-raised', {},
          [Button, 'raised', { text: 'raised', type: 'raised' }],
          [Button, 'default-icontext', { icon: iconHappy, type: 'raised', text: 'icon text' }],
          [Button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact' }],
          [Button, 'raised-dense', { text: 'Dense', type: 'raised', style: 'dense' }],
          [Button, 'raised-densecompact', { text: 'Compact dense', type: 'raised', style: 'compact dense' }],
          [Button, 'raised-link', { text: 'Link', type: 'raised' }],
          [Button, 'raised-link', { icon: iconStar, type: 'raised' }]
        ],
        [Container, 'buttons-raised-primary', {},
          [Button, 'raised', { text: 'raised primary', type: 'raised', color: 'primary' }],
          [Button, 'default-icontext', { icon: iconHappy, type: 'raised', text: 'icon text', color: 'primary' }],
          [Button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact', color: 'primary' }],
          [Button, 'raised-dense', { text: 'Dense', style: 'dense', type: 'raised', color: 'primary' }],
          [Button, 'raised-densecompact', { text: 'Compact dense', style: 'dense compact', type: 'raised', color: 'primary' }],
          [Button, 'raised-link', { text: 'Link', type: 'raised', color: 'primary' }],
          [Button, 'raised-link', { icon: iconStar, type: 'raised', color: 'primary' }]
        ],
        [Container, 'buttons-raised-secondary', {},
          [Button, 'raised', { text: 'raised secondary', type: 'raised', color: 'secondary' }],
          [Button, 'default-icontext', { icon: iconHappy, type: 'raised', text: 'icon text', color: 'secondary' }],
          [Button, 'raised-compact', { text: 'Compact', type: 'raised', style: 'compact', color: 'secondary' }],
          [Button, 'raised-dense', { text: 'Dense', type: 'raised', style: 'dense', color: 'secondary' }],
          [Button, 'raised-densecompact', { text: 'Compact dense', type: 'raised', style: 'compact dense', color: 'secondary' }],
          [Button, 'raised-link', { text: 'Link', type: 'raised', color: 'secondary' }],
          [Button, 'raised-link', { icon: iconStar, type: 'raised', color: 'secondary' }]
        ],
        [Text, 'action-button', { text: 'Action Button', type: 'subheading2' }],
        [Container, 'buttons-action', {},
          [Button, 'action', { icon: iconStar, type: 'action' }],
          [Button, 'action-compact', { icon: iconHappy, type: 'action', style: 'compact' }],
          [Button, 'action-dense', { icon: iconPhone, type: 'action', style: 'dense' }],
          [Button, 'action-densecompact', { icon: iconAccessibility, type: 'action', style: 'compact dense' }],
          [Button, 'action-link', { icon: iconLink, type: 'action' }]
        ],
        [Container, 'buttons-action', {},
          [Button, 'action', { icon: iconStar, type: 'action', color: 'primary' }],
          [Button, 'action-compact', { icon: iconHappy, type: 'action', style: 'compact', color: 'primary' }],
          [Button, 'action-dense', { icon: iconPhone, type: 'action', style: 'dense', color: 'primary' }],
          [Button, 'action-densecompact', { icon: iconAccessibility, type: 'action', style: 'compact dense', color: 'primary' }],
          [Button, 'action-link', { icon: iconLink, type: 'action', color: 'primary' }]
        ],
        [Container, 'buttons-action-secondary', {},
          [Button, 'action', { icon: iconStar, type: 'action', color: 'secondary' }],
          [Button, 'action-compact', { icon: iconHappy, type: 'action', style: 'compact', color: 'secondary' }],
          [Button, 'action-dense', { icon: iconPhone, type: 'action', style: 'dense', color: 'secondary' }],
          [Button, 'action-densecompact', { icon: iconAccessibility, type: 'action', style: 'compact dense', color: 'secondary' }],
          [Button, 'action-link', { icon: iconLink, type: 'action', color: 'secondary' }]
        ],
        [Text, 'floating-button', { text: 'Floating Button', type: 'subheading2' }],
        [Container, 'buttons-floating', {},
          [Button, 'floating', { icon: iconStar, type: 'floating' }],
          [Button, 'floating-compact', { icon: iconHappy, type: 'floating', style: 'compact' }],
          [Button, 'floating-dense', { icon: iconPhone, type: 'floating', style: 'dense' }],
          [Button, 'floating-densecompact', { icon: iconAccessibility, type: 'floating', style: 'compact dense' }],
          [Button, 'floating-link', { icon: iconLink, type: 'floating', tag: 'a' }]
        ],
        [Container, 'buttons-floating', {},
          [Button, 'floating', { icon: iconStar, type: 'floating', color: 'primary' }],
          [Button, 'floating-compact', { icon: iconHappy, type: 'floating', style: 'compact', color: 'primary' }],
          [Button, 'floating-dense', { icon: iconPhone, type: 'floating', style: 'dense', color: 'primary' }],
          [Button, 'floating-densecompact', { icon: iconAccessibility, type: 'floating', style: 'compact dense', color: 'primary' }],
          [Button, 'floating-link', { icon: iconLink, type: 'floating', color: 'primary' }]
        ],
        [Container, 'buttons-floating-secondary', {},
          [Button, 'floating', { icon: iconStar, text: 'floating secondary', type: 'floating', color: 'secondary' }],
          [Button, 'floating-compact', { icon: iconHappy, text: 'Compact', type: 'floating', style: 'compact', color: 'secondary' }],
          [Button, 'floating-dense', { icon: iconPhone, text: 'Dense', type: 'floating', style: 'dense', color: 'secondary' }],
          [Button, 'floating-densecompact', { icon: iconAccessibility, type: 'floating', style: 'compact dense', color: 'secondary' }],
          [Button, 'floating-link', { icon: iconLink, type: 'floating', color: 'secondary' }]
        ]
      ]
    ]
  ], body);

  var component = layout.get();

  layout.get('default').on('click', (e) => {
    console.log('click', e, layout.get('default'));
  });
};

'use strict';

var layout$2 = [Component, 'simple-dialog', { display: 'flex', direction: 'vertical' },
  [Component, 'body', { display: 'flex', direction: 'vertical', flex: '1' },
    ['Textfield', 'eventName', { text: 'New Event' }],
    ['Textfield', 'startDate', { name: 'eventName' }]
  ],
  [Component, 'action', {},
    [Button, 'cancel', { style: 'compact dense' }],
    [Button, 'save', { style: 'compact dense', color: 'primary' }]
  ]
];
// var layout = {
//   component: Component,
//   name: 'simple-dialog',
//   display: 'flex',
//   direction: 'vertical',
//   components: [{
//     name: 'body',
//     display: 'flex',

//     direction: 'vertical',
//     flex: '1',
//     components: [{
//       text: 'New Event',
//       name: 'eventName',
//       component: Textfield,
//     }, {
//       text: 'Add Location',
//       name: 'event.location',
//       component: Textfield,
//     }, {
//       text: 'New Event',
//       name: 'startDate',
//       component: Textfield,
//     }, {
//       text: 'Add Location',
//       name: 'Alarm',
//       component: Textfield,
//     }]
//   }, {
//     name: 'action',
//     component: Component,
//     //display: 'flex',
//     //direction: 'horizontal',
//     components: [{
//       component: Button,
//       name: 'cancel',
//       flex: 'none',
//       text: 'Cancel',
//       options: {
//         style: 'compact dense',
//       }
//     }, {
//       component: Button,
//       name: 'save',
//       flex: 'none',
//       text: 'Save',
//       options: {
//         style: 'compact dense',
//         color: 'primary'
//       }
//     }]
//   }]
// };

/**
 * [initTest description]
 * @return {[type]} [description]
 */
var calendar = function (body) {
  var dialog = new Dialog({ layout: layout$2 });
  insert(dialog, body);

  event.add(dialog.layout.get('save'), 'click', function () {
    dialog.close();
  });

  event.add(dialog.layout.get('cancel'), 'click', function () {
    dialog.close();
  });

  var calendar = new Calendar().on('add', (date) => {
    console.log('add date', date);
    dialog.show();
  });
  insert(calendar, body);

  console.log('calendar instance', calendar);
};

'use strict';

var card = function (body) {
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
  ], body);

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

var countries = [{
  "name": "Austria",
  "code": "AT"
},
{
  "name": "Azerbaijan",
  "code": "AZ"
},
{
  "name": "Bahamas",
  "code": "BS"
},
{
  "name": "Bahrain",
  "code": "BH"
},
{
  "name": "Bangladesh",
  "code": "BD"
},
{
  "name": "Barbados",
  "code": "BB"
},
{
  "name": "Belarus",
  "code": "BY"
},
{
  "name": "Belgium",
  "code": "BE"
},
{
  "name": "Belize",
  "code": "BZ"
},
{
  "name": "Benin",
  "code": "BJ"
},
{
  "name": "Bermuda",
  "code": "BM"
},
{
  "name": "Bhutan",
  "code": "BT"
},
{
  "name": "Bolivia",
  "code": "BO"
},
{
  "name": "Bosnia and Herzegovina",
  "code": "BA"
},
{
  "name": "Botswana",
  "code": "BW"
},
{
  "name": "Bouvet Island",
  "code": "BV"
},
{
  "name": "Brazil",
  "code": "BR"
},
{
  "name": "British Indian Ocean Territory",
  "code": "IO"
},
{
  "name": "Brunei Darussalam",
  "code": "BN"
},
{
  "name": "Bulgaria",
  "code": "BG"
},
{
  "name": "Burkina Faso",
  "code": "BF"
}];

'use strict';

var dialog = function (body) {
  // dialog view
  var layout = new Layout([View, 'elevation', {},
    [Container, 'top', {},
      [Text, 'title', { type: 'title', text: 'Dialogs', style: 'adjust' }],
      [Text, 'title', { text: 'Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.' }]
    ],
    [Container, 'hero', {},
      [Button, 'alert', { text: 'Alert', color: 'primary', type: 'raised' }],
      [Button, 'simple', { text: 'Simple', color: 'primary', type: 'raised' }],
      [Button, 'confirmation', { text: 'Confirmation', color: 'primary', type: 'raised' }]
    ]
  ], body);

  // alert dialog

  var alert = new Dialog({
    name: 'alert',
    content: 'Discard draft?',
    accept: { text: 'discard', color: 'primary' },
    cancel: { text: 'cancel', color: 'primary' }
  }).on('accepted', () => {
    console.log('alert dialog accepted');
  }).on('canceled', () => {
    console.log('alert dialog canceled');
  }).insert(document.body);

  //  simple dialog

  var simple = new Dialog({
    name: 'simple',
    title: 'Choose a country',
    content: [List, 'list', { flex: '1',
      select: (item) => {
        console.log('select', item);
        simple.accept.enable();
      }
    }],
    accept: { text: 'choose', color: 'primary' },
    cancel: { text: 'cancel' }
  }).on('accepted', () => {
    console.log('simple dialog accepted');
  }).on('canceled', () => {
    console.log('simple dialog canceled');
  }).insert(document.body);

  simple.accept.disable();

  var list = simple.content.get('list');
  list.set('list', countries);

  //  confirmation dialog

  var confirmation = new Dialog({
    name: 'confirmation',
    content: [List, 'list', { flex: '1',
      select: (item) => {
        console.log('select', item);
        simple.action.accept.enable(true);
      }
    }]
  }).on('accepted', () => {
    console.log('simple dialog accepted');
  }).on('canceled', () => {
    console.log('simple dialog canceled');
  }).insert(document.body);

  var list = simple.content.get('list');
  list.set('list', countries);

  // activate buttons behavior

  layout.get('alert').on('click', () => {
    alert.show();
  });

  layout.get('simple').on('click', () => {
    simple.show();
  });

  layout.get('confirmation').on('click', () => {
    confirmation.show();
  });
};

var iconApps = `
<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
  <path d="M0 0h24v24H0z" fill="none" />
</svg>`;

'use strict';

const TITLE$1 = 'Material';
const CONTENT = 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.';

var drawer = function (body) {
  var layout = new Layout([View, 'drawer', {},
    [Container, 'top', {},
      [Text, 'title', { type: 'title', text: 'Buttons' }],
      [Text, 'title', { text: 'Buttons communicate the action that will occur when the user touches them.' }]
    ],
    [Container, 'hero', {},
      [Toolbar, 'head', { display: 'flex', direction: 'horizontal', color: 'primary' },
        [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
        [Text, 'title', { text: TITLE$1 }],
        [Button, 'menu-more', { icon: iconMore, type: 'action' }]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Normal' }]
      ],
      [Container, 'screen', {},
        [Toolbar, 'head', { display: 'flex', direction: 'horizontal', color: 'primary' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Fixed' }]
      ],
      [Container, 'screen', { css: 'fixed-screen' },
        [Toolbar, 'head', { fixed: 'fixed', color: 'primary' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Flexile' }]
      ],
      [Container, 'screen', { css: 'flexile-screen' },
        [Toolbar, 'head', { type: 'flexible', height: 224, display: 'flex', direction: 'vertical', color: 'primary' },
          [Container, 'section', { css: 'menu', display: 'flex', direction: 'horizontal' },
            [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
            [Divider, 'section', { flex: 1 }],
            [Button, 'menu-apps', { icon: iconApps, type: 'action' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [Container, 'section', { },
            [Text, 'title', { css: 'pin-bottom', type: 'title', text: 'Title' }]
          ]
        ],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }]

      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Flexible' }]
      ],
      [Container, 'screen', { css: 'screen-waterfall' },
        [Toolbar, 'waterfalltollbar', { waterfall: 1, height: 224, flexible: 1, fixed: 1, display: 'flex', direction: 'vertical', color: 'primary' },
          [Container, 'section', { css: 'menu', display: 'flex', direction: 'horizontal' },
            [Button, 'menu-water', { icon: iconNavi, type: 'action' }],
            [Divider, 'section', { flex: 1 }],
            [Button, 'menu-apps', { icon: iconApps, type: 'action' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [Container, 'section', { },
            [Text, 'title', { css: 'pin-bottom', type: 'title', text: 'Title' }]
          ]
        ],
        [Drawer, 'navi-water', { display: 'flex', direction: 'vertical', css: 'drawer-temporary', type: 'temporary' },
          [Toolbar, 'navi-head', { type: 'app' },
            [Button, 'menu-navi-head', { icon: iconNavi, type: 'action' }],
            [Text, 'title', { text: TITLE$1 }]
          ],
          [List, 'navi-list', { flex: '1' }]
        ],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }],
        [Text, '', { text: CONTENT }]

      ]
    ]
  ], body);

  var navi = layout.get('navi-water');

  layout.get('menu-water').on('click', function (e) {
    navi.toggle(e);
  });
};

'use strict';

var checkbox = function (body) {
  var layout = new Layout([View, 'checkbox', {},
    [Container, 'hero', {},
      [Checkbox, '', { label: 'Checkbox' }]
    ],
    [Toolbar, 'footer', {},
      [Button, 'toggleBtn', { label: 'Toggle check' }],
      [Button, 'enableBtn', { label: 'Enable', checked: true }],
      [Button, 'disableBtn', { label: 'Disable', disabled: true }]
    ],
    [Container, 'default-container', {},
      [Checkbox, 'default', { label: 'Checkbox' }],
      [Checkbox, 'uncheck', { label: 'Checkbox', checked: true }],
      [Checkbox, 'disabled', { label: 'Disabled', disabled: true }]
    ],
    [Container, 'dark-container', { css: 'dark-theme' },
      [Checkbox, '', { label: 'Checkbox' }],
      [Checkbox, '', { label: 'Checkbox', checked: true }],
      [Checkbox, '', { label: 'Disabled', disabled: true }]
    ]
  ], body);

  layout.get('toggleBtn').on('click', () => {
    layout.get('default').toggle();
  }).insert(layout.get('container'));

  layout.get('enableBtn').on('click', () => {
    layout.get('disabled').enable();
    layout.get('disabled').label('Enabled');
  }).insert(layout.get('container'));

  layout.get('disableBtn').on('click', () => {
    layout.get('disabled').disable();
    layout.get('disabled').label('Disabled');
  }).insert(layout.get('container'));
};

'use strict';

var switchc = function (body) {
  var layout = new Layout([View, 'checkbox-view', {},
    [Container, 'hero', {},
      [Switch, 'main-switch', { label: 'Switch' }]
    ],
    [Toolbar, 'footer', {},
      [Button$2, 'toggleBtn', { label: 'Toggle check' }],
      [Button$2, 'enableBtn', { label: 'Enable', checked: true }],
      [Button$2, 'disableBtn', { label: 'Disable', disabled: true }]
    ],
    [Container, 'default-container', {},
      [Switch, 'default', { label: 'Switch' }],
      [Switch, 'check', { label: 'Checked', checked: true }],
      [Switch, 'disabled', { label: 'Disabled', disabled: true }]
    ],
    [Container, 'dark-container', { css: 'dark-theme' },
      [Switch, 'dark-default', { label: 'Switch' }],
      [Switch, 'dark-uncheck', { label: 'Checked', checked: true }],
      [Switch, 'dark-disabled', { label: 'Disabled', disabled: true }]
    ]
  ], body);

  layout.get('toggleBtn').on('click', () => {
    layout.get('default').toggle();
  }).insert(layout.get('container'));

  layout.get('enableBtn').on('click', () => {
    layout.get('disabled').enable();
    layout.get('disabled').label('Enabled');
  }).insert(layout.component.container);

  layout.get('disableBtn').on('click', () => {
    layout.get('disabled').disable();
    layout.get('disabled').label('Disabled');
  }).insert(layout.component.container);
};

'use strict';

var field = function (body) {
  var layout = new Layout([View, 'checkbox-view', {},
    [Container, 'hero', {},
      [Textfield, '', { label: 'Textfield' }]
    ],
    [Container, 'checkbox-options', {},
      [Textfield, 'default', { label: 'Textfield' }],
      [Checkbox, 'disabled', { label: 'Disabled', style: 'dense' }],
      [Checkbox, 'dense', { label: 'Dense', style: 'dense' }],
      [Checkbox, 'required', { label: 'Required', style: 'dense' }]
    ]
  ], body);

  layout.get('disabled').on('change', (state) => {
    console.log('disabled', state);
    if (state) {
      layout.get('default').set('disabled', true);
    } else {
      layout.get('default').set('disabled', false);
    }
  }).insert(layout.get('container'));
};

'use strict';

var slider = function(body) {
  new Layout([Component, 'slider', {},
    [Container, 'hero', {},
      [Slider, '', { width: '300px' }]
    ],
    [Container, 'container', {},
      [Slider, 'default', { label: 'Slider', value: 20 }],
      [Slider, 'default', { label: 'Slider discrete', value: 40, type: 'discrete' }],
      [Slider, 'default', { label: 'Diasbled', value: 60, disabled: true }]
    ],
    [Container, 'container', { css: 'dark-theme' },
      [Slider, 'default', { label: 'Slider', value: 20 }],
      [Slider, 'default', { label: 'Slider discrete', value: 40, type: 'discrete' }],
      [Slider, 'default', { label: 'Diasbled', value: 60, disabled: true }]
    ]
  ], body);
};

var list$1 = function (body) {
  var layout = new Layout([Container, 'view-list', {},
    [Container, 'default', {},
      [View, 'default', { css: 'container-list', display: 'flex', direction: 'vertical'},
        [Toolbar, 'toolbar', { type: 'app', display: 'flex', direction: 'horizontal' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'topics' }],
          [Divider],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [List, 'first-list', {}]
      ],
      [View, 'default', { css: 'container-list', display: 'flex', direction: 'vertical'},
        [Toolbar, 'toolbar', { type: 'app', display: 'flex', direction: 'horizontal' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'topics' }]
        ],
        [List, 'second-list', {}]
      ],
      [View, 'default', { css: 'container-list', display: 'flex', direction: 'vertical'},
        [Toolbar, 'toolbar', { type: 'app', display: 'flex', direction: 'horizontal' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'topics' }]
        ],
        [List, 'third-list', {}]
      ]
    ],
    [Container, 'dark', { css: 'dark-theme' },
      [List, 'first-list-dark', {}],
      [List, 'second-list-dark', {}],
      [List, 'third-list-dark', {}]
    ]
  ], body);

  var first = layout.get('first-list');
  var second = layout.get('second-list');
  var third = layout.get('third-list');

  var firstDark = layout.get('first-list-dark');
  var secondDark = layout.get('second-list-dark');
  var thirdDark = layout.get('third-list-dark');

  var renderCheckbox = {
    render: (info) => {
      var item;

      if (info.type === 'divider') {
        item = new Divider();
      } else {
        item = new Checkbox({
          label: info.name,
          value: info.name
        });
      }

      return item
    }
  };

  var renderSwitch = {
    render: (info) => {
      var item;

      if (info.type === 'divider') {
        item = new Divider();
      } else {
        item = new Switch({
          label: info.name,
          value: info.name
        });
      }

      return item
    }
  };

  Object.assign(second, renderCheckbox);
  Object.assign(third, renderSwitch);
  Object.assign(secondDark, renderCheckbox);
  Object.assign(thirdDark, renderSwitch);

  // var list = countries.concat(countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries);
  var list = countries;

  layout.get('first-list').set('list', list);
  layout.get('second-list').set('list', list);
  layout.get('third-list').set('list', list);

  layout.get('first-list-dark').set('list', list);
  layout.get('second-list-dark').set('list', list);
  layout.get('third-list-dark').set('list', list);

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });
};

'use strict';

// controls
var form = function (body) {
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
            [Button$2, 'cancel', { text: 'Cancel' }],
            [Button$2, 'apply', { text: 'Apply' }]
        ]
      ]
    ]
  }], body);

  var form = layout.get('contact-form');

  // form.set('info', data)
};

'use strict';

// controls
var tree = function (body) {
  var list1 = new List({
    // type: 'action',
    height: 600,
    label: 'Flat',
    render: (info) => {
      var item;

      item = button({
        label: info.name
      });

      return item
    }
  }).insert(body);

  list1.set('list', countries);

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });
};

'use strict';

const TITLE$2 = 'Material';
const CONTENT$1 = 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.';

var toolbar = function (body) {
  var layout = new Layout([View, 'toolbar', {},
    [Container, 'top', {},
      [Text, 'title', { type: 'title', text: 'Buttons' }],
      [Text, 'title', { text: 'Buttons communicate the action that will occur when the user touches them.' }]
    ],
    [Container, 'hero', {},
      [Toolbar, 'head', { display: 'flex', direction: 'horizontal', color: 'primary' },
        [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
        [Text, 'title', { text: TITLE$2 }],
        [Button, 'menu-more', { icon: iconMore, type: 'action' }]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Normal' }]
      ],
      [Container, 'screen', {},
        [Toolbar, 'head', { display: 'flex', direction: 'horizontal', color: 'primary' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Fixed' }]
      ],
      [Container, 'screen', { css: 'fixed-screen' },
        [Toolbar, 'head', { fixed: 'fixed', color: 'primary' },
          [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
          [Text, 'title', { text: 'Title' }],
          [Button, 'menu-more', { icon: iconMore, type: 'action' }]
        ],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }]
      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Flexile' }]
      ],
      [Container, 'screen', { css: 'flexile-screen' },
        [Toolbar, 'head', { type: 'flexible', height: 224, display: 'flex', direction: 'vertical', color: 'primary' },
          [Container, 'section', { css: 'menu', display: 'flex', direction: 'horizontal' },
            [Button, 'menu-navi', { icon: iconNavi, type: 'action' }],
            [Divider, 'section', { flex: 1 }],
            [Button, 'menu-apps', { icon: iconApps, type: 'action' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [Container, 'section', { },
            [Text, 'title', { css: 'pin-bottom', type: 'title', text: 'Title' }]
          ]
        ],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }]

      ]
    ],
    [Container, 'sample', {},
      [Container, 'top', {},
        [Text, 'title', { type: 'title', text: 'Flexible' }]
      ],
      [Container, 'screen', { css: 'screen-waterfall' },
        [Toolbar, 'waterfalltollbar', { waterfall: 1, height: 224, flexible: 1, fixed: 1, display: 'flex', direction: 'vertical', color: 'primary' },
          [Container, 'section', { css: 'menu', flex: 'none', display: 'flex', direction: 'horizontal' },
            [Button, 'menu-water', { icon: iconNavi, type: 'action' }],
            [Divider, 'section', { flex: 1 }],
            [Button, 'menu-apps', { icon: iconApps, type: 'action' }],
            [Button, 'menu-more', { icon: iconMore, type: 'action' }]
          ],
          [Container, 'section', { flex: 'none', position: 'absolute', bottom: '1px' },
            [Text, 'title', { css: 'pin-bottom', type: 'title', text: 'Title' }]
          ]
        ],
        [Drawer, 'navi-water', { display: 'flex', direction: 'vertical', css: 'drawer-temporary', type: 'temporary' },
          [Toolbar, 'navi-head', { type: 'app' },
            [Button, 'menu-navi-head', { icon: iconNavi, type: 'action' }],
            [Text, 'title', { text: TITLE$2 }]
          ],
          [List, 'navi-list', { flex: '1' }]
        ],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }],
        [Text, '', { text: CONTENT$1 }]

      ]
    ]
  ], body);

  var navi = layout.get('navi-water');

  layout.get('menu-water').on('click', function (e) {
    navi.toggle(e);
  });
};

'use strict';

var menu = function (body) {
  var list = [{
    name: 'Undo'
  }, {
    name: 'Redo'
  }, {
    type: 'divider'
  }, {
    name: 'Cut'
  }, {
    name: 'Copy'
  }, {
    name: 'Paste'
  }, {
    type: 'divider'
  }, {
    name: 'Find'
  }];

  var layout = new Layout([View, 'demo-button', {},
    [Container, 'hero', {},
      [Button$2, 'openmenu', { text: 'Menu' }],
      [Menu, 'menu', { list: list }]
    ]
  ], body);

  // console.log('obuttn', layout, layout.get('openmenu'))

  layout.get('openmenu').on('click', (e) => {
    // console.log('menu', layout.get('menu'))
    layout.get('menu').show(e);
  });
};

'use strict';

var snackbar = function (body) {
  var view = new View({
    name: 'snackbar'
  }).insert(body);

  var hero = new Container({
    name: 'hero'
  }).insert(view);

  var container = new Container({
    name: 'card'
  }).insert(view);

  var layout = [Component, 'content', { display: 'flex', direction: 'horizontal' },
    [Text, 'text', { flex: '1', text: 'Message sent'}],
    [Button, 'undo', { flex: 'none', text: 'undo' }]
  ];

  new Snackbar({
    layout: layout,
    delay: 0
  }).insert(hero);

  new Button({
    text: 'show'
  }).insert(container).on('click', () => {
    var sb = new Snackbar({
      layout: layout
    }).insert(document.body);

    sb.layout.get('undo').on('click', () => {
      console.log('undo');
    });
  });
};

'use strict';

var select = function (body) {
  var list = [{
    name: 'Undo'
  }, {
    name: 'Redo'
  }, {
    type: 'divider'
  }, {
    name: 'Cut'
  }, {
    name: 'Copy'
  }, {
    name: 'Paste'
  }, {
    type: 'divider'
  }, {
    name: 'Find'
  }];

  var layout = new Layout([View, 'demo-button', {},
    [Container, 'hero', {},
      [Button$2, 'openmenu', { text: 'Menu' }],
      [Menu, 'menu', { list: list }]
    ]
  ], body);

  console.log('button', layout, layout.get('openmenu'));

  layout.get('openmenu').on('click', (e) => {
    console.log('menu', layout.get('menu'));
    layout.get('menu').show(e);
  });
};

'use strict';

var progress = function (body) {
  var layout = new Layout([View, 'demo-button', {},
    [Container, 'hero', {},
      [Spinner, 'progress'],
      [Divider],
      [Spinner, 'indeterminate', { type: 'indeterminate' }]
    ]
  ], body);

  layout.get('progress').set('50%');
};

'use strict';

var tabs = function (body) {
  var list = [{
    text: 'One',
    name: 'one'
  }, {
    text: 'Two',
    name: 'two'
  }, {
    text: 'Three',
    name: 'three'
  }, {
    text: 'Four',
    name: 'four'
  }];

  var layout = new Layout([View, 'tabs', { display: 'flex', direction: 'vertical' },
    [Tabs, 'tabs', { list: list, flex: 'none' }],
    [Container, 'herotabs', { flex: '1' }],
    [Tabs, 'tabs', { color: 'primary', list: list, flex: 'none' }],
    [Container, 'herotabs', { flex: '1' }],
    [Tabs, 'tabs', { color: 'secondary', list: list, flex: 'none' }],
    [Container, 'herotabs', { flex: '1' }]
  ], body);

  layout.get('tabs').on('select', (name) => {
    console.log('select', name);
  });

  // console.log('obuttn', layout, layout.get('openmenu'))

  // layout.get('openmenu').on('click', (e) => {
  //   console.log('menu', layout.get('menu'))
  //   layout.get('menu').show(e)
  // })
};

'use strict';

var ripple$1 = function (body) {
  console.log('init ripple layout');
  var layout = new Layout([View, 'ripple', {},
    [Container, 'hero', {},
      [Button$2, 'button-hero', { label: 'click on me' }]
    ]
  ], body);

  console.log('layout', layout);
};

'use strict';

var elevation = function (body) {
  console.log('init elevation layout');
  var layout = new Layout([View, 'elevation', {},
    [Container, 'hero', {},
      [Component, 'hero', { elevation: 1, text: 'click on me' }],
      [Component, 'hero', { elevation: 4, text: 'click on me' }],
      [Component, 'hero', { elevation: 7, text: 'click on me' }],
      [Component, 'hero', { elevation: 11, text: 'click on me' }],
      [Component, 'hero', { elevation: 15, text: 'click on me' }]
    ],
    [Container, '', {},
      [Component, '', { elevation: 1, text: 'click on me' }],
      [Component, '', { elevation: 2, text: 'click on me' }],
      [Component, '', { elevation: 3, text: 'click on me' }],
      [Component, '', { elevation: 4, text: 'click on me' }],
      [Component, '', { elevation: 5, text: 'click on me' }],
      [Component, '', { elevation: 6, text: 'click on me' }],
      [Component, '', { elevation: 7, text: 'click on me' }],
      [Component, '', { elevation: 8, text: 'click on me' }],
      [Component, '', { elevation: 9, text: 'click on me' }],
      [Component, '', { elevation: 10, text: 'click on me' }],
      [Component, '', { elevation: 11, text: 'click on me' }],
      [Component, '', { elevation: 12, text: 'click on me' }],
      [Component, '', { elevation: 13, text: 'click on me' }],
      [Component, '', { elevation: 14, text: 'click on me' }],
      [Component, '', { elevation: 15, text: 'click on me' }],
      [Component, '', { elevation: 16, text: 'click on me' }],
      [Component, '', { elevation: 17, text: 'click on me' }],
      [Component, '', { elevation: 18, text: 'click on me' }],
      [Component, '', { elevation: 19, text: 'click on me' }],
      [Component, '', { elevation: 20, text: 'click on me' }],
      [Component, '', { elevation: 21, text: 'click on me' }],
      [Component, '', { elevation: 22, text: 'click on me' }],
      [Component, '', { elevation: 23, text: 'click on me' }],
      [Component, '', { elevation: 24, text: 'click on me' }]
    ]
  ], body);

  console.log('layout', layout);
};

'use strict';

var view = {
  typography,
  button: button$1,
  calendar,
  card,
  checkbox,
  dialog,
  drawer,
  elevation,
  field,
  slider,
  list: list$1,
  form,
  tree,
  toolbar,
  ripple: ripple$1,
  menu,
  progress,
  snackbar,
  select,
  switch: switchc,
  tabs
};

/**
 * @class
 */
class App {
  /**
   * @constructor
   * @param  {Object} options - The application options
   * @return {Object} this
   */
  constructor (options$$1) {
    this.options = Object.assign({}, options, options$$1 || {});

    this.init(options$$1);
    this.build();
    this.setup();

    this.emit('ready');
  }

  /**
   * [init description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  init (options$$1) {
    Object.assign(this, emitter);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/serviceworker.js')
        .then(function (registration) {
          // console.log('Service Worker Registered')
          console.log('./sw.js registration successful with scope: ', registration.scope);
        });
    }

    self.addEventListener('fetch', function (event) {
      console.log('say hello');
      // Do something interesting with the fetch here
    });

    this.body = document.body;
  }

  /**
   * [build description]
   * @return {[type]} [description]
   */
  build () {
    this.layout = new Layout(layout, this.body);

    this.main = this.layout.get('main');
  }

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  setup () {
    var navi = this.layout.get('navi');

    this.layout.get('menu-navi').on('click', function (e) {
      navi.toggle(e);
    });

    document.body.addEventListener('scroll', (e) => {
      if (this.body.scrollTop > 0) {
        css.add(this.layout.get('head').root, 'head-shadow');
      } else {
        css.remove(this.layout.get('head').root, 'head-shadow');
      }
    });

    this.layout.get('menu-navi-head').on('click', function (e) {
      navi.close(e);
    });

    var menuList = this.layout.get('navi-list');

    var object = {
      select: (item, e, current) => {
        css.remove(current, 'is-selected');
        css.add(e.target, 'is-selected');
        var name = item.innerText.toLowerCase();
        navi.close(e);
        this.view(name);
      }
    };

    Object.assign(menuList, object);

    menuList.set('list', this.options.components);

    this.layout.get('menu-more').on('click', (e) => {
      this.layout.get('more-menu').show(e);
    });

    // console.log('dark', this.layout.get('darktheme'))

    // this.layout.get('darktheme').on('change', (state) => {
    //   console.log('darktheme', state)
    // })

    // this.layout.get('darktheme').on('change', (state) => {
    //   console.log('darktheme', state)
    //   if (state) {
    //     css.add(this.main, 'dark-theme')
    //   } else {
    //     css.remove(this.main, 'dark-theme')
    //   }
    // })

    this.layout.get('rtl').on('change', (state) => {
      console.log('rtl', state);
      if (state) {
        this.body.dir = 'rtl';
      } else {
        this.body.removeAttribute('dir');
      }
    });

    this.on('view', (name) => {
      var main = this.layout.get('main');
      dom.empty(main.root);

      if (!view[name]) return

      cookies.set('view', name);
      view[name](main);
    });

    var nameview = cookies.get('view');

    if (nameview) this.view(nameview);

    return this
  }

  /**
   *
   */
  view (name) {
    console.log('updateMainView', name);

    var header = this.layout.get('head');

    header.set('minimize');
    this.emit('view', name);

    return this
  }
}

domready(function () {
  var app = new App();
});

// document.addEventListener('DOMContentLoaded', function () {
//   var app = new App()

//   console.log('start app', app)
// })

// import debug from 'debug.js';
// // by default stderr is used
// const log = debug('app:log');
// if ("development") {
//   // Enable the logger.
//   debug.enable('*');
//   log('Logging is enabled!');

//   document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
// } else {
//   debug.disable();
// }
// document.addEventListener('DOMContentLoaded', function () {
//   new App()
// })

}());
//# sourceMappingURL=bundle.js.map
