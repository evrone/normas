/**
 * React integration for Normas
 *
 * @see {@link https://github.com/evrone/normas#reactjs-integration|Docs}
 * @see {@link https://github.com/evrone/normas/blob/master/src/js/extensions/react.js|Source}
 * @license MIT
 * @copyright Dmitry Karpunin <koderfunk@gmail.com>, 2017-2018
 */

const defaultOptions = {
  selector: '[data-react-component]',
  listenOptions: {},
};

export default {
  normas: null,
  React: null,
  ReactDOM: null,
  PropTypes: null,
  components: {},

  init({ normas, app, React, ReactDOM, PropTypes }, options = {}) {
    const { selector, listenOptions } = normas.helpers.deepMerge(defaultOptions, options);
    this.normas = normas || app;
    this.React = React;
    this.ReactDOM = ReactDOM;
    this.PropTypes = PropTypes;

    normas.listenToElement(
      selector,
      this.mountComponentToElement.bind(this),
      this.unmountComponentFromElement.bind(this),
      listenOptions,
    );
  },

  registerComponents(components) {
    Object.assign(this.components, components);
  },

  // private

  mountComponentToElement($element) {
    const domNode = $element[0];
    const name = domNode.getAttribute('data-react-component');
    if (!name) {
      this.normas.error('No component name in', domNode);
      return;
    }
    const componentClass = this.components[name];
    if (!componentClass) {
      this.normas.error('No registered component class with name', name);
      return;
    }
    const propsString = domNode.getAttribute('data-props');
    const props = propsString ? JSON.parse(propsString) : null;
    const component = this.React.createElement(componentClass, props);
    this.ReactDOM.render(component, domNode);
  },

  unmountComponentFromElement($element) {
    const domNode = $element[0];
    this.ReactDOM.unmountComponentAtNode(domNode);
  },
}
