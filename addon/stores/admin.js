import Ember from 'ember';
import DS from 'ember-data';

const {
  getOwner,
  isEmpty,
  get
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

      if (get(adapter, 'namespace')) {
        namespaces = get(adapter, 'namespace').split('/');
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
