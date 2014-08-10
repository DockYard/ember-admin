export default function() {
  var row = arguments[0];
  var values = Array.prototype.slice.call(arguments, 1, arguments.length);

  for (var i = 0; i < values.length; i++) {
    equal(row.find('td').eq(i).text().trim(), values[i]);
  }
}
