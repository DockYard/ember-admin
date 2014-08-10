import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(options) {
  Ember.assert('You can only pass attributes to the `input` helper, not arguments', arguments.length < 2);

  options.hashTypes.value = options.hashTypes.columnValue;
  options.hash.value = options.data.keywords[options.hash.columnValue];

  delete options.hashTypes.columnValue;
  delete options.hash.columnValue;

  var hash = options.hash;
  var inputType = hash.type;
  var onEvent = hash.on;

  delete hash.type;
  delete hash.on;

  if (inputType === 'checkbox') {
    Ember.assert("{{input type='checkbox'}} does not support setting `value=someBooleanValue`; you must use `checked=someBooleanValue` instead.", options.hashTypes.value !== 'ID');
    return Ember.Handlebars.helpers.view.call(this, Ember.Checkbox, options);
  } else {
    if (inputType) { hash.type = inputType; }
    hash.onEvent = onEvent || 'enter';
    return Ember.Handlebars.helpers.view.call(this, Ember.TextField, options);
  }
});
