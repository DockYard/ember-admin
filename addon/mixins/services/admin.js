import Ember from 'ember';

export default Ember.Mixin.create({
  includedModels:  null,
  excludedModels:  null,

  includedColumns: null,
  excludedColumns: null,

  namespace: 'admin'
});
