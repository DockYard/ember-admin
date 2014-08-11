export { rowValuesEqual, inputPropertiesEqual };

function rowValuesEqual () {
  var row = arguments[0];
  var values = Array.prototype.slice.call(arguments, 1, arguments.length);
  var columns = row.find('td');
  var columnText;

  for (var i = 0; i < columns.length; i++) {
    columnText = columns.eq(i).text().trim();
    equal(columnText, values[i], 'did not expect column(' + (i + 1) + ') with value: ' + columnText);
  }
}

function inputPropertiesEqual() {
  var inputs = arguments[0];
  var values = Array.prototype.slice.call(arguments, 1, arguments.length);
  var labelText;

  for (var i = 0; i < inputs.length; i ++) {
    labelText = inputs.eq(i).parent().text().trim();
    equal(labelText, values[i], 'did not expect input(' + (i + 1) + ') for property: ' + labelText);
  }
}
