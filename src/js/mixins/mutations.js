// EXPERIMENTAL

let initialMutations = true;

export default Base => (class extends Base {
  constructor(options) {
    super(options);
    if (MutationObserver) {
      this.observeMutations();
      this.log('warn', `"${this.instanceName}" mutation observer activated. (EXPERIMENTAL feature)`);
    } else {
      this.log('warn', `"${this.instanceName}" mutation observer NOT DEFINED!`);
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
    const addedNodes = this.constructor.filterMutationNodes(mutation.addedNodes);

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

  static filterMutationNodes(nodes) {
    return Array.prototype.filter.call(nodes, node => {
      if (initialMutations) {
        node.normasInitialMutationReady = true;
        if (node.parentElement && node.parentElement.normasInitialMutationReady) {
          return false;
        }
      }
      return node.nodeType === 1 &&
        !node.isPreview &&
        node.tagName !== 'TITLE' && node.tagName !== 'META' &&
        (!node.parentElement || node.parentElement.tagName !== 'HEAD');
    });
  }
});
