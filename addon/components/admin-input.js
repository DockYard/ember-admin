import Ember from 'ember';

const set = Ember.set;
const get = Ember.get;
const computed = Ember.computed;

export default Ember.TextField.extend({
  value: computed('columnValue', {
    get: function() {
      const columnValue = get(this, 'columnValue');
      const record = get(this, 'record');
      return get(record, 'model.'+columnValue);
    },
    set: function(key, value) {
      const columnValue = get(this, 'columnValue');
      const record = get(this, 'record');
      set(record, 'model.'+columnValue, value);
      return value;
    }
  })
});
