import Ember from 'ember';
import DS from 'ember-data';

const {
  getOwner,
  isEmpty
} = Ember;

const {
  Store
} = DS;

export default Store.extend({
  adapterFor(type) {
    if (!this.typeAdapter) {
      this.typeAdapter = {};
    }
    if (!this.typeAdapter[type]) {
      let namespaces = [];
      const adapter = this._super(type);
      const adminService = getOwner(this).lookup('service:admin');

      if (adapter.get('namespace')) {
        namespaces = adapter.get('namespace').split('/');
      }

      namespaces.push(adminService.namespace);

      let namespace = namespaces.join('/');
      namespace = namespace.replace(/\/$/, '');

      if (isEmpty(namespace)) {
        namespace = undefined;
      }

      const AdminAdapter = adapter.constructor.extend({
        namespace
      });

      this.typeAdapter[type] = AdminAdapter.create();
    }

    return this.typeAdapter[type];
  }
});
