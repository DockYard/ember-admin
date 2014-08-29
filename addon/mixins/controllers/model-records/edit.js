import Ember from 'ember';
import RelationshipsMixin from 'ember-admin/mixins/controllers/model-records/relationships';
import RecordTypeMixin from 'ember-admin/mixins/controllers/model-records/record-type';
import ColumnsMixin from 'ember-admin/mixins/controllers/model-records/columns';

export default Ember.Mixin.create(RecordTypeMixin, ColumnsMixin, RelationshipsMixin, {
  excludedColumns: ['id']
});
