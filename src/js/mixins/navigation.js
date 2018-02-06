// require content mixin
export default Base => (class extends Base {
  static pageEnterEventName = 'page:enter';
  static pageLeaveEventName = 'page:leave';
  static pageSelector = 'body';

  constructor(options) {
    super(options);
    this.logging.navigation = this.constructor.readOption(options.logging, 'navigation', true);
    this.bindPageEvents(options);
    this.log('info', 'construct',
      `🗺 "${this.instanceName}" navigation mixin activated. logging.navigation =`, this.logging.navigation);
  }

  bindPageEvents(options) {
    if (options.Turbolinks || global.Turbolinks) {
      const turboNormasImportPath = `normas${process.env.NODE_ENV === 'development' ? '/src/js' : ''}`;
      this.log('warn', 'construct',
        `🗺 You have Turbolinks and can use '${turboNormasImportPath}/normasWithTurbolinks' instead 'normas'.`);
    }
    $(this.pageEnter.bind(this));
  }

  listenToPage(enter, leave = null) {
    if (enter) {
      this.listenEvents(this.constructor.pageEnterEventName, enter);
    }
    if (leave) {
      this.listenEvents(this.constructor.pageLeaveEventName, leave);
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
    this.log('warn', '🗺 `replaceLocation` works only with Turbolinks.');
  }

  pushLocation(url, title = null, state = null) {
    if (global.history) global.history.pushState(state, title, url);
  }

  sayAboutPageLoading(state) {
    this.log('warn', '🗺 `sayAboutPageLoading` works only with Turbolinks.');
  }

  pageEnter() {
    const $page = this.$page();
    this.logPage('enter', $page);
    this.trigger(this.constructor.pageEnterEventName, $page);
    this.sayAboutContentEnter($page);
  }

  pageLeave() {
    const $page = this.$page();
    this.logPage('leave', $page);
    this.sayAboutContentLeave($page);
    this.trigger(this.constructor.pageLeaveEventName, $page);
  }

  $page() {
    return this.$(this.constructor.pageSelector);
  }

  // private

  logPage(logEvent, $page) {
    const enter = logEvent === 'enter';
    const [eventName, ...eventStyles] = this.constructor.logCycle(logEvent, enter, 10);
    this.log('navigation', `🗺 page ${eventName}`, ...eventStyles, ...(enter ? [window.location.href] : []), $page);
  }
});
