import { isFunction, isPlainObject, debounce, flatten } from '../lib/helpers';

export default Base => (class extends Base {
  constructor(options) {
    super(options);
    this.eventsDebug = this.debugMode && options.eventsDebug || false;
    if (this.eventsDebug) {
      this.eventsLogBuffer = [];
      this.eventsLog = debounce(this.eventsLog, 20);
    }
    this.log('info', `"${this.instanceName}" events mixin activated. eventsDebug =`, this.eventsDebug);
  }

  trigger(...args) {
    this.$el.trigger(...args);
  }

  listenEvents(...args) {
    const listeningArgs = this.listenEventsOnElement(this.$el, ...args);
    if (this.eventsDebug) {
      this.eventsLogBuffer = this.eventsLogBuffer.concat(listeningArgs);
      this.eventsLog();
    }
    return listeningArgs;
  }

  listenEventsOnElement($element, ...args) {
    const listeningArgs = this.constructor.listeningArguments(...args);
    listeningArgs.forEach(({ events, selector, handle }) => {
      $element.on(events, selector, handle);
    });
    return listeningArgs;
  }

  eventsLog() {
    this.log('table', this.eventsLogBuffer);
    this.eventsLogBuffer = [];
  }

  forgetEvents(listeningArgs) {
    this.forgetEventsOnElement(this.$el, listeningArgs);
  }

  forgetEventsOnElement($element, listeningArgs) {
    if (this.eventsDebug) {
      this.log('forget events', listeningArgs);
    }
    listeningArgs.forEach(({ events, selector, handle }) => {
      $element.off(events, selector, handle);
    });
  }

  static listeningArguments(selector, eventRule, handle) {
    if (isPlainObject(selector)) {
      eventRule = selector;
      selector = '';
    }

    if (isFunction(eventRule)) {
      handle = eventRule;
      eventRule = selector;
      selector = '';
    }

    if (isPlainObject(eventRule)) {
      return flatten(Object.keys(eventRule).map((key) => {
        let value = eventRule[key];
        return isPlainObject(value) ?
          this.listeningArguments(selector ? `${selector} ${key}` : key, value)
          :
          this.listeningArguments(selector, key, value);
      }));
    }

    if (!isFunction(handle)) {
      console.error(`handle isn't function in listening declaration! (selector: '${selector}')`); // eslint-disable-line no-console
      return [];
    }
    if (!eventRule) {
      console.error(`eventRule not defined! (selector: '${selector}')`); // eslint-disable-line no-console
      return [];
    }

    const selectors = eventRule.split(/\s+/);
    const eventName = selectors[0];
    selectors[0] = selector;

    if (!eventName) {
      console.error(`bad eventName in listening declaration! (selector: '${selector}')`); // eslint-disable-line no-console
      return [];
    }

    return [{
      events: eventName.replace(/\//g, ' '),
      selector: selectors.join(' ').trim(),
      handle: (event, ...args) => handle($(event.currentTarget), event, ...args),
    }];
  }
});
