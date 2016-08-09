import Ember from 'ember';

const {
  get,
  set,
  computed,
  TextField
} = Ember;

export default TextField.extend({
  value: computed('columnValue', {
    get() {
      let columnValue = get(this, 'columnValue');
      let record = get(this, 'record');
      return get(record, `model.${columnValue}`);
    },
    set(key, value) {
      let columnValue = get(this, 'columnValue');
      let record = get(this, 'record');
      set(record, `model.${columnValue}`, value);
      return value;
    }
  })
});
