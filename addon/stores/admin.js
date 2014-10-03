import Ember from 'ember';
import DS from 'ember-data';

export default DS.Store.extend({
  adapterFor: function(type) {
    if (!this.typeAdapter) {
      this.typeAdapter = {};
    }
    if (!this.typeAdapter[type]) {
      var namespaces = [];
      var adapter = this._super(type);
      var adminService = this.container.lookup('service:admin');

      if (adapter.namespace) {
        namespaces = adapter.namespace.split('/');
      }

      namespaces.push(adminService.namespace);

      var namespace = namespaces.join('/');

      if (Ember.isEmpty(namespace)) {
        namespace = undefined;
      }

      var AdminAdapter = adapter.constructor.extend({
        namespace: namespace
      });

      this.typeAdapter[type] = AdminAdapter.create();
    }

    return this.typeAdapter[type];
  },
});
