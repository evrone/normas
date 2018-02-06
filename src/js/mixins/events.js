import { isFunction, isPlainObject, debounce, flatten, groupByInArray } from '../lib/helpers';

export default Base => (class extends Base {
  static readOption(object, key, defaultValue) {
    return object && (key in object) ? object[key] : defaultValue;
  }

  constructor(options) {
    super(options);
    this.logging.events = this.constructor.readOption(options.logging, 'events', true);
    this.logging.eventsDebounced = this.constructor.readOption(options.logging, 'eventsDebounced', true);
    this.logging.eventsTable = this.constructor.readOption(options.logging, 'eventsTable', true);
    if (this.debugMode && this.logging.events && this.logging.eventsDebounced) {
      this.eventsLogBuffer = [];
      this.logEventsDebounced = debounce(this.logEventsDebounced.bind(this), 20);
    }
    this.log('info', 'construct',
      `🚦 "${this.instanceName}" events mixin activated.`,
      'logging.events =', this.logging.events,
      'logging.eventsDebounced =', this.logging.eventsDebounced,
      'logging.eventsTable =', this.logging.eventsTable);
  }

  trigger(eventName, ...args) {
    this.$el.trigger(eventName, args);
  }

  listenEvents(...args) {
    return this.listenEventsOnElement(this.$el, ...args);
  }

  listenEventsOnElement($element, ...args) {
    const listeningArgs = this.constructor.listeningArguments(...args);
    if (this.debugMode && this.logging.events) {
      this.logEvents($element, listeningArgs);
    }
    listeningArgs.forEach(({ events, selector, handle }) => {
      $element.on(events, selector, handle);
    });
    return listeningArgs;
  }
  
  forgetEvents(listeningArgs) {
    this.forgetEventsOnElement(this.$el, listeningArgs);
  }

  forgetEventsOnElement($element, listeningArgs) {
    this.logEventsOutput($element, listeningArgs, false);
    listeningArgs.forEach(({ events, selector, handle }) => {
      $element.off(events, selector, handle);
    });
  }

  // private

  logEvents($element, listeningArgs) {
    if (this.logging.eventsDebounced) {
      const element = $element[0];
      listeningArgs.forEach(args => { args.element = element; });
      this.eventsLogBuffer = this.eventsLogBuffer.concat(listeningArgs);
      this.logEventsDebounced();
    } else {
      this.logEventsOutput($element, listeningArgs, true);
    }
  }

  logEventsDebounced() {
    const grouped = groupByInArray(this.eventsLogBuffer, 'element');
    grouped.forEach(([element, listeningArgs]) => {
      this.logEventsOutput($(element), listeningArgs, true);
    });
    this.eventsLogBuffer = [];
  }

  logEventsOutput($element, listeningArgs, enter) {
    if (!this.logging.events) return;
    const elementName = $element[0] === this.el ? this.instanceName : this.constructor.contentName($element);
    const plurEvents = this.constructor.logPlur('event%S%', listeningArgs.length);
    const [styledCount, ...countStyles] = this.constructor.logBold(listeningArgs.length);
    const [cycleName, ...cycleStyles] = this.constructor.logCycle(enter ? 'listen on' : 'forget from', enter);
    const [styledElementName, ...elementStyles] = this.constructor.logBold(elementName);
    this.log('events',
      `🚦 ${styledCount} ${plurEvents} ${cycleName} "${styledElementName}"`,
      ...countStyles, ...cycleStyles, ...elementStyles,
      $element, ...(this.logging.eventsTable ? [] : [listeningArgs]));
    if (!this.logging.eventsTable) return;
    this.log('table', listeningArgs.map(({ selector, events }) => ({ selector, events })));
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
