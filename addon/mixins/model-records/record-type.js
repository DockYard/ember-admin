import Ember from 'ember';

const {
  inject,
  computed: { alias },
  Mixin
} = Ember;

export default Mixin.create({
  'model-records': inject.controller(),
  recordType: alias('model-records.recordType')
});
