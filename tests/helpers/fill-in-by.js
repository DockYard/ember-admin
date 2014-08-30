export { fillInByLabel , fillInByPlaceholder};

function fillInByLabel (text, value) {
  var label = find('label:contains("' + text + '")');
  var input;
  if (label.prop('for')) {
    input = find('#' + label.prop('for'));
  } else {
    input = label.find('input');
  }
  return fillIn(input, value);
}

function fillInByPlaceholder (text, value) {
  var input = find('[placeholder="'+text+'"]');

  return fillIn(input, value);
}
