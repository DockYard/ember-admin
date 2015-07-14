import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/model-records/model-record';

var get    = Ember.get;
var filter = Ember.computed.filter;

function columnContains(columnType, parameter) {
  return columnType && columnType.contains(parameter);
}

export default Ember.Mixin.create(RecordTypeMixin, {
  columns: Ember.computed('model', function() {
    const adapter = this.get('container').lookup('data-adapter:main');
    const recordType = this.get('recordType');
    const type = adapter.getModelTypes().findBy('name', recordType);
    const klass = type.klass;

    const keys = Ember.A(['id']);

    klass.eachAttribute(function(key) {
      keys.push(key);
    });

    return keys;
  }),

  filteredColumns: filter('columns', function(name) {
    const modelName            = get(this, 'model-record.name');
    const adminIncludedColumns = this.admin.includedColumns;
    const adminExcludedColumns = this.admin.excludedColumns;
    const includedColumns      = this.includedColumns;
    const excludedColumns      = this.excludedColumns;
    var allowColumn            = true;

    if (adminIncludedColumns) {
      if (columnContains(adminIncludedColumns[modelName], name)) {
        allowColumn = true;
      } else {
        allowColumn = false;
      }
    }

    if (adminExcludedColumns) {
      if (columnContains(adminExcludedColumns[modelName], name)) {
        allowColumn = false;
      }
    }

    if (columnContains(excludedColumns, name)) { allowColumn = false; }
    if (columnContains(includedColumns, name)) { allowColumn = true; }

    return allowColumn;
  })
});
