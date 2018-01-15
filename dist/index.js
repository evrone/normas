/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isArray */
/* harmony export (immutable) */ __webpack_exports__["e"] = isFunction;
/* harmony export (immutable) */ __webpack_exports__["g"] = isString;
/* unused harmony export compact */
/* harmony export (immutable) */ __webpack_exports__["a"] = debounce;
/* harmony export (immutable) */ __webpack_exports__["d"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["b"] = filter;
/* harmony export (immutable) */ __webpack_exports__["c"] = find;
/* unused harmony export map */
/* harmony export (immutable) */ __webpack_exports__["h"] = mapValues;
/* harmony export (immutable) */ __webpack_exports__["i"] = without;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_is_plain_object__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0_is_plain_object___default.a; });
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Sufficient for Normas implementation of functions like from lodash





var isArray = Array.isArray;

function isFunction(v) {
  return typeof v === 'function';
}

function isString(v) {
  return typeof v === 'string';
}

function compact(array) {
  return filter(array, function (v) {
    return v;
  });
}

function debounce(func, wait) {
  var timeoutId = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function () {
      func.apply(undefined, args);
    }, wait);
  };
}

function flatten(array) {
  var result = [];
  array.forEach(function (value) {
    if (isArray(value)) {
      result.push.apply(result, _toConsumableArray(value));
    } else {
      result.push(value);
    }
  });
  return result;
}

function filter(collection, conditions) {
  return filterBase('filter', collection, conditions);
}

function find(collection, conditions) {
  return filterBase('find', collection, conditions);
}

function map(collection, iteratee) {
  return Array.prototype.map.call(collection, iteratee);
}

function mapValues(object, iteratee) {
  var result = {};
  Object.keys(object).forEach(function (key) {
    result[key] = iteratee(object[key]);
  });
  return result;
}

function without(collection) {
  for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    values[_key2 - 1] = arguments[_key2];
  }

  return filter(collection, function (item) {
    return !values.includes(item);
  });
}

// private

function filterBase(baseName, collection, conditions) {
  return Array.prototype[baseName].call(collection, makeConditionsMatch(conditions));
}

function makeConditionsMatch(conditions) {
  if (isFunction(conditions)) {
    return conditions;
  } else {
    var conditionsKeys = Object.keys(conditions);
    return function (item) {
      return filterMatch(item, conditions, conditionsKeys);
    };
  }
}

function filterMatch(item, conditions, conditionsKeys) {
  return conditionsKeys.find(function (key) {
    return conditions[key] !== item[key];
  }) === undefined;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base(_ref) {
    var _ref$debugMode = _ref.debugMode,
        debugMode = _ref$debugMode === undefined ? true : _ref$debugMode,
        _ref$$el = _ref.$el,
        $el = _ref$$el === undefined ? $(document) : _ref$$el,
        _ref$instanceName = _ref.instanceName,
        instanceName = _ref$instanceName === undefined ? 'NormasApp' : _ref$instanceName;

    _classCallCheck(this, Base);

    this.instanceName = instanceName;
    this.debugMode = debugMode;
    this.$el = $el;
    this.el = $el[0];
    this.log('info', '"' + this.instanceName + '" constructed.');
  }

  _createClass(Base, [{
    key: '$',
    value: function $() {
      var _$el;

      return (_$el = this.$el).find.apply(_$el, arguments);
    }
  }, {
    key: 'log',
    value: function log() {
      if (!this.debugMode) return;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var method = ['table', 'warn', 'info'].indexOf(args[0]) > -1 ? args.shift() : 'log';
      this._log.apply(this, [method].concat(args));
    }
  }, {
    key: 'error',
    value: function error() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this._log.apply(this, ['error'].concat(args));
    }
  }, {
    key: '_log',
    value: function _log(method) {
      if (console && console[method]) {
        var _console;

        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        (_console = console)[method].apply(_console, args); // eslint-disable-line no-console
      }
    }
  }]);

  return Base;
}();

