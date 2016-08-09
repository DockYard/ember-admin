import Ember from 'ember';

const {
  computed,
  get,
  getOwner,
  Mixin
} = Ember;

export default Mixin.create({
  'model-record': computed('recordType', function() {
    let adapter = getOwner(this).lookup('data-adapter:main');
    let type    = adapter.getModelTypes().findBy('name', get(this, 'recordType'));
    return adapter.wrapModelType(type.klass, get(this, 'recordType'));
  })
});
