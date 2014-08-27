import Ember from 'ember';

export default Ember.Mixin.create({
  'model-record': Ember.computed(function() {
    var adapter = this.container.lookup('data-adapter:main');
    var type    = adapter.getModelTypes().findBy('name', this.get('recordType'));
    return adapter.wrapModelType(type.klass, this.get('recordType'));
  }),
});
