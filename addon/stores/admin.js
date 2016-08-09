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
      let adapter = this._super(type);
      let adminService = getOwner(this).lookup('service:admin');

      if (adapter.namespace) {
        namespaces = adapter.namespace.split('/');
      }

      namespaces.push(adminService.namespace);

      let namespace = namespaces.join('/');
      namespace = namespace.replace(/\/$/, '');

      if (isEmpty(namespace)) {
        namespace = undefined;
      }

      let AdminAdapter = adapter.constructor.extend({
        namespace
      });

      this.typeAdapter[type] = AdminAdapter.create();
    }

    return this.typeAdapter[type];
  }
});
