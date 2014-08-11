import Ember from 'ember';

export default Ember.Mixin.create({
  needs: ['model-records'],
  columns: Ember.computed.mapBy('controllers.model-records.columns', 'name'),
  filteredColumns: Ember.computed.filter('columns', function(name) {
    var modelName = this.get('controllers.model-records.name');
    var allowColumn = true;

    if (this.admin.includedColumns && this.admin.includedColumns[modelName]) {
      if (this.admin.includedColumns[modelName].contains(name)) {
        allowColumn = true;
      } else {
        allowColumn = false;
      }
    } else if (this.admin.excludedColumns && this.admin.excludedColumns[modelName]) {
      if (this.admin.excludedColumns[modelName].contains(name)) {
        allowColumn = false;
      }
    }
    
    if (this.get('excludedColumns') && this.get('excludedColumns').contains(name)) {
      allowColumn = false;
    }

    if (this.get('includedColumns') && this.get('includedColumns').contains(name)) {
      allowColumn = true;
    }

    return allowColumn;
  })
});
