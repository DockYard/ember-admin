import Controller from '@ember/controller';
import RelationshipsMixin from 'ember-admin/mixins/model-records/relationships';
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type';
import ColumnsMixin from 'ember-admin/mixins/model-records/columns';
import { A } from '@ember/array';

export default Controller.extend(RecordTypeMixin, ColumnsMixin, RelationshipsMixin, {
  excludedColumns: A(['id'])
});
