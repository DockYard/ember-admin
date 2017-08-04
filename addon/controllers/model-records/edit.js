import Ember from 'ember';
import RelationshipsMixin from 'ember-admin/mixins/model-records/relationships';
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type';
import ColumnsMixin from 'ember-admin/mixins/model-records/columns';

const {
  inject,
  Controller
} = Ember;

export default Controller.extend(RecordTypeMixin, ColumnsMixin, RelationshipsMixin, {
  adminStore: inject.service(),
  adminConfig: inject.service(),
  excludedColumns: ['id']
});
