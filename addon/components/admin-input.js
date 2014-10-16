import Ember from 'ember';

var set = Ember.set;
var get = Ember.get;
var computed = Ember.computed;

export default Ember.TextField.extend({
  value: computed('columnValue', function(key, value) {
    var columnValue = get(this, 'columnValue');
    var record = get(this, 'record');

    if (arguments.length > 1) {
      set(record, columnValue, value);
    }

    return get(record, columnValue);
  })
});
