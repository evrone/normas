import * as helpers from '../lib/helpers';
import dom from './dom';

export default class Base {
  static version = '0.4.0-rc1';
  static helpers = helpers;
  static dom = dom;
  helpers = helpers;
  dom = dom;

  constructor({ el = document, instanceName = 'NormasApp' }) {
    this.instanceName = instanceName;
    this.el = el;
    this.$el = $(el);
  }

  $(...args) {
    return this.$el.find(...args);
  }

  log(...args) {
    // nop
  }

  error(...args) {
    // nop
  }

  // protected

  static readOptions(dest, source, defaults) {
    Object.keys(defaults).forEach(key => {
      dest[key] = source && (key in source) ? source[key] : defaults[key];
    });
  }
}
