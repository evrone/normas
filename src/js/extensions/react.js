/**
 * React integration for Normas
 *
 * @see {@link https://github.com/evrone/normas#reactjs-integration|Docs}
 * @see {@link https://github.com/evrone/normas/blob/master/src/js/extensions/react.js|Source}
 * @license MIT
 * @copyright Dmitry Karpunin <koderfunk@gmail.com>, 2017-2018
 */

const defaults = {
  selector: '[data-react-component]',
  listenOptions: {},
};

export default function({ normas, React, ReactDOM }, components, options = {}) {
  const { selector, listenOptions } = normas.helpers.deepMerge(defaults, options);

  normas.listenToElement(
    selector,
    mountComponentToElement,
    unmountComponentFromElement,
    listenOptions,
  );

  function mountComponentToElement($element) {
    const domNode = $element[0];
    const name = domNode.getAttribute('data-react-component');
    const props = JSON.parse(domNode.getAttribute('data-props'));
    const componentClass = components[name];
    const component = React.createElement(componentClass, props);
    ReactDOM.render(component, domNode);
  }

  function unmountComponentFromElement($element) {
    const domNode = $element[0];
    ReactDOM.unmountComponentAtNode(domNode);
  }
};
