import AdminStore from 'ember-admin/stores/admin';

export default {
  name: 'admin',
  initialize: function(container, app) {
    app.register('store:admin', AdminStore);
    app.inject('route', 'admin', 'service:admin');
    app.inject('controller', 'admin', 'service:admin');
    app.inject('component', 'admin', 'service:admin');
  }
};
