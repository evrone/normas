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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// EXPERIMENTAL

var initialMutations = true;

/* harmony default export */ __webpack_exports__["default"] = (function (Base) {
  return function (_Base) {
    _inherits(_class2, _Base);

    function _class2(options) {
      _classCallCheck(this, _class2);

      var _this = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, options));

      Object.defineProperty(_this, 'checkMutations', {
        enumerable: true,
        writable: true,
        value: function value(mutation) {
          if (mutation.type !== 'childList') {
            return;
          }

          var removedNodes = _this.constructor.filterMutationNodes(mutation.removedNodes);
          var addedNodes = _this.constructor.filterMutationNodes(mutation.addedNodes);

          if (removedNodes.length > 0) {
            _this.sayAboutContentLeave($(removedNodes));
          }
          if (addedNodes.length > 0) {
            _this.sayAboutContentEnter($(addedNodes));
          }
        }
      });

      if (MutationObserver) {
        _this.observeMutations();
        _this.log('warn', '"' + _this.instanceName + '" mutation observer activated. (EXPERIMENTAL feature)');
      } else {
        _this.log('warn', '"' + _this.instanceName + '" mutation observer NOT DEFINED!');
      }
      return _this;
    }

    _createClass(_class2, [{
      key: 'observeMutations',
      value: function observeMutations() {
        var _this2 = this;

        // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
        this.mutationObserver = new MutationObserver(function (mutations) {
          return mutations.forEach(_this2.checkMutations);
        });
        this.mutationObserver.observe(this.$el[0], { childList: true, subtree: true });
      }
    }, {
      key: 'pageEnter',
      value: function pageEnter() {
        if (initialMutations) {
          initialMutations = false;
        }
        _get(_class2.prototype.__proto__ || Object.getPrototypeOf(_class2.prototype), 'pageEnter', this).call(this);
      }
    }], [{
      key: 'filterMutationNodes',
      value: function filterMutationNodes(nodes) {
        return Array.prototype.filter.call(nodes, function (node) {
          if (initialMutations) {
            node.normasInitialMutationReady = true;
            if (node.parentElement && node.parentElement.normasInitialMutationReady) {
              return false;
            }
          }
          return node.nodeType === 1 && !node.isPreview && node.tagName !== 'TITLE' && node.tagName !== 'META' && (!node.parentElement || node.parentElement.tagName !== 'HEAD');
        });
      }
    }]);

    return _class2;
  }(Base);
});

/***/ })

/******/ });