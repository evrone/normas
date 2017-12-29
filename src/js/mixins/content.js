// require events mixin
export default Base => (class extends Base {
  static contentEnterEventName = 'content:enter';
  static contentLeaveEventName = 'content:leave';

  static preventContentEventsClassName = 'js-prevent-normas';

  constructor(options) {
    super(options);
    this.log('info', `"${this.instanceName}" content mixin activated.`);
  }

  listenToElement(selector, enter, leave = null, delay = 0) {
    let contentEnter = this.constructor.makeElementContentEnter(selector, enter);
    if (delay > 0) {
      contentEnter = this.constructor.makeDelayedElementContentEnter(contentEnter, delay);
    }
    const contentLeave = leave || delay > 0 ? this.constructor.makeElementContentLeave(selector, leave, delay) : null;
    this.listenToContent(contentEnter, contentLeave);
  }

  listenToContent(enter, leave = null) {
    if (enter) {
      this.$el.on(this.constructor.contentEnterEventName, (event, $root) => enter($root, event));
    }
    if (leave) {
      this.$el.on(this.constructor.contentLeaveEventName, (event, $root) => leave($root, event));
    }
  }

  sayAboutContentEnter($content) {
    $content = this.constructor.filterContent($content, 'normasEntered');
    if ($content.length > 0) {
      $content.removeClass(this.constructor.preventContentEventsClassName);
      this.trigger(this.constructor.contentEnterEventName, [$content]);
    }
    return $content;
  }

  sayAboutContentLeave($content) {
    $content = this.constructor.filterContent($content, 'normasLeft');
    if ($content.length > 0) {
      this.trigger(this.constructor.contentLeaveEventName, [$content]);
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

  static makeElementContentEnter(selector, enter) {
    return ($root) => {
      $root.filter(selector).add($root.find(selector)).each$($element => {
        if (!this.preventEventForElement($element)) {
          enter($element);
        }
      });
    };
  }

  static makeDelayedElementContentEnter(contentEnter, delay) {
    return ($root) => {
      $root.data('contentEnterTimeoutId', setTimeout(() => {
        $root.removeData('contentEnterTimeoutId');
        if (document.documentElement.hasAttribute('data-turbolinks-preview')) {
          return;
        }
        contentEnter($root);
      }, delay));
    };
  }

  static makeElementContentLeave(selector, leave, delay) {
    return ($root) => {
      if (delay > 0) {
        let timeoutId = $root.data('contentEnterTimeoutId');
        if (timeoutId) {
          clearTimeout(timeoutId);
          $root.removeData('contentEnterTimeoutId');
        }
      }
      if (leave) {
        $root.filter(selector).add($root.find(selector)).each$($element => {
          if (!this.preventEventForElement($element)) {
            leave($element);
          }
        });
      }
    };
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
