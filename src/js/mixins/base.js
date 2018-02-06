import { isPlainObject } from '../lib/helpers';

export default class Base {
  static version = '0.3.0';

  constructor({ debugMode = true, $el = $(document), instanceName = 'NormasApp', logging = {} }) {
    this.instanceName = instanceName;
    this.debugMode = debugMode;
    this.logging = {
      construct: this.constructor.readOption(logging, 'construct', true),
    };
    this.$el = $el;
    this.el = $el[0];
    this.log('info', 'construct',
      ...this.constructor.logColor(`🏗️ "${this.instanceName}" %REPLACE%.`, 'constructed', 'green'));
  }

  $(...args) {
    return this.$el.find(...args);
  }

  log(...args) {
    if (!this.debugMode) return;
    const method = ['table', 'warn', 'info'].includes(args[0]) ? args.shift() : 'log';
    if (Object.keys(this.logging).includes(args[0]) && !this.logging[args.shift()]) return;
    this.constructor.log(method, ...args);
  }

  error(...args) {
    this.constructor.log('error', ...args);
  }

  // private

  static log(method, ...args) {
    if (console && console[method]) {
      console[method](...args); // eslint-disable-line no-console
    }
  }

  static logPlur(message, count) {
    return message.replace('%COUNT%', count).replace('%S%', count === 1 ? '' : 's');
  }

  static logCycle(moveName, enter, intensity = 2) {
    return this.logColor(
      `${moveName} ${(enter ? '>' : '<').repeat(intensity)}`,
      enter ? 'green' : 'red',
    );
  }

  static logColor(template, colorText, color) {
    if (!color) {
      color = colorText;
      colorText = null;
    }
    return this.logStyle(template, colorText, { color });
  }

  static logBold(template, boldText) {
    return this.logStyle(template, boldText, { 'font-weight': 'bold' });
  }

  static logStyle(template, stylingReplace, style) {
    if (isPlainObject(stylingReplace)) {
      style = stylingReplace;
      stylingReplace = null;
    }
    if (!stylingReplace) {
      stylingReplace = template;
      template = null;
    }
    const stylePairs = Object.entries(style);
    const beginStyle = stylePairs.map(p => p.join(': ')).join('; ');
    const endStyle = stylePairs.map(([k]) => [k, 'inherit'].join(': ')).join('; ');
    stylingReplace = `%c${stylingReplace}%c`;
    if (template) {
      stylingReplace = template.replace('%REPLACE%', stylingReplace);
    }
    return [stylingReplace, beginStyle, endStyle];
  }

  static contentName($content) {
    const content = $content[0];
    const classList = content.classList ? Array.prototype.map.call(content.classList, className => className) : [];
    return [content.tagName].concat(classList).join('.');
  }
}
