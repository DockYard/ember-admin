import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/controllers/model-records/model-record';

var get    = Ember.get;
var filter = Ember.computed.filter;

function columnContains(columnType, parameter) {
  return columnType && columnType.contains(parameter);
}

export default Ember.Mixin.create(RecordTypeMixin, {
  columns: Ember.computed('model', function() {
    var klass = this.get('container').lookup('data-adapter:main').getModelTypes().findBy('name', this.get('recordType')).klass;

    var keys = Ember.A(['id']);

    klass.eachAttribute(function(key) {
      keys.push(key);
    });

    return keys;
  }),

  filteredColumns: filter('columns', function(name) {
    var modelName            = get(this, 'model-record.name');
    var adminIncludedColumns = this.admin.includedColumns;
    var adminExcludedColumns = this.admin.excludedColumns;
    var includedColumns      = this.includedColumns;
    var excludedColumns      = this.excludedColumns;
    var allowColumn          = true;

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
