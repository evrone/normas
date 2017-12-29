import 'select2';
import 'select2/dist/css/select2';
import normas from 'lib/normas';

export function bindSelect2($element) {
  normas.log('bindSelect2');
  let element = $element[0]
  $element.select2();
  let select2 = $element.data('select2');
  // this and other changes in this commit resolve Select2 and Fastclick.js conflict
  // by https://github.com/select2/select2/issues/3222
  select2.$container.find('*').addClass('needsclick');
  if (element.hasAttribute('multiple')) {
    $element.on('change', onChangeMultipleSelect2);
  }
  let $search = select2.dropdown.$search || select2.selection.$search;
  $search.on('keydown', (event) => {
    if (event.which === 9 && select2.isOpen()) {
      $element.data('tabPressed', true);
    }
  });
}

export function unbindSelect2($element) {
  normas.log('unbindSelect2');
  if ($element.data('select2')) {
    $element.select2('destroy');
  }
}

normas.listenToPage(() => {
  $('.select2.select2-container').remove();
});

normas.listenToElement('select', bindSelect2, unbindSelect2, 50);

normas.listenEvents({
  // changeMedia: debounce(resizeSelects, 100 + 10),
  '.select2-selection--single': {
    focus(event) {
      let $select = $(event.currentTarget).closest('.select2-container').prev('select');
      // console.log('focus single, ', $select.attr('name'));
      if (!$select.data('closing')) {
        // console.log(', go open!');
        $select.select2('open');
      }
    },
  },
});
