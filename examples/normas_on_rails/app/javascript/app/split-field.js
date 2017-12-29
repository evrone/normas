import normas from 'lib/normas';
import 'css/b-split-field';

normas.listenEvents('.b-split-field', {
  'ajax:send': () => normas.sayAboutPageLoading(true),
  'ajax:complete': () => normas.sayAboutPageLoading(false),
  'ajax:success    .js-split-row': ($splitRowControl, event, newRowHtml) => {
    $(newRowHtml).hide().appendTo($splitRowControl.closest('.b-split-field__cell')).fadeIn();
  },
  'ajax:success   .js-split-cell': ($splitCellControl, event, newCellHtml) => {
    $(newCellHtml).hide().insertAfter($splitCellControl.closest('.b-split-field__cell')).fadeIn();
  },
  'click        .js-remove-cell': $removeCellControl => {
    const $cell = $removeCellControl.closest('.b-split-field__cell');
    $cell.fadeOut(() => $cell.remove());
  },
  'ajax:error': ($target, event, other) => console.log(other),
});

// normas.listenToContent(
//   ($content) => console.log('new content', $content),
//   ($content) => console.log('removed content', $content),
// );

normas.listenToElement(
  '.b-split-field__cell',
  $cell => {
    console.log('>>> $cell', $cell);
    if ($cell.hasClass('init-cell')) {
      console.error('$cell.hasClass(\'init-cell\')');
    }
    $cell.addClass('init-cell');
  },
  $cell => {
    console.log('--- $cell', $cell);
    $cell.removeClass('init-cell');
  },
);
