import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/model-records/model-record';
import { includes } from 'ember-admin/utils/array';

const {
  Mixin,
  A: emberArray,
  get,
  computed,
  computed: { filter },
  getOwner
} = Ember;

function columnIncludes(columnType, parameter) {
  return columnType && includes(columnType, parameter);
}

export default Mixin.create(RecordTypeMixin, {
  columns: computed('model', function() {
    let adapter = this.get('adminConfig.dataAdapter');
    let recordType = this.get('recordType');
    let type = adapter.getModelTypes().findBy('name', recordType);
    let { klass } = type;

    let keys = emberArray(['id']);

    klass.eachAttribute(function(key) {
      keys.push(key);
    });

    return keys;
  }),

  filteredColumns: filter('columns', function(name) {
    let modelName = get(this, 'model-record.name');
    let allowColumn = true;

    /*jshint -W024 */
    let {
      includedColumns: adminIncludedColumns,
      excludedColumns: adminExcludedColumns
    } = this.get('adminConfig');
    let {
      includedColumns,
      excludedColumns
    } = this;
    /*jshint +W024 */

    if (adminIncludedColumns) {
      if (!columnIncludes(adminIncludedColumns[modelName], name)) {
        allowColumn = false;
      }
    }

    if (adminExcludedColumns) {
      if (columnIncludes(adminExcludedColumns[modelName], name)) {
        allowColumn = false;
      }
    }

    if (columnIncludes(excludedColumns, name)) {
      allowColumn = false;
    }

    if (columnIncludes(includedColumns, name)) {
      allowColumn = true;
    }

    return allowColumn;
  })
});
