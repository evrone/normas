// TODO: try build without this module for production
export default Base => (class extends Base {
  constructor(options) {
    super(options);
    this.constructor.readOptions(this, options, { debugMode: true });
    this.logging = {};
    this.constructor.readOptions(this.logging, options.logging, {
      construct: true,
      constructGrouping: true,
      constructPrefix: '🏗️',
      hideInstancesOf: [],
    });
    const [constructText, ...constructStyles] = this.constructor.logColor('construct', 'green');
    this.log(this.constructor.groupingMethod(this.logging.constructGrouping), 'construct',
      ...this.constructor.logBold(`${this.logging.constructPrefix} "%REPLACE%" ${constructText}`, this.instanceName),
      ...constructStyles,
      this);
  }

  static consoleMethods = ['log', 'group', 'groupEnd', 'groupCollapsed', 'info', 'table', 'warn'];

  log(...args) {
    if (!this.debugMode) return;
    const method = this.helpers.includes(this.constructor.consoleMethods, args[0]) ? args.shift() : 'log';
    if (this.helpers.intersection(Object.keys(this.logging), args[0]).length > 0 && !this.logging[args.shift()]) {
      return;
    }
    this.constructor.log(method, ...this.filterLog(args));
  }

  error(...args) {
    this.constructor.log('error', ...args);
  }

  // private

  filterLog(args) {
    return this.logging.hideInstancesOf.length === 0 ? args :
      this.helpers.filter(args, a => !this.helpers.find(this.logging.hideInstancesOf, c => a instanceof c));
  }

  static groupingMethod(grouping) {
    return (typeof grouping === 'string') ? grouping : (grouping ? 'group' : 'log');
  }

  static log(method, ...args) {
    if (console && console[method]) {
      console[method](...args); // eslint-disable-line no-console
    }
  }

  static logPlur(message, count, omitOne = true) {
    return message.replace('%COUNT%', omitOne && count === 1 ? '' : count).replace('%S%', count === 1 ? '' : 's');
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
    if (this.helpers.isPlainObject(stylingReplace)) {
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
    const contentCounts = this.helpers.countBy($content, content => {
      const classList = content.classList ? Array.prototype.map.call(content.classList, className => className) : [];
      return [content.tagName].concat(classList).join('.');
    });
    return Object.keys(contentCounts).map(name => {
      const count = contentCounts[name];
      return `${count > 1 ? count + ' ' : ''}${name}`;
    }).join(' + ');
  }

  static readmeLink(point) {
    return `Read https://github.com/evrone/normas#${point}`;
  }
});