/* harmony default export */ __webpack_exports__["a"] = (Base);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_helpers__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/* harmony default export */ __webpack_exports__["a"] = (function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class(options) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

      _this.eventsDebug = _this.debugMode && options.eventsDebug || false;
      if (_this.eventsDebug) {
        _this.eventsLogBuffer = [];
        _this.eventsLog = Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["a" /* debounce */])(_this.eventsLog, 20);
      }
      _this.log('info', '"' + _this.instanceName + '" events mixin activated. eventsDebug =', _this.eventsDebug);
      return _this;
    }

    _createClass(_class, [{
      key: 'trigger',
      value: function trigger() {
        var _$el;

        (_$el = this.$el).trigger.apply(_$el, arguments);
      }
    }, {
      key: 'listenEvents',
      value: function listenEvents() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var listeningArgs = this.listenEventsOnElement.apply(this, [this.$el].concat(args));
        if (this.eventsDebug) {
          this.eventsLogBuffer = this.eventsLogBuffer.concat(listeningArgs);
          this.eventsLog();
        }
        return listeningArgs;
      }
    }, {
      key: 'listenEventsOnElement',
      value: function listenEventsOnElement($element) {
        var _constructor;

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        var listeningArgs = (_constructor = this.constructor).listeningArguments.apply(_constructor, args);
        listeningArgs.forEach(function (_ref) {
          var events = _ref.events,
              selector = _ref.selector,
              handle = _ref.handle;

          $element.on(events, selector, handle);
        });
        return listeningArgs;
      }
    }, {
      key: 'eventsLog',
      value: function eventsLog() {
        this.log('table', this.eventsLogBuffer);
        this.eventsLogBuffer = [];
      }
    }, {
      key: 'forgetEvents',
      value: function forgetEvents(listeningArgs) {
        this.forgetEventsOnElement(this.$el, listeningArgs);
      }
    }, {
      key: 'forgetEventsOnElement',
      value: function forgetEventsOnElement($element, listeningArgs) {
        if (this.eventsDebug) {
          this.log('forget events', listeningArgs);
        }
        listeningArgs.forEach(function (_ref2) {
          var events = _ref2.events,
              selector = _ref2.selector,
              handle = _ref2.handle;

          $element.off(events, selector, handle);
        });
      }
    }], [{
      key: 'listeningArguments',
      value: function listeningArguments(selector, eventRule, _handle) {
        var _this2 = this;

        if (Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["f" /* isPlainObject */])(selector)) {
          eventRule = selector;
          selector = '';
        }

        if (Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["e" /* isFunction */])(eventRule)) {
          _handle = eventRule;
          eventRule = selector;
          selector = '';
        }

        if (Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["f" /* isPlainObject */])(eventRule)) {
          return Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["d" /* flatten */])(Object.keys(eventRule).map(function (key) {
            var value = eventRule[key];
            return Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["f" /* isPlainObject */])(value) ? _this2.listeningArguments(selector ? selector + ' ' + key : key, value) : _this2.listeningArguments(selector, key, value);
          }));
        }

        if (!Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["e" /* isFunction */])(_handle)) {
          console.error('handle isn\'t function in listening declaration! (selector: \'' + selector + '\')'); // eslint-disable-line no-console
          return [];
        }
        if (!eventRule) {
          console.error('eventRule not defined! (selector: \'' + selector + '\')'); // eslint-disable-line no-console
          return [];
        }

        var selectors = eventRule.split(/\s+/);
        var eventName = selectors[0];
        selectors[0] = selector;

        if (!eventName) {
          console.error('bad eventName in listening declaration! (selector: \'' + selector + '\')'); // eslint-disable-line no-console
          return [];
        }

        return [{
          events: eventName.replace(/\//g, ' '),
          selector: selectors.join(' ').trim(),
          handle: function handle(event) {
            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              args[_key3 - 1] = arguments[_key3];
            }

            return _handle.apply(undefined, [$(event.currentTarget), event].concat(args));
          }
        }];
      }
    }]);

    return _class;
  }(Base);
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_jqueryAdditions__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_jqueryAdditions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_jqueryAdditions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_navigation__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_views__ = __webpack_require__(11);







