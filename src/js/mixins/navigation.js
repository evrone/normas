// require content mixin
export default Base => (class extends Base {
  static pageEnterEventName = 'page:enter';
  static pageLeaveEventName = 'page:leave';

  constructor(options) {
    super(options);
    this.bindPageEvents(options);
    this.log('info', `"${this.instanceName}" navigation mixin activated.`);
  }

  bindPageEvents(options) {
    if (options.Turbolinks || global.Turbolinks) {
      const turboNormasImportPath = `normas${process.env.NODE_ENV === 'development' ? '/src/js' : ''}`;
      this.log('warn',
        `You have Turbolinks and can use '${turboNormasImportPath}/normasWithTurbolinks' instead 'normas'.`);
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
    this.log('`replaceLocation` works only with Turbolinks.');
  }

  pushLocation(url, title = null, state = null) {
    if (global.history) global.history.pushState(state, title, url);
  }

  sayAboutPageLoading(state) {
    this.log('`sayAboutPageLoading` works only with Turbolinks.');
  }

  pageEnter() {
    this.trigger(this.constructor.pageEnterEventName);
    this.sayAboutContentEnter(this.$el.find('body'));
  }

  pageLeave() {
    this.sayAboutContentLeave(this.$el.find('body'));
    this.trigger(this.constructor.pageLeaveEventName);
  }
});
