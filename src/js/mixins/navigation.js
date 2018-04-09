// require content mixin
export default Base => (class extends Base {
  static pageEnterEventName = 'page:enter';
  static pageLeaveEventName = 'page:leave';
  static navigationStartedEventName = 'navigation:started';
  static pageSelector = 'body';
  navigationStarted = false;

  constructor(options) {
    super(options);
    if (NORMAS_DEBUG) {
      this.constructor.readOptions(this.logging, options.logging, {
        navigation: true,
        navigationGrouping: true,
      });
    }
    this.bindPageEvents(options);
    if (NORMAS_DEBUG) {
      this.log('info', 'construct',
        `🗺 "${this.instanceName}" navigation mixin activated. logging.navigation =`, this.logging.navigation);
    }
  }

  onStart(callback) {
    this.$el.one(this.constructor.navigationStartedEventName, (event, $page) => callback($page));
  }

  bindPageEvents(options) {
    if (NORMAS_DEBUG && (options.Turbolinks || global.Turbolinks)) {
      this.log('warn',
        '🗺 You have Turbolinks, but not use integration.',
        this.constructor.readmeLink('turbolinks-integration'));
    }
    $(this.pageEnter.bind(this));
  }

  listenToPage(enter, leave = null) {
    if (enter) {
      this.$el.on(this.constructor.pageEnterEventName, (event, $page) => enter($page));
    }
    if (leave) {
      this.$el.on(this.constructor.pageLeaveEventName, (event, $page) => leave($page));
    }
  }

  visit(location) {
    window.location = location;
  }

  refreshPage() {
    this.visit(window.location);
  }

  setHash(hash) {
    location.hash = hash;
  }

  back() {
    global.history.back();
  }

  replaceLocation(url) {
    if (NORMAS_DEBUG) {
      this.log('warn', '🗺 `replaceLocation` works only with Turbolinks.');
    }
  }

  pushLocation(url, title = null, state = null) {
    if (global.history) global.history.pushState(state, title, url);
  }

  sayAboutPageLoading(state) {
    if (NORMAS_DEBUG) {
      this.log('warn', '🗺 `sayAboutPageLoading` works only with Turbolinks.');
    }
  }

  pageEnter() {
    if (!this.navigationStarted) {
      this.navigationStarted = true;
      this.trigger(this.constructor.navigationStartedEventName, $page);
      if (NORMAS_DEBUG && this.logging.constructGrouping) {
        this.log('groupEnd', 'construct');
      }
    }
    const $page = this.$page();
    if (NORMAS_DEBUG) {
      this.logPage('enter', $page);
    }
    this.trigger(this.constructor.pageEnterEventName, $page);
    this.sayAboutContentEnter($page);
  }

  pageLeave() {
    const $page = this.$page();
    if (NORMAS_DEBUG) {
      this.logPage('leave', $page);
    }
    this.sayAboutContentLeave($page);
    this.trigger(this.constructor.pageLeaveEventName, $page);
  }

  $page() {
    return this.$(this.constructor.pageSelector);
  }

  // private

  logPage(logEvent, $page) {
    if (!NORMAS_DEBUG || !this.debugMode || !this.logging.navigation) {
      return;
    }
    const enter = logEvent === 'enter';
    const [eventName, ...eventStyles] = this.constructor.logCycle(logEvent, enter, 10);
    if (this.logging.navigationGrouping) {
      this.logPageGroupEnd();
    }
    this.log(this.constructor.groupingMethod(this.logging.navigationGrouping), 'navigation',
      `🗺 page ${eventName}`,
      ...eventStyles,
      ...(enter ? [window.location.href] : []),
      $page);
    this.navigationGroup = true;
    if (enter && this.logging.navigationGrouping) {
      setTimeout(() => this.logPageGroupEnd(), 25);
    }
  }

  logPageGroupEnd() {
    if (NORMAS_DEBUG && this.navigationGroup) {
      this.log('groupEnd', 'navigation');
      this.navigationGroup = false;
    }
  }
});
