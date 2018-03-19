export default Base => (class extends Base {
  constructor(options) {
    super(options);
    if (NORMAS_DEBUG) {
      this.constructor.readOptions(this.logging, options.logging, {
        events: true,
        eventsDebounced: true,
        eventsTable: false,
      });
      if (this.debugMode && this.logging.events && this.logging.eventsDebounced) {
        this.eventsLogBuffer = [];
        this.logEventsDebounced = this.helpers.debounce(this.logEventsDebounced.bind(this), 20);
      }
      this.log('info', ['construct', 'events'],
        `🚦 "${this.instanceName}" events mixin activated.`,
        'logging.events =', this.logging.events,
        'logging.eventsDebounced =', this.logging.eventsDebounced,
        'logging.eventsTable =', this.logging.eventsTable);
    }
  }

  trigger(eventName, ...args) {
    this.$el.trigger(eventName, args);
  }

  listenEvents(...args) {
    return this.listenEventsOnElement(this.$el, ...args);
  }

  listenEventsOnElement($element, ...args) {
    const listeningArgs = this.constructor.listeningArguments(...args);
    if (NORMAS_DEBUG && this.debugMode && this.logging.events) {
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
    if (NORMAS_DEBUG) {
      this.logEventsOutput($element, listeningArgs, false);
    }
    listeningArgs.forEach(({ events, selector, handle }) => {
      $element.off(events, selector, handle);
    });
  }

  // private

  logEvents($element, listeningArgs) {
    if (!NORMAS_DEBUG) {
      return;
    }
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
    if (!NORMAS_DEBUG) {
      return;
    }
    const grouped = this.helpers.groupByInArray(this.eventsLogBuffer, 'element');
    grouped.forEach(([element, listeningArgs]) => {
      this.logEventsOutput($(element), listeningArgs, true);
    });
    this.eventsLogBuffer = [];
  }

  logEventsOutput($element, listeningArgs, enter) {
    if (!NORMAS_DEBUG || !this.logging.events) {
      return;
    };
    const elementName = $element[0] === this.el ? this.instanceName : this.constructor.contentName($element);
    const count = listeningArgs.length;
    const plurEvents = this.constructor.logPlur('event%S%', count);
    const [styledCount, ...countStyles] = count > 1 ? this.constructor.logBold(count) : [];
    const [cycleName, ...cycleStyles] = this.constructor.logCycle(enter ? 'listen on' : 'forget from', enter);
    const [styledElementName, ...elementStyles] = this.constructor.logBold(elementName);
    this.log('events',
      `🚦 ${styledCount ? styledCount + ' ' : ''}${plurEvents} ${cycleName} "${styledElementName}"`,
      ...countStyles, ...cycleStyles, ...elementStyles,
      $element, ...(this.logging.eventsTable ? [] : [listeningArgs]));
    if (!this.logging.eventsTable) return;
    this.log('table', listeningArgs.map(({ selector, events }) => ({ selector, events })));
  }

  static listeningArguments(selector, eventRule, handle) {
    if (this.helpers.isPlainObject(selector)) {
      eventRule = selector;
      selector = '';
    }

    if (this.helpers.isFunction(eventRule)) {
      handle = eventRule;
      eventRule = selector;
      selector = '';
    }

    if (this.helpers.isPlainObject(eventRule)) {
      return this.helpers.flatten(Object.keys(eventRule).map((key) => {
        let value = eventRule[key];
        return this.helpers.isPlainObject(value) ?
          this.listeningArguments(selector ? `${selector} ${key}` : key, value)
          :
          this.listeningArguments(selector, key, value);
      }));
    }

    if (!this.helpers.isFunction(handle)) {
      if (NORMAS_DEBUG) {
        console.error(`handle isn't function in listening declaration! (selector: '${selector}')`); // eslint-disable-line no-console
      }
      return [];
    }
    if (!eventRule) {
      if (NORMAS_DEBUG) {
        console.error(`eventRule not defined! (selector: '${selector}')`); // eslint-disable-line no-console
      }
      return [];
    }

    const selectors = eventRule.split(/\s+/);
    const eventName = selectors[0];
    selectors[0] = selector;

    if (!eventName) {
      if (NORMAS_DEBUG) {
        console.error(`bad eventName in listening declaration! (selector: '${selector}')`); // eslint-disable-line no-console
      }
      return [];
    }

    return [{
      events: eventName.replace(/\//g, ' '),
      selector: selectors.join(' ').trim(),
      handle: (event, ...args) => handle($(event.currentTarget), event, ...args),
    }];
  }
});
