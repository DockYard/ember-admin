import Ember from 'ember';

export default Ember.Mixin.create({
  'model-record': Ember.computed('recordType', function() {
    var adapter = this.container.lookup('data-adapter:main');
    var recordType = this.get('recordType');
    var type = adapter.getModelTypes().findBy('name', recordType);

    return adapter.wrapModelType(type.klass, recordType);
  })
});
