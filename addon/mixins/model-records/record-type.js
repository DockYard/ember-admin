import Ember from 'ember';

export default Ember.Mixin.create({
  needs: ['model-records'],
  recordType: Ember.computed.alias('controllers.model-records.recordType')
});
