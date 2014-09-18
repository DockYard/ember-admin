export { rowValuesEqual, inputPropertiesEqual };

function rowValuesEqual () {
  var row = arguments[0];
  var values = Array.prototype.slice.call(arguments, 1, arguments.length);
  var columns = row.find('th, td');
  var columnText;

  equal(columns.length, values.length, 'expected ' + values.length + ' columns: (' + values.join(', ') + ')');

  for (var i = 0; i < columns.length; i++) {
    columnText = columns.eq(i).text().trim();
    equal(columnText, values[i], 'expected column(' + (i + 1) + ') with value: ' + values[i]);
  }
}

function inputPropertiesEqual() {
  var inputs = arguments[0];
  var values = Array.prototype.slice.call(arguments, 1, arguments.length);
  var labelText;

  equal(inputs.length, values.length, 'expected ' + values.length + ' inputs: (' + values.join(', ') + ')');

  for (var i = 0; i < inputs.length; i ++) {
    labelText = inputs.eq(i).parent().text().trim();
    equal(labelText, values[i], 'expected input(' + (i + 1) + ') for property: ' + values[i]);
  }
}
