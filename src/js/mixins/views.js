// TODO: may be rename Views, views, View, view
import { filter, find, without } from '../lib/helpers';
import View from '../view';

// require content mixin
// require events mixin
export default Base => (class extends Base {
  View = View;
  viewClasses = {};
  viewInstances = [];

  constructor(options) {
    super(options);
    this.viewOptions = {
      debugMode: this.debugMode,
      logging: { ...this.logging },
      ...options.viewOptions,
    };
    this.log('info', 'construct', `🏭 "${this.instanceName}" views mixin activated.`);
  }

  registerView(viewClass, options = {}) {
    if (this.viewClasses[viewClass.selector]) {
      this.error(`🏭 View class for selector \`${viewClass.selector}\` already registered`,
        this.viewClasses[viewClass.selector]);
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
      ...this.viewOptions,
      ...options,
      instanceName: `${viewClass.selector}_${viewClass.instanceIndex}`,
      $el,
    });
    this.viewInstances.push(view);
    return view;
  }

  canBind($element, viewClass) {
    const view = this.getViewsOnElement($element, viewClass)[0];
    if (view) {
      this.log('warn', '🏭 Element already has bound view', $element, viewClass, view);
      return false;
    }
    return true;
  }

  unbindView($element, viewClass) {
    const view = this.getViewsOnElement($element, viewClass)[0];
    if (view) {
      view.destructor();
      this.viewInstances = without(this.viewInstances, view);
    }
  }

  getViewsOnElement($element, viewClass = null) {
    const el = $element instanceof $ ? $element[0] : $element;
    const filterOptions = { el };
    if (viewClass) {
      filterOptions.constructor = viewClass;
    }
    return filter(this.viewInstances, filterOptions);
  }

  getViewsInContainer($container, checkRoot = true) {
    return filter(this.viewInstances, view =>
      view.$el.closest($container).length > 0 && (checkRoot || view.el !== $container[0])
    );
  }

  getAllViews(viewClass) {
    return filter(this.viewInstances, { constructor: viewClass });
  }

  getFirstView(viewClass) {
    return find(this.viewInstances, { constructor: viewClass });
  }

  getFirstChildView(viewClass) {
    return find(this.viewInstances, view => view instanceof viewClass);
  }
});
