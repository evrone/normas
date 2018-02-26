'use strict';

function deepMerge(destination, source) {
  var result = Object.assign({}, destination);
  Object.keys(source).forEach(function (key) {
    if (source[key]) {
      if (isPlainObject(destination[key]) && isPlainObject(source[key])) {
        result[key] = deepMerge(destination[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  });
  return result;
}

/*!
 * React integration for Normas <https://github.com/evrone/normas/blob/master/src/js/extensions/react.js>
 *
 * @license MIT
 * @copyright Dmitry Karpunin <koderfunk@gmail.com>, 2017-2018
 */

var defaults$1 = {
  selector: '[data-react-component]',
  listenOptions: {}
};

function react (_ref, components) {
  var normas = _ref.normas,
      React = _ref.React,
      ReactDOM = _ref.ReactDOM;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _deepMerge = deepMerge(defaults$1, options),
      selector = _deepMerge.selector,
      listenOptions = _deepMerge.listenOptions;

  normas.listenToElement(selector, mountComponentToElement, unmountComponentFromElement, listenOptions);

  function mountComponentToElement($element) {
    var domNode = $element[0];
    var name = domNode.getAttribute('data-react-component');
    var props = JSON.parse(domNode.getAttribute('data-props'));
    var componentClass = components[name];
    var component = React.createElement(componentClass, props);
    ReactDOM.render(component, domNode);
  }

  function unmountComponentFromElement($element) {
    var domNode = $element[0];
    ReactDOM.unmountComponentAtNode(domNode);
  }
}

module.exports = react;
//# sourceMappingURL=react.js.map
