import Ember from 'ember';

export default Ember.Mixin.create({
  'model-records': Ember.inject.controller(),
  recordType: Ember.computed.alias('model-records.recordType')
});
