import { computed } from '@ember/object';
import { get } from '@ember/object';
import { getOwner } from '@ember/application';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  'model-record': computed('recordType', function() {
    let adapter = getOwner(this).lookup('data-adapter:main');
    let type    = adapter.getModelTypes().findBy('name', get(this, 'recordType'));
    return adapter.wrapModelType(type.klass, get(this, 'recordType'));
  })
});
