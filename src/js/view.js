import { isFunction, isString, isPlainObject, mapValues } from './lib/helpers';
import NormasBase from './mixins/base';
import normasEvents from './mixins/events';

export default class extends normasEvents(NormasBase) {
  // Override it with your own initialization logic (like componentDidUnmount in react).
  initialize(options) {
  }

  // Override it with your own unmount logic (like componentWillUnmount in react).
  terminate() {
  }

  // protected

  constructor(options) {
    Object.assign(options, options.$el.data());
    super(options);
    this.reflectOptions(options);
    this.initializeEvents(options);
    this.initialize(options);
  }

  destructor() {
    this.log('info', 'construct',
      ...this.constructor.logColor(`🏗️ "${this.instanceName}" %REPLACE%.`, 'destructing', 'red'));
    this.terminate();
    if (this.listenedEvents) {
      this.forgetEvents(this.listenedEvents);
      this.listenedEvents = null;
    }
  }

  reflectOptions(options) {
    Object.keys(options).forEach(attr => {
      if (this.hasOwnProperty(attr)) {
        this[attr] = options[attr];
      }
    });
  }

  initializeEvents(_options) {
    const { events } = this.constructor;
    if (events) {
      if (!this.linkedEvents) {
        this.linkedEvents = this.linkEvents(isFunction(events) ? events() : events);
      }
      this.listenedEvents = this.listenEvents(this.linkedEvents);
    }
  }

  linkEvents(events) {
    return mapValues(events, handle => isString(handle) ?
      this[handle].bind(this)
      :
      (typeof isPlainObject(handle) ? this.linkEvents(handle) : handle)
    );
  }
};
