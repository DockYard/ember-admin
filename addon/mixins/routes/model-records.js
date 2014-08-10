import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    var adapter = this.container.lookup('data-adapter:main');
    var type    = adapter.getModelTypes().findBy('name', params.name);
    return adapter.wrapModelType(type.klass, params.name);
  }
});