var Normas = Object(__WEBPACK_IMPORTED_MODULE_5__mixins_views__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4__mixins_navigation__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_3__mixins_content__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_2__mixins_events__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__mixins_base__["a" /* default */]))));

/* harmony default export */ __webpack_exports__["default"] = (Normas);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

$.fn.each$ = function (handle) {
  return this.each(function (index, element) {
    handle($(element), index);
  });
};

// [showOrHide[, duration[, callback]]]
$.fn.slideToggleByState = function slideToggleByState() {
  if (this.length > 0) {
    for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
      a[_key] = arguments[_key];
    }

    if (a.length > 0) {
      if (a.shift()) {
        this.slideDown.apply(this, a);
      } else {
        this.slideUp.apply(this, a);
      }
    } else {
      this.slideToggle();
    }
  }
  return this;
};

// http://css-tricks.com/snippets/jquery/mover-cursor-to-end-of-textarea/
$.fn.focusToEnd = function focusToEnd() {
  var $this = this.first();
  if ($this.is('select, :checkbox, :radio')) {
    $this.focus();
  } else {
    var val = $this.val();
    $this.focus().val('').val(val);
  }
  return this;
};

$.fn.focusTo = function focusTo(caretPos) {
  return this.each(function (index, element) {
    if (element.createTextRange) {
      var range = element.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else if (element.selectionStart) {
      element.focus();
      element.setSelectionRange(caretPos, caretPos);
    } else {
      element.focus();
    }
  });
};

/*
 ** Returns the caret (cursor) position of the specified text field.
 ** Return value range is 0-oField.value.length.
 */
$.fn.caretPosition = function caretPosition() {
  // Initialize
  var iCaretPos = 0;
  var oField = this[0];

  // IE Support
  if (document.selection) {
    // Set focus on the element
    oField.focus();
    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange();
    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);
    // The caret position is selection length
    iCaretPos = oSel.text.length;
  } else if (oField.selectionStart != null) {
    iCaretPos = oField.selectionStart;
  }

  // Return results
  return iCaretPos;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(8);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// require events mixin
/* harmony default export */ __webpack_exports__["a"] = (function (Base) {
  var _class, _temp;

  return _temp = _class = function (_Base) {
    _inherits(_class, _Base);

    function _class(options) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

      _this.log('info', '"' + _this.instanceName + '" content mixin activated.');
      return _this;
    }

    _createClass(_class, [{
      key: 'listenToElement',
      value: function listenToElement(selector, enter) {
        var leave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        var contentEnter = this.constructor.makeElementContentEnter(selector, enter);
        if (delay > 0) {
          contentEnter = this.constructor.makeDelayedElementContentEnter(contentEnter, delay);
        }
        var contentLeave = leave || delay > 0 ? this.constructor.makeElementContentLeave(selector, leave, delay) : null;
        this.listenToContent(contentEnter, contentLeave);
      }
    }, {
      key: 'listenToContent',
      value: function listenToContent(enter) {
        var leave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (enter) {
          this.$el.on(this.constructor.contentEnterEventName, function (event, $root) {
            return enter($root, event);
          });
        }
        if (leave) {
          this.$el.on(this.constructor.contentLeaveEventName, function (event, $root) {
            return leave($root, event);
          });
        }
      }
    }, {
      key: 'sayAboutContentEnter',
      value: function sayAboutContentEnter($content) {
        $content = this.constructor.filterContent($content, 'normasEntered');
        if ($content.length > 0) {
          $content.removeClass(this.constructor.preventContentEventsClassName);
          this.trigger(this.constructor.contentEnterEventName, [$content]);
        }
        return $content;
      }
    }, {
      key: 'sayAboutContentLeave',
      value: function sayAboutContentLeave($content) {
        $content = this.constructor.filterContent($content, 'normasLeft');
        if ($content.length > 0) {
          this.trigger(this.constructor.contentLeaveEventName, [$content]);
        }
        return $content;
      }
    }, {
      key: 'replaceContentInner',
      value: function replaceContentInner($container, content) {
        this.sayAboutContentLeave($container);
        $container.html(content);
        this.sayAboutContentEnter($container);
      }
    }, {
      key: 'replaceContent',
      value: function replaceContent($content, $newContent) {
        this.sayAboutContentLeave($content);
        if ($content.length === 1) {
          $content.replaceWith($newContent);
        } else {
          $newContent.insertBefore($content.first());
          $content.remove();
        }
        this.sayAboutContentEnter($newContent);
      }

      // private

    }], [{
      key: 'makeElementContentEnter',
      value: function makeElementContentEnter(selector, enter) {
        var _this2 = this;

        return function ($root) {
          $root.filter(selector).add($root.find(selector)).each$(function ($element) {
            if (!_this2.preventEventForElement($element)) {
              enter($element);
            }
          });
        };
      }
    }, {
      key: 'makeDelayedElementContentEnter',
      value: function makeDelayedElementContentEnter(contentEnter, delay) {
        return function ($root) {
          $root.data('contentEnterTimeoutId', setTimeout(function () {
            $root.removeData('contentEnterTimeoutId');
            if (document.documentElement.hasAttribute('data-turbolinks-preview')) {
              return;
            }
            contentEnter($root);
          }, delay));
        };
      }
    }, {
      key: 'makeElementContentLeave',
      value: function makeElementContentLeave(selector, leave, delay) {
        var _this3 = this;

        return function ($root) {
          if (delay > 0) {
            var timeoutId = $root.data('contentEnterTimeoutId');
            if (timeoutId) {
              clearTimeout(timeoutId);
              $root.removeData('contentEnterTimeoutId');
            }
          }
          if (leave) {
            $root.filter(selector).add($root.find(selector)).each$(function ($element) {
              if (!_this3.preventEventForElement($element)) {
                leave($element);
              }
            });
          }
        };
      }
    }, {
      key: 'preventEventForElement',
      value: function preventEventForElement($element) {
        return $element.closest('.' + this.preventContentEventsClassName).length > 0;
      }
    }, {
      key: 'filterContent',
      value: function filterContent($content, elementFlagName) {
        return $content.filter(function (_index, element) {
          if (element[elementFlagName]) {
            return false;
          } else {
            element[elementFlagName] = true;
            return true;
          }
        });
      }
    }]);

    return _class;
  }(Base), Object.defineProperty(_class, 'contentEnterEventName', {
    enumerable: true,
    writable: true,
    value: 'content:enter'
  }), Object.defineProperty(_class, 'contentLeaveEventName', {
    enumerable: true,
    writable: true,
    value: 'content:leave'
  }), Object.defineProperty(_class, 'preventContentEventsClassName', {
    enumerable: true,
    writable: true,
    value: 'js-prevent-normas'
  }), _temp;
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// require content mixin
/* harmony default export */ __webpack_exports__["a"] = (function (Base) {
  var _class, _temp;

  return _temp = _class = function (_Base) {
    _inherits(_class, _Base);

    function _class(options) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

      _this.bindPageEvents(options);
      _this.log('info', '"' + _this.instanceName + '" navigation mixin activated.');
      return _this;
    }

    _createClass(_class, [{
      key: 'bindPageEvents',
      value: function bindPageEvents(options) {
        if (options.Turbolinks || global.Turbolinks) {
          var turboNormasImportPath = 'normas' + (process.env.NODE_ENV === 'development' ? '/src/js' : '');
          this.log('warn', 'You have Turbolinks and can use \'' + turboNormasImportPath + '/normasWithTurbolinks\' instead \'normas\'.');
        }
        $(this.pageEnter.bind(this));
      }
    }, {
      key: 'listenToPage',
      value: function listenToPage(enter) {
        var leave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (enter) {
          this.listenEvents(this.constructor.pageEnterEventName, enter);
        }
        if (leave) {
          this.listenEvents(this.constructor.pageLeaveEventName, leave);
        }
      }
    }, {
      key: 'visit',
      value: function visit(location) {
        window.location = location;
      }
    }, {
      key: 'refreshPage',
      value: function refreshPage() {
        this.visit(window.location);
      }
    }, {
      key: 'setHash',
      value: function setHash(hash) {
        location.hash = hash;
      }
    }, {
      key: 'back',
      value: function back() {
        global.history.back();
      }
    }, {
      key: 'replaceLocation',
      value: function replaceLocation(url) {
        this.log('`replaceLocation` works only with Turbolinks.');
      }
    }, {
      key: 'pushLocation',
      value: function pushLocation(url) {
        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        if (global.history) global.history.pushState(state, title, url);
      }
    }, {
      key: 'sayAboutPageLoading',
      value: function sayAboutPageLoading(state) {
        this.log('`sayAboutPageLoading` works only with Turbolinks.');
      }
    }, {
      key: 'pageEnter',
      value: function pageEnter() {
        this.trigger(this.constructor.pageEnterEventName);
        this.sayAboutContentEnter(this.$el.find('body'));
      }
    }, {
      key: 'pageLeave',
      value: function pageLeave() {
        this.sayAboutContentLeave(this.$el.find('body'));
        this.trigger(this.constructor.pageLeaveEventName);
      }
    }]);

    return _class;
  }(Base), Object.defineProperty(_class, 'pageEnterEventName', {
    enumerable: true,
    writable: true,
    value: 'page:enter'
  }), Object.defineProperty(_class, 'pageLeaveEventName', {
    enumerable: true,
    writable: true,
    value: 'page:leave'
  }), _temp;
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3), __webpack_require__(4)))

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view__ = __webpack_require__(12);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: may be rename Views, views, View, view



