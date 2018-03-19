/**
 * Turbolinks integration for Normas
 *
 * @see {@link https://github.com/evrone/normas#turbolinks-integration|Docs}
 * @see {@link https://github.com/evrone/normas/blob/master/src/js/mixins/turbolinks.js|Source}
 * @license MIT
 * @copyright Dmitry Karpunin <koderfunk@gmail.com>, 2017-2018
 */

// require navigation mixin
export default Base => (class extends Base {
  static turboPageEnterEventName = 'turbolinks:load';
  static turboPageLeaveEventName = 'turbolinks:before-cache';

  bindPageEvents(options) {
    this.Turbolinks = options.Turbolinks || global.Turbolinks;
    const turbolinksExists = !!this.Turbolinks;
    if (!this.enablings) this.enablings = {};
    this.constructor.readOptions(this.enablings, options.enablings, { turbolinks: turbolinksExists });
    if (NORMAS_DEBUG && options.enablings && options.enablings.turbolinks === true && !turbolinksExists) {
      this.error('🛤 Turbolinks: `options.enablings.turbolinks === true` but Turbolinks is not detected.',
        this.constructor.readmeLink('turbolinks-integration'));
    }
    if (NORMAS_DEBUG) {
      this.log('info', 'construct',
        ...this.constructor.logColor(`🛤 "${this.instanceName}" Turbolinks %REPLACE%.`,
          this.enablings.turbolinks ? 'enabled' : 'disabled',
          this.enablings.turbolinks ? 'green' : 'blue'));
    }
    if (this.enablings.turbolinks) {
      // Turbolinks connected :)
      // patchTurbolinks(this.Turbolinks); // TODO: check versions
      patchTurbolinksPreviewControl(this.Turbolinks);
      this.listenEvents(this.constructor.turboPageEnterEventName, this.pageEnter.bind(this));
      this.listenEvents(this.constructor.turboPageLeaveEventName, this.pageLeave.bind(this));
      if (options.Turbolinks) {
        options.Turbolinks.start();
      }
    } else {
      // No Turbolinks ;(
      if (NORMAS_DEBUG && options.enablings && options.enablings.turbolinks === false) {
        this.log('warn', 'construct',
          `🛤 You ${this.Turbolinks ? '' : 'do not '}have a Turbolinks and use integration, but \`options.enablings.turbolinks === false\`.`);
      }
      $(this.pageEnter.bind(this));
    }
  }

  visit(location) {
    if (this.enablings.turbolinks) {
      this.Turbolinks.visit(location);
    } else {
      super.visit(location);
    }
  }

  setHash(hash) {
    if (this.enablings.turbolinks) {
      let controller = this.Turbolinks.controller;
      controller.replaceHistoryWithLocationAndRestorationIdentifier(hash, controller.restorationIdentifier);
    } else {
      super.setHash(hash);
    }
  }

  replaceLocation(url) {
    if (this.enablings.turbolinks) {
      this.Turbolinks.controller.replaceHistoryWithLocationAndRestorationIdentifier(url);
    } else {
      super.replaceLocation(url);
    }
  }

  pushLocation(url) {
    if (this.enablings.turbolinks) {
      this.Turbolinks.controller.pushHistoryWithLocationAndRestorationIdentifier(url);
    } else {
      super.pushLocation(url);
    }
  }

  sayAboutPageLoading(state) {
    if (this.enablings.turbolinks) {
      const progressBar = this.Turbolinks.controller.adapter.progressBar;
      if (state) {
        progressBar.setValue(0);
        progressBar.show();
      } else {
        progressBar.hide();
      }
    } else {
      super.sayAboutPageLoading(state);
    }
  }
});

function patchTurbolinksPreviewControl(Turbolinks) {
  class OurView extends Turbolinks.View {
    render({ snapshot, error, isPreview }, callback) {
      this.markAsPreview(isPreview);
      if (snapshot) {
        // added `isPreview` argument
        this.renderSnapshot(snapshot, isPreview, callback);
      } else {
        this.renderError(error, callback);
      }
    }

    // added `isPreview` argument
    renderSnapshot(snapshot, isPreview, callback) {
      const renderer = new OurSnapshotRenderer(this.getSnapshot(), Turbolinks.Snapshot.wrap(snapshot), isPreview);
      renderer.delegate = this.delegate;
      renderer.render(callback);
    }
  }
  Turbolinks.View = OurView;

  class OurSnapshotRenderer extends Turbolinks.SnapshotRenderer {
    // added `isPreview` argument
    constructor(currentSnapshot, newSnapshot, isPreview) {
      super(currentSnapshot, newSnapshot);
      if (isPreview) {
        this.newBody = this.newBody.cloneNode(true);
        this.newBody.isPreview = true;
      }
    }
  }
}

function patchTurbolinks(Turbolinks) {
  class OurHeadDetails extends Turbolinks.HeadDetails {
    constructor(...args) {
      super(...args);
      this.elements = {};
      $(this.element).children().each((index, element) => {
        let key = turboElementToKey(element);
        if (!this.elements[key]) {
          this.elements[key] = {
            type: turboElementType(element),
            tracked: turboElementIsTracked(element),
            elements: [],
          };
        }
        this.elements[key].elements.push(element);
      });
    }
    // getTrackedElementSignature() {
    //   let sign = super.getTrackedElementSignature();
    //   console.log('sign ', sign);
    //   return sign;
    // }
  }
  Turbolinks.HeadDetails = OurHeadDetails;
}

// Injection in Turbolinks.HeadDetails for override this logic:
function turboElementToKey(element) {
  let url = element.getAttribute('src') || element.getAttribute('href');
  if (url) {
    let cuts = url.split('/');
    cuts = cuts[cuts.length - 1];
    if (cuts) { url = cuts }
  }
  return url || element.outerHTML;
}

function turboElementType(element) {
  if (turboElementIsScript(element)) {
    return 'script';
  } else if (turboElementIsStylesheet(element)) {
    return 'stylesheet';
  }
  return null;
}

function turboElementIsTracked(element) {
  return element.getAttribute('data-turbolinks-track') === 'reload';
}

function turboElementIsScript(element) {
  let tagName = element.tagName.toLowerCase();
  return tagName === 'script';
}

function turboElementIsStylesheet(element) {
  let tagName = element.tagName.toLowerCase();
  return tagName === 'style' || (tagName === 'link' && element.getAttribute('rel') === 'stylesheet');
}
