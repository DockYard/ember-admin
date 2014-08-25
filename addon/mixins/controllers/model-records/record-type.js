import Ember from 'ember';

export default Ember.Mixin.create({
  needs: ['model-records'],
  'model-record': Ember.computed.alias('controllers.model-records'),
  recordType: Ember.computed.alias('model-record.model.name')
});
