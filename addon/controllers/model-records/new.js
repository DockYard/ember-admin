import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type';
import ColumnsMixin from 'ember-admin/mixins/model-records/columns';

const {
  get,
  set,
  observer,
  Controller
} = Ember;

export default Controller.extend(RecordTypeMixin, ColumnsMixin, {
  excludedColumns: ['id'],
  queryParams: ['relationship-name', 'relationship-id'],
  'relationship-name': null,
  'relationship-id': null,

  setupRelation: observer('model', function() {
    const name = get(this, 'relationship-name');
    const id   = get(this, 'relationship-id');

    if (name && id) {
      const meta = get(this, 'model').constructor.metaForProperty(name);

      this.admin.store.find(meta.type, id).then((model) => {
        if (meta.kind && meta.kind === 'hasMany') {
          get(this, `model.${name}`).pushObject(model);
        } else {
          set(this, `model.${name}`, model);
        }
      });
    }
  })
});
