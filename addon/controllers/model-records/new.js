import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type';
import ColumnsMixin from 'ember-admin/mixins/model-records/columns';

const {
  get,
  set,
  inject,
  observer,
  Controller
} = Ember;

export default Controller.extend(RecordTypeMixin, ColumnsMixin, {
  adminStore: inject.service(),

  excludedColumns: ['id'],
  queryParams: ['relationship-name', 'relationship-id'],
  'relationship-name': null,
  'relationship-id': null,

  setupRelation: observer('model', function() {
    let name = get(this, 'relationship-name');
    let id   = get(this, 'relationship-id');

    if (name && id) {
      let meta = get(this, 'model').constructor.metaForProperty(name);
      let store = this.get('adminStore');

      store.find(meta.type, id).then((model) => {
        if (meta.kind && meta.kind === 'hasMany') {
          get(this, `model.${name}`).pushObject(model);
        } else {
          set(this, `model.${name}`, model);
        }
      });
    }
  })
});
