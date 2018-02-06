// require events mixin
export default Base => (class extends Base {
  static contentEnterEventName = 'content:enter';
  static contentLeaveEventName = 'content:leave';

  static preventContentEventsClassName = 'js-prevent-normas';
  static elementEnterTimeoutIdDataName = 'elementEnterTimeoutId';

  constructor(options) {
    super(options);
    Object.assign(this.logging, {
      content: this.constructor.readOption(options.logging, 'content', false),
      element: this.constructor.readOption(options.logging, 'element', true),
    });
    this.log('info', 'construct',
      `📰 "${this.instanceName}" content mixin activated.`,
      'logging.content =', this.logging.content,
      'logging.element =', this.logging.element);
  }

  listenToElement(selector, enter, leave = null, options = {}) {
    const delay = options.delay || 0;
    const silent = options.silent || false;
    const contentEnter = this.constructor.makeElementContentEnter(this, selector, enter, delay, silent);
    const contentLeave = this.constructor.makeElementContentLeave(this, selector, leave, delay, silent);
    this.listenToContent(contentEnter, contentLeave);
  }

  listenToContent(enter, leave = null) {
    if (enter) {
      this.$el.on(this.constructor.contentEnterEventName, (event, $content) => enter($content, event));
    }
    if (leave) {
      this.$el.on(this.constructor.contentLeaveEventName, (event, $content) => leave($content, event));
    }
  }

  sayAboutContentEnter($content) {
    $content = this.constructor.filterContent($content, 'normasEntered');
    if ($content.length > 0) {
      // ? $content.removeClass(this.constructor.preventContentEventsClassName);
      this.logContent('enter', $content);
      this.trigger(this.constructor.contentEnterEventName, $content);
    }
    return $content;
  }

  sayAboutContentLeave($content) {
    $content = this.constructor.filterContent($content, 'normasLeft');
    if ($content.length > 0) {
      this.logContent('leave', $content);
      this.trigger(this.constructor.contentLeaveEventName, $content);
    }
    return $content;
  }

  replaceContentInner($container, content) {
    this.sayAboutContentLeave($container);
    $container.html(content);
    this.sayAboutContentEnter($container);
  }

  replaceContent($content, $newContent) {
    this.sayAboutContentLeave($content);
    if ($content.length === 1) {
      $content.replaceWith($newContent);
    } else {
      $newContent.insertBefore($content.first());
      $content.remove();
    }
    this.sayAboutContentEnter($newContent);
  }

  // private

  logContent(logEvent, $content) {
    const [eventName, ...eventStyles] = this.constructor.logCycle(logEvent, logEvent === 'enter');
    const [contentName, ...contentStyles] = this.constructor.logBold(this.constructor.contentName($content));
    this.log('content',
      `📰 content ${eventName} "${contentName}"`,
      ...eventStyles, ...contentStyles,
      $content);
  }

  static makeElementContentEnter(instance, selector, enter, delay, silent) {
    return $content => {
      const $elements = this.contentElements($content, selector);
      if ($elements.length === 0) {
        return;
      }
      if (delay > 0) {
        $elements.data(this.elementEnterTimeoutIdDataName, setTimeout(() => {
          const $delayedElements = this.contentElements($content, $elements);
          $delayedElements.removeData(this.elementEnterTimeoutIdDataName);
          this.handleElements(instance, $delayedElements, selector, enter, 'enter', silent);
        }, delay));
      } else {
        this.handleElements(instance, $elements, selector, enter, 'enter', silent);
      }
    };
  }

  static makeElementContentLeave(instance, selector, leave, delay, silent) {
    if (!leave) {
      return null;
    }
    return $content => {
      let $elements = this.contentElements($content, selector);
      if ($elements.length === 0) {
        return;
      }
      if (delay > 0) {
        $elements = $elements.filter$($element => !$element.data(this.elementEnterTimeoutIdDataName));
      }
      if ($elements.length === 0) {
        return;
      }
      this.handleElements(instance, $elements, selector, leave, 'leave', silent);
    };
  }

  static handleElements(instance, $elements, selector, handle, handleName, silent) {
    $elements.each$($element => {
      const prevent = this.preventEventForElement($element);
      if (!silent) {
        let preventInfo, styledHandleName, handleStyles;
        const [elementName, ...elementStyles] = this.logBold(selector);
        if (prevent) {
          [preventInfo, ...handleStyles] = this.logColor('prevent ', 'blue');
          styledHandleName = handleName;
        } else {
          preventInfo = '';
          [styledHandleName, ...handleStyles] = this.logCycle(handleName, handleName === 'enter', 3);
        }
        instance.log('element',
          `💎 ${preventInfo}element ${styledHandleName} "${elementName}"`,
          ...handleStyles, ...elementStyles,
          $element);
      }
      if (!prevent) {
        handle($element);
      }
    });
  }

  static contentElements($content, selector) {
    return $content.filter(selector).add($content.find(selector));
  }

  static preventEventForElement($element) {
    return $element.closest(`.${this.preventContentEventsClassName}`).length > 0;
  }

  static filterContent($content, elementFlagName) {
    return $content.filter((_index, element) => {
      if (element[elementFlagName]) {
        return false;
      } else {
        element[elementFlagName] = true;
        return true;
      }
    });
  }
});
