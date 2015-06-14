import Ember from 'ember';

export default Ember.Service.extend({
  includedModels:  null,
  excludedModels:  null,

  includedColumns: null,
  excludedColumns: null,

  namespace: 'admin'
});
