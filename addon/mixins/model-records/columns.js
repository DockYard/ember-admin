import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/model-records/model-record';
import { contains } from 'ember-admin/utils/array';

const {
  Mixin,
  A: emberArray,
  get,
  computed,
  computed: { filter },
  getOwner
} = Ember;

function columnContains(columnType, parameter) {
  return columnType && contains(columnType, parameter);
}

export default Mixin.create(RecordTypeMixin, {
  columns: computed('model', function() {
    let adapter = getOwner(this).lookup('data-adapter:main');
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
