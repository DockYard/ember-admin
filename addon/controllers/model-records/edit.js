import Ember from 'ember';
import RelationshipsMixin from 'ember-admin/mixins/model-records/relationships';
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type';
import ColumnsMixin from 'ember-admin/mixins/model-records/columns';

export default Ember.Controller.extend(RecordTypeMixin, ColumnsMixin, RelationshipsMixin, {
  excludedColumns: ['id']
});
