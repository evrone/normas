$.fn.each$ = function (handle) {
  return this.each((index, element) => {
    handle($(element), index);
  });
};

// [showOrHide[, duration[, callback]]]
$.fn.slideToggleByState = function slideToggleByState(...a) {
  if (this.length > 0) {
    if (a.length > 0) {
      if (a.shift()) {
        this.slideDown(...a);
      } else {
        this.slideUp(...a);
      }
    } else {
      this.slideToggle();
    }
  }
  return this;
};

// http://css-tricks.com/snippets/jquery/mover-cursor-to-end-of-textarea/
$.fn.focusToEnd = function focusToEnd() {
  let $this = this.first();
  if ($this.is('select, :checkbox, :radio')) {
    $this.focus();
  } else {
    let val = $this.val();
    $this.focus().val('').val(val);
  }
  return this;
};

$.fn.focusTo = function focusTo(caretPos) {
  return this.each((index, element) => {
    if (element.createTextRange) {
      let range = element.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else if (element.selectionStart) {
      element.focus();
      element.setSelectionRange(caretPos, caretPos);
    } else {
      element.focus();
    }
  });
};

/*
 ** Returns the caret (cursor) position of the specified text field.
 ** Return value range is 0-oField.value.length.
 */
$.fn.caretPosition = function caretPosition() {
  // Initialize
  let iCaretPos = 0;
  let oField = this[0];

  // IE Support
  if (document.selection) {
    // Set focus on the element
    oField.focus();
    // To get cursor position, get empty selection range
    let oSel = document.selection.createRange();
    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);
    // The caret position is selection length
    iCaretPos = oSel.text.length;
  } else if (oField.selectionStart != null) {
    iCaretPos = oField.selectionStart;
  }

  // Return results
  return iCaretPos;
};
