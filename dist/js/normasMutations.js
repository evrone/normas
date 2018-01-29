'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// EXPERIMENTAL

var initialMutations = true;

var mutations = (function (Base) {
  return function (_Base) {
    inherits(_class2, _Base);

    function _class2(options) {
      classCallCheck(this, _class2);

      var _this = possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, options));

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

    createClass(_class2, [{
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
        get(_class2.prototype.__proto__ || Object.getPrototypeOf(_class2.prototype), 'pageEnter', this).call(this);
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

module.exports = mutations;
//# sourceMappingURL=normasMutations.js.map
