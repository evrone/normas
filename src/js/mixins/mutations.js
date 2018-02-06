// EXPERIMENTAL

let initialMutations = true;

export default Base => (class extends Base {
  constructor(options) {
    super(options);
    if (!this.enablings) this.enablings = {};
    this.enablings.mutations = this.constructor.readOption(options.enablings, 'mutations', true);
    this.log('info', 'construct',
      ...this.constructor.logColor(`🤖 "${this.instanceName}" MutationObserver %REPLACE%.`,
        this.enablings.turbolinks ? 'enabled' : 'disabled',
        this.enablings.turbolinks ? 'green' : 'blue'));
    if (this.enablings.mutations) {
      if (MutationObserver) {
        this.observeMutations();
        this.log('construct', `🤖 "${this.instanceName}" mutation observer activated. (EXPERIMENTAL feature)`);
      } else {
        this.log('warn', 'construct', `🤖 "${this.instanceName}" mutation observer NOT SUPPORTED!`);
      }
    }
  }

  observeMutations() {
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    this.mutationObserver = new MutationObserver(mutations => mutations.forEach(this.checkMutations));
    this.mutationObserver.observe(this.$el[0], { childList: true, subtree: true });
  }

  checkMutations = (mutation) => {
    if (mutation.type !== 'childList') {
      return;
    }

    const removedNodes = this.constructor.filterMutationNodes(mutation.removedNodes);
    const addedNodes = this.constructor.filterMutationNodes(mutation.addedNodes, true);

    if (removedNodes.length > 0) {
      this.sayAboutContentLeave($(removedNodes));
    }
    if (addedNodes.length > 0) {
      this.sayAboutContentEnter($(addedNodes));
    }
  };

  pageEnter() {
    if (initialMutations) {
      initialMutations = false;
    }
    super.pageEnter();
  }

  static filterMutationNodes(nodes, checkParentNode = false) {
    return Array.prototype.filter.call(nodes, node => {
      if (initialMutations) {
        node.normasInitialMutationReady = true;
        if (node.parentElement && node.parentElement.normasInitialMutationReady) {
          return false;
        }
      }
      return node.nodeType === 1 &&
        !node.isPreview &&
        !['TITLE', 'META'].includes(node.tagName) &&
        node.className !== 'turbolinks-progress-bar' &&
        !(checkParentNode && !node.parentElement) &&
        !(node.parentElement && node.parentElement.tagName === 'HEAD');
    });
  }
});
