import Ember from 'ember';

export default Ember.Object.extend({
  includedModels:  null,
  excludedModels:  null,

  includedColumns: null,
  excludedColumns: null,

  namespace: 'admin'
});
