// require events mixin
// require content mixin
export default Base => (class extends Base {
  static preventContentEventsClassName = 'js-prevent-normas';
  static elementEnterTimeoutIdDataName = 'elementEnterTimeoutId';

  constructor(options) {
    super(options);
    if (NORMAS_DEBUG) {
      this.constructor.readOptions(this.logging, options.logging, { elements: true });
      this.log('info', 'construct',
        `💎 "${this.instanceName}" elements mixin activated.`,
        'logging.elements =', this.logging.elements);
    }
  }

  listenToElement(selector, enter, leave = null, options = {}) {
    options = Object.assign({ delay: 0, silent: false }, options);
    this.listenToContent(
      this.makeElementContentEnter(selector, enter, options),
      this.makeElementContentLeave(selector, leave, options),
    );
  }

  // private

  makeElementContentEnter(selector, enter, { delay, silent }) {
    return $content => {
      const $elements = this.constructor.contentElements($content, selector);
      if ($elements.length === 0) {
        return;
      }
      if (delay > 0) {
        $elements.data(this.constructor.elementEnterTimeoutIdDataName, setTimeout(() => {
          $content = $content.filter(node => node.parentElement);
          if ($content.length === 0) {
            return;
          }
          const $delayedElements = this.constructor.contentElements($content, $elements);
          $delayedElements.removeData(this.constructor.elementEnterTimeoutIdDataName);
          this.handleElements($delayedElements, selector, enter, 'enter', silent);
        }, delay));
      } else {
        this.handleElements($elements, selector, enter, 'enter', silent);
      }
    };
  }

  makeElementContentLeave(selector, leave, { delay, silent }) {
    if (!leave) {
      return null;
    }
    return $content => {
      let $elements = this.constructor.contentElements($content, selector);
      if ($elements.length === 0) {
        return;
      }
      if (delay > 0) {
        $elements = $elements.filter$($element => !$element.data(this.elementEnterTimeoutIdDataName));
      }
      if ($elements.length === 0) {
        return;
      }
      this.handleElements($elements, selector, leave, 'leave', silent);
    };
  }

  handleElements($elements, selector, handle, handleName, silent) {
    let preventedElements = [];
    const $handledElements = $elements.filter$($element => {
      if (!this.canCycleElement($element, selector, handleName)) {
        return false;
      }
      const prevent = this.constructor.preventEventForElement($element);
      if (prevent) {
        preventedElements.push($element[0]);
        return false;
      }
      handle($element);
      return true;
    });
    if (NORMAS_DEBUG && !silent) {
      this.logElements($handledElements, $(preventedElements), selector, handleName);
    }
  }

  canCycleElement($element, selector, handleName) {
    const normasElements = $element.data('normasElements');
    const selectorIndex = normasElements ? normasElements.indexOf(selector) : -1;
    if (handleName === 'enter') {
      if (selectorIndex !== -1) {
        if (NORMAS_DEBUG) {
          this.log('warn', 'elements',
            ...this.constructor.logBold('💎 element "%REPLACE%" already entered.', selector));
        }
        return false;
      }
      if (normasElements) {
        normasElements.push(selector);
      } else {
        $element.data('normasElements', [selector]);
      }
      return true;
    }
    if (selectorIndex !== -1) {
      normasElements.splice(selectorIndex, 1);
      return true;
    }
    if (NORMAS_DEBUG) {
      this.log('warn', 'elements',
        ...this.constructor.logBold('💎 element "%REPLACE%" try leave, but did not enter.', selector));
    }
    return false;
  }

  logElements($handledElements, $preventedElements, selector, handleName) {
    if (!NORMAS_DEBUG) {
      return;
    }
    const [elementName, ...elementStyles] = this.constructor.logBold(selector);
    if ($handledElements.length > 0) {
      const [styledHandleName, ...handleStyles] = this.constructor.logCycle(handleName, handleName === 'enter', 3);
      this._logElements($handledElements, '', styledHandleName, elementName, handleStyles, elementStyles);
    }
    if ($preventedElements.length > 0) {
      const [preventInfo, ...handleStyles] = this.constructor.logColor('prevent ', 'blue');
      this._logElements($preventedElements, preventInfo, handleName, elementName, handleStyles, elementStyles);
    }
  }

  _logElements($elements, preventInfo, handleName, elementName, handleStyles, elementStyles) {
    if (!NORMAS_DEBUG) {
      return;
    }
    const count = $elements.length;
    const plurElements = this.constructor.logPlur('element%S%', count);
    const [styledCount, ...countStyles] = count > 1 ? this.constructor.logBold(count) : [];
    const styles = [handleStyles];
    styles[preventInfo ? 'push' : 'unshift'](countStyles);
    this.log('elements',
      `💎 ${preventInfo}${styledCount ? styledCount + ' ' : ''}${plurElements} ${handleName} "${elementName}"`,
      ...this.helpers.flatten(styles), ...elementStyles,
      $elements);
  }

  static contentElements($content, selector) {
    return $content.filter(selector).add($content.find(selector));
  }

  static preventEventForElement($element) {
    return $element.closest(`.${this.preventContentEventsClassName}`).length > 0;
  }
});
