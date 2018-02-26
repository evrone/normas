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



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*!
 * Turbolinks integration for Normas <https://github.com/evrone/normas/blob/master/src/js/mixins/turbolinks.js>
 *
 * @license MIT
 * @copyright Dmitry Karpunin <koderfunk@gmail.com>, 2017-2018
 */

var turbolinks = (function (Base) {
  var _class, _temp;

  return _temp = _class = function (_Base) {
    inherits(_class, _Base);

    function _class() {
      classCallCheck(this, _class);
      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    createClass(_class, [{
      key: 'bindPageEvents',
      value: function bindPageEvents(options) {
        this.Turbolinks = options.Turbolinks || global.Turbolinks;
        var turbolinksExists = !!this.Turbolinks;
        if (!this.enablings) this.enablings = {};
        this.enablings.turbolinks = this.constructor.readOption(options.enablings, 'turbolinks', turbolinksExists);
        if (this.enablings.turbolinks === true && !turbolinksExists) {
          this.error('🛤 Turbolinks: `option.enablings.turbolinks === true` but `!turbolinksExists`');
        }
        this.log.apply(this, ['info', 'construct'].concat(toConsumableArray(this.constructor.logColor('\uD83D\uDEE4 "' + this.instanceName + '" Turbolinks %REPLACE%.', this.enablings.turbolinks ? 'enabled' : 'disabled', this.enablings.turbolinks ? 'green' : 'blue'))));
        if (this.enablings.turbolinks) {

          patchTurbolinksPreviewControl(this.Turbolinks);
          this.listenEvents(this.constructor.turboPageEnterEventName, this.pageEnter.bind(this));
          this.listenEvents(this.constructor.turboPageLeaveEventName, this.pageLeave.bind(this));
          if (options.Turbolinks) {
            options.Turbolinks.start();
          }
        } else {

          var turboNormasImportPath = 'normas' + (process.env.NODE_ENV === 'development' ? '/src/js' : '/dist/js');
          this.log('warn', 'construct', '\uD83D\uDEE4 You have' + (this.Turbolinks ? '' : 'n\'t') + ' Turbolinks ' + ('and use \'' + turboNormasImportPath + '/normasWithTurbolinks\', but `enablings.turbolinks === false`. ') + ('Use \'' + turboNormasImportPath + '/normas\' instead.'));
          $(this.pageEnter.bind(this));
        }
      }
    }, {
      key: 'visit',
      value: function visit(location) {
        if (this.enablings.turbolinks) {
          this.Turbolinks.visit(location);
        } else {
          get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'visit', this).call(this, location);
        }
      }
    }, {
      key: 'setHash',
      value: function setHash(hash) {
        if (this.enablings.turbolinks) {
          var controller = this.Turbolinks.controller;
          controller.replaceHistoryWithLocationAndRestorationIdentifier(hash, controller.restorationIdentifier);
        } else {
          get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'setHash', this).call(this, hash);
        }
      }
    }, {
      key: 'replaceLocation',
      value: function replaceLocation(url) {
        if (this.enablings.turbolinks) {
          this.Turbolinks.controller.replaceHistoryWithLocationAndRestorationIdentifier(url);
        } else {
          get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'replaceLocation', this).call(this, url);
        }
      }
    }, {
      key: 'pushLocation',
      value: function pushLocation(url) {
        if (this.enablings.turbolinks) {
          this.Turbolinks.controller.pushHistoryWithLocationAndRestorationIdentifier(url);
        } else {
          get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'pushLocation', this).call(this, url);
        }
      }
    }, {
      key: 'sayAboutPageLoading',
      value: function sayAboutPageLoading(state) {
        if (this.enablings.turbolinks) {
          var progressBar = this.Turbolinks.controller.adapter.progressBar;
          if (state) {
            progressBar.setValue(0);
            progressBar.show();
          } else {
            progressBar.hide();
          }
        } else {
          get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'sayAboutPageLoading', this).call(this, state);
        }
      }
    }]);
    return _class;
  }(Base), Object.defineProperty(_class, 'turboPageEnterEventName', {
    enumerable: true,
    writable: true,
    value: 'turbolinks:load'
  }), Object.defineProperty(_class, 'turboPageLeaveEventName', {
    enumerable: true,
    writable: true,
    value: 'turbolinks:before-cache'
  }), _temp;
});

function patchTurbolinksPreviewControl(Turbolinks) {
  var OurView = function (_Turbolinks$View) {
    inherits(OurView, _Turbolinks$View);

    function OurView() {
      classCallCheck(this, OurView);
      return possibleConstructorReturn(this, (OurView.__proto__ || Object.getPrototypeOf(OurView)).apply(this, arguments));
    }

    createClass(OurView, [{
      key: 'render',
      value: function render(_ref, callback) {
        var snapshot = _ref.snapshot,
            error = _ref.error,
            isPreview = _ref.isPreview;

        this.markAsPreview(isPreview);
        if (snapshot) {

          this.renderSnapshot(snapshot, isPreview, callback);
        } else {
          this.renderError(error, callback);
        }
      }

    }, {
      key: 'renderSnapshot',
      value: function renderSnapshot(snapshot, isPreview, callback) {
        var renderer = new OurSnapshotRenderer(this.getSnapshot(), Turbolinks.Snapshot.wrap(snapshot), isPreview);
        renderer.delegate = this.delegate;
        renderer.render(callback);
      }
    }]);
    return OurView;
  }(Turbolinks.View);

  Turbolinks.View = OurView;

  var OurSnapshotRenderer = function (_Turbolinks$SnapshotR) {
    inherits(OurSnapshotRenderer, _Turbolinks$SnapshotR);

    function OurSnapshotRenderer(currentSnapshot, newSnapshot, isPreview) {
      classCallCheck(this, OurSnapshotRenderer);

      var _this3 = possibleConstructorReturn(this, (OurSnapshotRenderer.__proto__ || Object.getPrototypeOf(OurSnapshotRenderer)).call(this, currentSnapshot, newSnapshot));

      if (isPreview) {
        _this3.newBody = _this3.newBody.cloneNode(true);
        _this3.newBody.isPreview = true;
      }
      return _this3;
    }

    return OurSnapshotRenderer;
  }(Turbolinks.SnapshotRenderer);
}

module.exports = turbolinks;
//# sourceMappingURL=turbolinks.js.map
