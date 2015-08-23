import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type';
import ColumnsMixin from 'ember-admin/mixins/model-records/columns';

export default Ember.Controller.extend(RecordTypeMixin, ColumnsMixin, {
  excludedColumns: ['id'],
  queryParams: ['relationship-name', 'relationship-id'],
  'relationship-name': null,
  'relationship-id': null,
  setupRelation: Ember.observer('model', function() {
    var name = this.get('relationship-name');
    var id   = this.get('relationship-id');

    if (name && id) {
      var _this = this;
      var meta = this.get('model').constructor.metaForProperty(name);

      this.admin.store.find(meta.type, id).then(function(model) {
        if (meta.kind && meta.kind === 'hasMany') {
          _this.get('model.'+name).pushObject(model);
        } else {
          _this.set('model.'+name, model);
        }
      });
    }
  })
});
