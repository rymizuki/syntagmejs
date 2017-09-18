(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["syntagme"] = factory();
	else
		root["syntagme"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dispatcher = __webpack_require__(1);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

var _config = __webpack_require__(5);

var _config2 = _interopRequireDefault(_config);

var _actionCreator = __webpack_require__(6);

var _actionCreator2 = _interopRequireDefault(_actionCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Syntagme = function () {
  function Syntagme() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Syntagme);

    this.store = args.store || new _store2.default();
    this.dispatcher = args.dispatcher || new _dispatcher2.default();
    this.config = _config2.default;
    this.listening_fg = false;
    this.connect();
  }

  _createClass(Syntagme, [{
    key: 'connect',
    value: function connect() {
      this.dispatcher.register(this.store.handle.bind(this.store));
      this.connected_fg = true;
    }
  }, {
    key: 'listen',
    value: function listen(listener) {
      var _this = this;

      this.store.listen(function () {
        _this.listening_fg = true;
        _this.dispatcher.dispatch({
          source: 'SYNTAGME',
          action: { type: 'INIT' }
        });
        if (listener) listener.call(null);
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(subscriber) {
      this.store.subscribe(subscriber);
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.store.getState();
    }
  }, {
    key: 'reducer',
    value: function reducer(_reducer) {
      return this.store.reducer(_reducer);
    }
  }, {
    key: 'dispatch',
    value: function dispatch(payload) {
      if (!this.listening_fg) {
        throw new Error('syntagme was not listening. call `app.listen()`');
      }
      this.dispatcher.dispatch(payload);
    }
  }, {
    key: 'handleAction',
    value: function handleAction(type, actionCreator) {
      return _actionCreator2.default.call(this, type, actionCreator);
    }
  }, {
    key: 'ac',
    value: function ac(type, actionCreator) {
      return this.handleAction(type, actionCreator);
    }
  }]);

  return Syntagme;
}();

function syntagme() {
  return new Syntagme();
}

module.exports = syntagme;
module.exports.Syntagme = Syntagme;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dispatching_fg = false;

var Dispatcher = function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this.handlers = [];
  }

  _createClass(Dispatcher, [{
    key: 'dispatch',
    value: function dispatch(payload) {
      if (payload.action == null || payload.action.type == null) {
        throw new Error('ActionType is not defined!');
      }
      if (dispatching_fg) {
        throw new Error('Dispatcher in progress.\n "' + payload.action.type + '" cannot dispatch.');
      }
      console.debug('[DISPATCHER]', payload.source, payload.action.type, payload);
      try {
        dispatching_fg = true;
        for (var i = 0; i < this.handlers.length; i++) {
          this.handlers[i](payload);
        }
      } catch (err) {
        throw err; // rethrow
      } finally {
        dispatching_fg = false;
      }
    }
  }, {
    key: 'register',
    value: function register(handler) {
      this.handlers.push(handler);
    }
  }]);

  return Dispatcher;
}();

exports.default = Dispatcher;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _includes = __webpack_require__(3);

var _includes2 = _interopRequireDefault(_includes);

var _remove = __webpack_require__(4);

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    this.subscribers = [];
    this.reducers = [];
  }

  _createClass(Store, [{
    key: 'subscribe',
    value: function subscribe(subscriber) {
      this.subscribers.push(subscriber);
    }
  }, {
    key: 'handle',
    value: function handle(payload) {
      var current_state = null;
      for (var i = 0; i < this.reducers.length; i++) {
        var previous_state = current_state || this.state;
        var state = this.reducers[i](payload, previous_state);
        if (state) current_state = state;
      }
      if (current_state && this.state != current_state) {
        this.state = current_state;
        for (var _i = 0; _i < this.subscribers.length; _i++) {
          this.subscribers[_i](current_state);
        }
      }
    }
  }, {
    key: 'reducer',
    value: function reducer(stuff) {
      var reducers = Array.isArray(stuff) ? stuff : [stuff];
      for (var i = 0; i < reducers.length; i++) {
        var reducer = reducers[i];
        if ('function' != typeof reducer) {
          throw new Error('Reducer may be not function');
        }
        if ((0, _includes2.default)(this.reducers, reducer)) {
          this.reducers = (0, _remove2.default)(this.reducers, reducer);
        }
      }
      this.reducers = this.reducers.concat(reducers);
      return reducers;
    }
  }, {
    key: 'listen',
    value: function listen(listener) {
      if (listener) listener.call(null);
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.state || null;
    }
  }]);

  return Store;
}();

exports.default = Store;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = includes;
function includes(array, element) {
  if (Array.prototype.includes) {
    return array.includes(element);
  } else {
    // XXX: Polyfil
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    var O = Object(array);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {
        k = 0;
      }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (element === currentElement || element !== element && currentElement !== currentElement) {
        // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = remove;
function remove(array, element) {
  var clone = array;
  var index = array.indexOf(element);
  if (index) {
    clone.splice(array.indexOf(element), 1);
  }
  return clone;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  prefix: {
    RESOLVE: '_RESOLVE',
    REJECT: '_REJECT'
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = actionCreator;
function actionCreator(type, stuff) {
  var _this = this;

  if ('function' === typeof stuff) {
    this.dispatch({
      source: 'ASYNC_ACTION',
      action: { type: type }
    });
    var result = stuff();
    if (null == result || 'function' !== typeof result.then) {
      throw new Error('Action must be return promise object.');
    }
    return result.then(function (action) {
      if (null == action.type) {
        action.type = type + _this.config.prefix.RESOLVE;
      }
      _this.dispatch({
        source: 'ASYNC_ACTION_RESOLVE',
        action: action
      });
      return action;
    }).catch(function (rejection) {
      _this.dispatch({
        source: 'ASYNC_ACTION_REJECT',
        action: { type: type + _this.config.prefix.REJECT, rejection: rejection }
      });
      return rejection;
    });
  } else {
    if ('object' !== (typeof stuff === 'undefined' ? 'undefined' : _typeof(stuff)) || Array.isArray(stuff)) {
      throw new Error('Action must be Object or Function.');
    }
    if (null == stuff.type) {
      stuff.type = type;
    }
    this.dispatch({ source: 'ACTION', action: stuff });
  }
}

/***/ })
/******/ ]);
});