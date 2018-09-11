import Service from '@ember/service';

export default Service.extend({
  includedModels: null,
  excludedModels: null,

  includedColumns: null,
  excludedColumns: null,

  namespace: 'admin'
});
