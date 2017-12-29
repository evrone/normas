export default class Base {
  constructor({ debugMode = true, $el = $(document), instanceName = 'NormasApp' }) {
    this.instanceName = instanceName;
    this.debugMode = debugMode;
    this.$el = $el;
    this.el = $el[0];
    this.log('info', `"${this.instanceName}" constructed.`);
  }

  $(...args) {
    return this.$el.find(...args);
  }

  log(...args) {
    if (!this.debugMode) return;
    let method = ['table', 'warn', 'info'].indexOf(args[0]) > -1 ? args.shift() : 'log';
    this._log(method, ...args);
  }

  error(...args) {
    this._log('error', ...args);
  }

  _log(method, ...args) {
    if (console && console[method]) {
      console[method](...args); // eslint-disable-line no-console
    }
  }
}
