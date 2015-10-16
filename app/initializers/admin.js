import AdminStore from 'ember-admin/stores/admin';

export function initialize(registry, app) {
  registry.register('store:admin', AdminStore);
  app.inject('route', 'admin', 'service:admin');
  app.inject('controller', 'admin', 'service:admin');
  app.inject('component', 'admin', 'service:admin');
  app.inject('service:admin', 'store', 'store:admin');
};

export default {
  after: 'ember-data',
  name: 'admin',
  initialize: initialize
};
