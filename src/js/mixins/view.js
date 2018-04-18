export default Base => (class extends Base {
  // Override it with your own initialization logic (like componentDidUnmount in react).
  initialize(options) {
  }

  // Override it with your own unmount logic (like componentWillUnmount in react).
  terminate() {
  }

  // protected

  constructor(options) {
    Object.assign(options, Base.dom.data(options.el));
    super(options);
    this.reflectOptions(options);
    this.initializeEvents(options);
    this.initialize(options);
    if (NORMAS_DEBUG && this.logging.constructGrouping) {
      this.log('groupEnd', 'construct');
    }
  }

  destructor() {
    if (NORMAS_DEBUG) {
      const [destructText, ...destructStyles] = this.constructor.logColor('destructing', 'red');
      this.log(this.constructor.groupingMethod(this.logging.constructGrouping), 'construct',
        ...this.constructor.logBold(`${this.logging.constructPrefix} "%REPLACE%" ${destructText}`, this.instanceName),
        ...destructStyles,
        this);
    }
    this.terminate();
    if (this.listenedEvents) {
      this.forgetEvents(this.listenedEvents);
      this.listenedEvents = null;
    }
    if (NORMAS_DEBUG && this.logging.constructGrouping) {
      this.log('groupEnd', 'construct');
    }
  }

  reflectOptions(options) {
    if (!this.constructor.reflectOptions) {
      return;
    }
    Object.keys(options).forEach(attr => {
      if (this.constructor.reflectOptions.includes(attr)) {
        this[attr] = options[attr];
      }
    });
  }

  initializeEvents(_options) {
    const { events } = this.constructor;
    if (events) {
      if (!this.linkedEvents) {
        this.linkedEvents = this.linkEvents(this.helpers.isFunction(events) ? events() : events);
      }
      this.listenedEvents = this.listenEvents(this.linkedEvents);
    }
  }

  linkEvents(events) {
    return this.helpers.mapValues(events, handle => this.helpers.isString(handle) ?
      this[handle].bind(this)
      :
      (typeof this.helpers.isPlainObject(handle) ? this.linkEvents(handle) : handle)
    );
  }

  data(key, ...value) {
    this.dom.data(this.el, key, ...value);
  }
});
