export default function(text, value) {
  var label = find('label:contains("' + text + '")');
  var input;
  if (label.prop('for')) {
    input = find('#' + label.prop('for'));
  } else {
    input = label.find('input');
  }
  return fillIn(input, value);
}
