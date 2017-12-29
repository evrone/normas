import mapValues from 'lodash/mapValues';
import NormasBase from './mixins/base';
import normasEvents from './mixins/events';

export default class extends normasEvents(NormasBase) {
  // Override it with your own initialization logic.
  initialize(options) {
  }

  // Override it (and use this super method) with your own unmount logic.
  terminate() {
    if (this.listenedEvents) {
      this.forgetEvents(this.listenedEvents);
      this.listenedEvents = null;
    }
  }

  constructor(options) {
    Object.assign(options, options.$el.data());
    super(options);
    this.reflectOptions(options);
    this.initializeEvents(options);
    this.initialize(options);
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
        this.linkedEvents = this.linkEvents(typeof events === 'function' ? events() : events);
      }
      this.listenedEvents = this.listenEvents(this.linkedEvents);
    }
  }

  linkEvents(events) {
    return mapValues(events, handle => typeof handle === 'string' ?
      this[handle].bind(this)
      :
      (typeof handle === 'object' ? this.linkEvents(handle) : handle)
    );
  }
};
