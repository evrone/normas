import 'css/s-popover';
import 'css/b-morpheus';

import normas from 'lib/normas';

const popoverTriggerSelector = '.js-popover-trigger';
const popoverSelector = '.js-popover';
let $activePopovers = $([]);

normas.listenEvents(popoverTriggerSelector, {
  click: clickOnTrigger,
  'ajax:before': ajaxBeforeOnTrigger,
  'ajax:success': ajaxSuccessOnTrigger,
});

normas.listenEvents(popoverSelector, {
  click: clickOnPopover,
  'click > .option': clickOnPopoverOption,
});

normas.listenEvents('click', () => { closeActivePopovers(normas.$el) });

function clickOnTrigger($trigger, event) {
  const $popover = getPopoverForTrigger($trigger);
  const isActive = $popover.is($activePopovers);
  closeActivePopovers($trigger.closest($activePopovers));
  if (!isActive) {
    $trigger.addClass('active');
    $popover.addClass('show');
    $popover.find(':input:not(:disabled, [readonly]):first').focus();
    $activePopovers = $activePopovers.add($popover);
  }
  return false;
}

function ajaxBeforeOnTrigger($trigger, event) {
  const $popover = getPopoverForTrigger($trigger);
  return !$popover.is($activePopovers);
  // normas.visit($trigger.attr('href'));
  // return false;
}

function ajaxSuccessOnTrigger($trigger, event, content) {
  const $popover = getPopoverForTrigger($trigger);
  let $content = $(content);
  let $innerContent = $content.find('.js-popover-content');
  $popover.html($innerContent.length > 0 ? $innerContent : $content);
  // normas.sayAboutContentLeave($popover).html($innerContent.length > 0 ? $innerContent : $content);
  // normas.sayAboutContentEnter($popover);
  $popover.data('ujsLoaded', true);
  return false;
}

function clickOnPopover($popover, event) {
  let $link = $(event.target).closest('a');
  if ($link.length > 0) {
    let href = $link.attr('href');
    if (href) {
      normas.visit(href);
    }
    closeActivePopovers($popover.parent());
  } else {
    closeActivePopovers($popover);
  }
  event.stopPropagation();
  return false;
}

function clickOnPopoverOption($option, event) {
  let $popover = $option.parent(popoverSelector);
  let $selected = $popover.prev('.selected');
  if ($selected.length) {
    $option.addClass('selected').siblings('.selected').removeClass('selected');
    $selected.html($option.html());
    let $field = $selected.prev('input');
    if ($field.length) {
      $field.val($option.data('value'));
    }
    closeActivePopovers(getTriggerForPopover($popover));
  } else {
    console.warn('No .selected element in clickOnPopoverOption()'); // eslint-disable-line
  }
}

function closeActivePopovers($root) {
  if ($root === undefined || $root.length === 0) {
    $root = normas.$el;
  }
  let $localActivePopovers = $root.find($activePopovers);
  if ($localActivePopovers.length === 0) {
    return false;
  }
  $localActivePopovers.removeClass('show');
  getTriggerForPopover($localActivePopovers).removeClass('active');
  $activePopovers = $activePopovers.not($localActivePopovers);
  return true;
}

function getPopoverForTrigger($trigger) {
  let $popover = $trigger.data('$popover');
  if (!$popover) {
    let customPopoverSelector = ($trigger.data('popoverSelector') || popoverSelector) + ':first'; // eslint-disable-line
    let popoverSelectorScope = $trigger.data('popoverSelectorScope') || 'find';
    $popover = popoverSelectorScope === '$' ?
      $(customPopoverSelector)
      :
      $trigger[popoverSelectorScope](customPopoverSelector);
    $trigger.data('$popover', $popover);
    $popover.data('$trigger', $trigger);
  }
  return $popover;
}

function getTriggerForPopover($popover) {
  return $popover.data('$trigger');
}