// require content mixin
// require events mixin
/* harmony default export */ __webpack_exports__["a"] = (function (Base) {
  return function (_Base) {
    _inherits(_class2, _Base);

    function _class2(options) {
      _classCallCheck(this, _class2);

      var _this = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, options));

      Object.defineProperty(_this, 'View', {
        enumerable: true,
        writable: true,
        value: __WEBPACK_IMPORTED_MODULE_1__view__["a" /* default */]
      });
      Object.defineProperty(_this, 'viewClasses', {
        enumerable: true,
        writable: true,
        value: {}
      });
      Object.defineProperty(_this, 'viewInstances', {
        enumerable: true,
        writable: true,
        value: []
      });

      _this.viewOptions = _extends({
        debugMode: _this.debugMode,
        eventsDebug: _this.eventsDebug
      }, options.viewOptions);
      _this.log('info', '"' + _this.instanceName + '" navigation mixin activated.');
      return _this;
    }

    _createClass(_class2, [{
      key: 'registerView',
      value: function registerView(viewClass) {
        var _this2 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.viewClasses[viewClass.selector]) {
          this.error('View class for selector `' + viewClass.selector + '` already registered', this.viewClasses[viewClass.selector]);
          return;
        }
        this.viewClasses[viewClass.selector] = viewClass;
        this.listenToElement(viewClass.selector, function ($el) {
          return _this2.bindView($el, viewClass, options);
        }, function ($el) {
          return _this2.unbindView($el, viewClass);
        }, viewClass.delay);
      }
    }, {
      key: 'bindView',
      value: function bindView($el, viewClass, options) {
        if (!this.canBind($el, viewClass)) {
          return null;
        }
        if (viewClass.instanceIndex) {
          viewClass.instanceIndex += 1;
        } else {
          viewClass.instanceIndex = 1;
        }
        var view = new viewClass(_extends({}, this.viewOptions, options, {
          instanceName: viewClass.selector + '_' + viewClass.instanceIndex,
          $el: $el
        }));
        this.viewInstances.push(view);
        return view;
      }
    }, {
      key: 'canBind',
      value: function canBind($element, viewClass) {
        var view = this.getViewsOnElement($element, viewClass)[0];
        if (view) {
          this.log('warn', 'Element already has bound view', $element, viewClass, view);
          return false;
        }
        return true;
      }
    }, {
      key: 'unbindView',
      value: function unbindView($element, viewClass) {
        var view = this.getViewsOnElement($element, viewClass)[0];
        if (view) {
          view.terminate();
          this.viewInstances = Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["i" /* without */])(this.viewInstances, view);
        }
      }
    }, {
      key: 'getViewsOnElement',
      value: function getViewsOnElement($element) {
        var viewClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var el = $element instanceof $ ? $element[0] : $element;
        var filterOptions = { el: el };
        if (viewClass) {
          filterOptions.constructor = viewClass;
        }
        return Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["b" /* filter */])(this.viewInstances, filterOptions);
      }
    }, {
      key: 'getViewsInContainer',
      value: function getViewsInContainer($container) {
        var checkRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        return Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["b" /* filter */])(this.viewInstances, function (view) {
          return view.$el.closest($container).length > 0 && (checkRoot || view.el !== $container[0]);
        });
      }
    }, {
      key: 'getAllViews',
      value: function getAllViews(viewClass) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["b" /* filter */])(this.viewInstances, { constructor: viewClass });
      }
    }, {
      key: 'getFirstView',
      value: function getFirstView(viewClass) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["c" /* find */])(this.viewInstances, { constructor: viewClass });
      }
    }, {
      key: 'getFirstChildView',
      value: function getFirstChildView(viewClass) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["c" /* find */])(this.viewInstances, function (view) {
          return view instanceof viewClass;
        });
      }
    }]);

    return _class2;
  }(Base);
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_events__ = __webpack_require__(2);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _class = function (_normasEvents) {
  _inherits(_class, _normasEvents);

  _createClass(_class, [{
    key: 'initialize',

    // Override it with your own initialization logic.
    value: function initialize(options) {}

    // Override it (and use this super method) with your own unmount logic.

  }, {
    key: 'terminate',
    value: function terminate() {
      if (this.listenedEvents) {
        this.forgetEvents(this.listenedEvents);
        this.listenedEvents = null;
      }
    }
  }]);

  function _class(options) {
    _classCallCheck(this, _class);

    Object.assign(options, options.$el.data());

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

    _this.reflectOptions(options);
    _this.initializeEvents(options);
    _this.initialize(options);
    return _this;
  }

  _createClass(_class, [{
    key: 'reflectOptions',
    value: function reflectOptions(options) {
      var _this2 = this;

      Object.keys(options).forEach(function (attr) {
        if (_this2.hasOwnProperty(attr)) {
          _this2[attr] = options[attr];
        }
      });
    }
  }, {
    key: 'initializeEvents',
    value: function initializeEvents(_options) {
      var events = this.constructor.events;

      if (events) {
        if (!this.linkedEvents) {
          this.linkedEvents = this.linkEvents(Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["e" /* isFunction */])(events) ? events() : events);
        }
        this.listenedEvents = this.listenEvents(this.linkedEvents);
      }
    }
  }, {
    key: 'linkEvents',
    value: function linkEvents(events) {
      var _this3 = this;

      return Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["h" /* mapValues */])(events, function (handle) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["g" /* isString */])(handle) ? _this3[handle].bind(_this3) : _typeof(Object(__WEBPACK_IMPORTED_MODULE_0__lib_helpers__["f" /* isPlainObject */])(handle)) ? _this3.linkEvents(handle) : handle;
      });
    }
  }]);

  return _class;
}(Object(__WEBPACK_IMPORTED_MODULE_2__mixins_events__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__mixins_base__["a" /* default */]));

/* harmony default export */ __webpack_exports__["a"] = (_class);
;

/***/ })
/******/ ]);