// require events mixin
export default Base => (class extends Base {
  static contentEnterEventName = 'content:enter';
  static contentLeaveEventName = 'content:leave';

  constructor(options) {
    super(options);
    if (NORMAS_DEBUG) {
      this.constructor.readOptions(this.logging, options.logging, {
        content: false,
        contentGrouping: true,
      });
      this.log('info', 'construct',
        `📰 "${this.instanceName}" content mixin activated.`,
        'logging.content =', this.logging.content);
    }
  }

  // subscription to content lifecycle

  listenToContent(enter, leave = null) {
    if (enter) {
      this.$el.on(this.constructor.contentEnterEventName, (event, $content) => enter($content, event));
    }
    if (leave) {
      this.$el.on(this.constructor.contentLeaveEventName, (event, $content) => leave($content, event));
    }
  }

  // manual content broadcasting

  sayAboutContentEnter($content) {
    return this.sayAboutContentMove('enter', this.constructor.contentEnterEventName, $content);
  }

  sayAboutContentLeave($content) {
    return this.sayAboutContentMove('leave', this.constructor.contentLeaveEventName, $content);
  }

  // private
  sayAboutContentMove(move, eventName, $content) {
    const enter = move === 'enter';
    $content = this.constructor.filterContent($content, (enter ? 'normasEntered' : 'normasLeft'), enter);
    if ($content.length > 0) {
      if (NORMAS_DEBUG) {
        this.logContent(move, $content);
      }
      this.trigger(eventName, $content);
      if (NORMAS_DEBUG && this.logging.contentGrouping) {
        this.log('groupEnd', 'content');
      }
    }
    return $content;
  }

  // helpers

  replaceContentInner($container, content) {
    this.sayAboutContentLeave($container);
    $container.html(content);
    this.sayAboutContentEnter($container);
  }

  replaceContent($content, $newContent) {
    if ($content.length > 1) {
      $content = $content.first();
    }
    this.sayAboutContentLeave($content);
    $content.replaceWith($newContent);
    this.sayAboutContentEnter($newContent);
  }

  // private

  logContent(logEvent, $content) {
    if (!NORMAS_DEBUG) {
      return;
    }
    const [eventName, ...eventStyles] = this.constructor.logCycle(logEvent, logEvent === 'enter', 5);
    const [contentName, ...contentStyles] = this.constructor.logBold(this.constructor.contentName($content));
    this.log(this.constructor.groupingMethod(this.logging.contentGrouping), 'content',
      `📰 content ${eventName} "${contentName}"`,
      ...eventStyles, ...contentStyles,
      $content);
  }

  static filterContent($content, elementFlagName, checkParentElement = false) {
    return $content.filter((_index, element) => {
      if (element[elementFlagName] || (checkParentElement && !element.parentElement)) {
        return false;
      }
      element[elementFlagName] = true;
      return true;
    });
  }
});
