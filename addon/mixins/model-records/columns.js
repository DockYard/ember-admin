import RecordTypeMixin from 'ember-admin/mixins/model-records/model-record';
import Mixin from '@ember/object/mixin';
import { A as emberArray } from '@ember/array';
import { includes } from 'ember-admin/utils/array';
import { get } from '@ember/object';
import { computed } from '@ember/object';
import { filter } from '@ember/object/computed';
import { getOwner } from '@ember/application';

function columnIncludes(columnType, parameter) {
  return columnType && includes(columnType, parameter);
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
