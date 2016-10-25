import Ember from 'ember';

const {
  computed,
  get,
  getOwner,
  Mixin
} = Ember;

export default Mixin.create({
  'model-record': computed('recordType', function() {
    let adapter = this.get('adminConfig.dataAdapter');
    let type    = adapter.getModelTypes().findBy('name', get(this, 'recordType'));
    return adapter.wrapModelType(type.klass, get(this, 'recordType'));
  })
});
