import Ember from 'ember';
import DS from 'ember-data';

export default DS.Store.extend({
  adapterFor: function(type) {
    var namespaces = [];
    var adapter = this._super(type);
    var adminService = this.container.lookup('service:admin');
    var namespace, AdminAdapter;

    if (!this.typeAdapter) {
      this.typeAdapter = {};
    }

    if (!this.typeAdapter[type]) {
      if (adapter.namespace) {
        namespaces = adapter.namespace.split('/');
      }

      namespaces.push(adminService.namespace);
      namespace = namespaces.join('/');

      if (Ember.isEmpty(namespace)) {
        namespace = undefined;
      }

      AdminAdapter = adapter.constructor.extend({
        namespace: namespace
      });

      this.typeAdapter[type] = AdminAdapter.create();
    }

    return this.typeAdapter[type];
  }
});
