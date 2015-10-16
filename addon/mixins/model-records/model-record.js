import Ember from 'ember';

const {
  get,
  Mixin
} = Ember;

export default Mixin.create({
  'model-record': Ember.computed('recordType', function() {
    const adapter = this.container.lookup('data-adapter:main');
    const type    = adapter.getModelTypes().findBy('name', get(this, 'recordType'));
    return adapter.wrapModelType(type.klass, get(this, 'recordType'));
  })
});
