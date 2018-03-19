/**
 * Views system for Normas
 *
 * @see {@link https://github.com/evrone/normas#-views|Docs}
 * @see {@link https://github.com/evrone/normas/blob/master/src/js/mixins/views.js|Source}
 * @license MIT
 * @copyright Dmitry Karpunin <koderfunk@gmail.com>, 2017-2018
 */

// TODO: may be rename Views, views, View, view
import normasView from './view';

export default Base => normasViews(Base, normasView(Base.NormasCore));

// require content mixin
// require events mixin
const normasViews = (Base, View) => (class extends Base {
  static View = View;
  View = View;
  viewClasses = {};
  viewInstances = [];

  constructor(options) {
    super(options);
    this.viewOptions = {
      debugMode: this.debugMode,
      ...options.viewOptions,
    };
    if (NORMAS_DEBUG) {
      this.viewOptions.logging = {
        ...this.logging,
        constructGrouping: 'groupCollapsed',
        constructPrefix: '🏭', // private
        eventsDebounced: false,
        ...(options.viewOptions && options.viewOptions.logging),
      };
      this.log('info', 'construct', `🏭 "${this.instanceName}" views mixin activated.`);
    }
  }

  registerView(viewClass, options = {}) {
    if (this.viewClasses[viewClass.selector]) {
      if (NORMAS_DEBUG) {
        this.error(`🏭 View class for selector \`${viewClass.selector}\` already registered`,
          this.viewClasses[viewClass.selector]);
      }
      return;
    }
    this.viewClasses[viewClass.selector] = viewClass;
    this.listenToElement(
      viewClass.selector,
      $el => this.bindView($el, viewClass, options),
      $el => this.unbindView($el, viewClass),
      {
        delay: viewClass.delay,
        silent: true,
      },
    );
  }

  bindView($el, viewClass, options) {
    if (!this.canBind($el, viewClass)) {
      return null;
    }
    if (viewClass.instanceIndex) {
      viewClass.instanceIndex += 1;
    } else {
      viewClass.instanceIndex = 1;
    }
    const view = new viewClass({
      ...this.helpers.deepMerge(this.viewOptions, options),
      instanceName: `${viewClass.selector}_${viewClass.instanceIndex}`,
      $el,
    });
    this.viewInstances.push(view);
    return view;
  }

  canBind($element, viewClass) {
    const view = this.getViewsOnElement($element, viewClass)[0];
    if (view) {
      if (NORMAS_DEBUG) {
        this.log('warn', '🏭 Element already has bound view', $element, viewClass, view);
      }
      return false;
    }
    return true;
  }

  unbindView($element, viewClass) {
    const view = this.getViewsOnElement($element, viewClass)[0];
    if (view) {
      view.destructor();
      this.viewInstances = this.helpers.without(this.viewInstances, view);
    }
  }

  getViewsOnElement($element, viewClass = null) {
    const el = $element instanceof $ ? $element[0] : $element;
    const filterOptions = { el };
    if (viewClass) {
      filterOptions.constructor = viewClass;
    }
    return this.helpers.filter(this.viewInstances, filterOptions);
  }

  getViewsInContainer($container, checkRoot = true) {
    return this.helpers.filter(this.viewInstances, view =>
      view.$el.closest($container).length > 0 && (checkRoot || view.el !== $container[0])
    );
  }

  getAllViews(viewClass) {
    return this.helpers.filter(this.viewInstances, { constructor: viewClass });
  }

  getFirstView(viewClass) {
    return this.helpers.find(this.viewInstances, { constructor: viewClass });
  }

  getFirstChildView(viewClass) {
    return this.helpers.find(this.viewInstances, view => view instanceof viewClass);
  }
});
