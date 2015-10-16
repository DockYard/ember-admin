import Ember from 'ember';

const {
  Service
} = Ember;

export default Service.extend({
  includedModels: null,
  excludedModels: null,

  includedColumns: null,
  excludedColumns: null,

  namespace: 'admin'
});
