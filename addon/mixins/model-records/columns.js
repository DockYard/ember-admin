import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/model-records/model-record';
import { contains } from 'ember-admin/utils/array';

const {
  get,
  computed,
  computed: { filter }
} = Ember;

function columnContains(columnType, parameter) {
  return columnType && contains(columnType, parameter);
}

export default Ember.Mixin.create(RecordTypeMixin, {
  columns: computed('model', function() {
    const container = get(this, 'container');
    const adapter = container.lookup('data-adapter:main');
    const recordType = this.get('recordType');
    const type = adapter.getModelTypes().findBy('name', recordType);
    const { klass } = type;

    const keys = Ember.A(['id']);

    klass.eachAttribute(function(key) {
      keys.push(key);
    });

    return keys;
  }),

  filteredColumns: filter('columns', function(name) {
    const modelName = get(this, 'model-record.name');
    let allowColumn = true;

    /*jshint -W024 */
    const {
      admin: {
        includedColumns: adminIncludedColumns,
        excludedColumns: adminExcludedColumns
      },
      includedColumns,
      excludedColumns
    } = this;
    /*jshint +W024 */

    if (adminIncludedColumns) {
      if (!columnContains(adminIncludedColumns[modelName], name)) {
        allowColumn = false;
      }
    }

    if (adminExcludedColumns) {
      if (columnContains(adminExcludedColumns[modelName], name)) {
        allowColumn = false;
      }
    }

    if (columnContains(excludedColumns, name)) {
      allowColumn = false;
    }

    if (columnContains(includedColumns, name)) {
      allowColumn = true;
    }

    return allowColumn;
  })
});
