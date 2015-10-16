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
      const columnValue = get(this, 'columnValue');
      const record = get(this, 'record');
      return get(record, `model.${columnValue}`);
    },
    set(key, value) {
      const columnValue = get(this, 'columnValue');
      const record = get(this, 'record');
      set(record, `model.${columnValue}`, value);
      return value;
    }
  })
});
