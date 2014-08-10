import DS from 'ember-data';

export default DS.Store.extend({
  adapterFor: function(type) {
    if (!this.typeAdapter[type]) {
      var adapter = this._super(type);
      var namespaces = [];
      if (adapter.namespace) {
        namespaces = adapter.namespace.split('/');
      }
      namespaces.push('admin');
      var AdminAdapter = adapter.constructor.extend({
        namespace: namespaces.join('/')
      });
      this.typeAdapter[type] = AdminAdapter.create();
    }

    return this.typeAdapter[type];
  },
  typeAdapter: {}
});
