// require navigation mixin
export default Base => (class extends Base {
  constructor(options) {
    super(options);
    if (!this.enablings) this.enablings = {};
    this.constructor.readOptions(this.enablings, options.enablings, { mutations: true });
    if (NORMAS_DEBUG) {
      this.log('info', 'construct',
          ...this.constructor.logColor(`🤖 "${this.instanceName}" MutationObserver %REPLACE%.`,
            this.enablings.mutations ? 'enabled' : 'disabled',
            this.enablings.mutations ? 'green' : 'blue'));
    }
    if (this.enablings.mutations) {
      if (MutationObserver) {
        this.observeMutations();
      } else if (NORMAS_DEBUG) {
        this.log('warn', 'construct', `🤖 "${this.instanceName}" mutation observer NOT SUPPORTED!`,
          this.constructor.readmeLink('-content-broadcasting'));
      }
    }
  }

  observeMutations() {
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    this.mutationObserver = new MutationObserver(mutations => mutations.forEach(this.checkMutations));
    this.mutationObserver.observe(this.$el[0], { childList: true, subtree: true });
  }

  checkMutations = (mutation) => {
    if (!this.navigationStarted || mutation.type !== 'childList') {
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

  static filterMutationNodes(nodes, checkParentElement = false) {
    return Array.prototype.filter.call(nodes, node => (
      node.nodeType === 1 &&
        !node.isPreview &&
        !['TITLE', 'META'].includes(node.tagName) &&
        node.className !== 'turbolinks-progress-bar' &&
        !(checkParentElement && !node.parentElement) &&
        !(node.parentElement && node.parentElement.tagName === 'HEAD')
    ));
  }
});
