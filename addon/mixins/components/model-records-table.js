import Ember from 'ember';
import ColumnsMixin from 'ember-admin/mixins/controllers/model-records/columns';

export default Ember.Mixin.create(ColumnsMixin, {
  includedColumns: ['id'],
  defaultLayout: Ember.computed(function() {
    var templatePath = 'admin/index/' + this.get('recordType');
    if (!this.container.resolve('template:'+templatePath)) {
       templatePath = 'admin/index/default';
    }

    return this.container.lookup('template:'+templatePath);
  }),
  filteredRecords: Ember.computed('records', 'filter', function() {
    if (Ember.isBlank(this.get('filter'))) {
      return this.get('records');
    } else {
      var filter = this.get('filter').toLowerCase();
      var columns = this.get('filteredColumns');
      return this.get('records').filter(function(record) {
        var value;
        for(var i = 0; i < columns.length; i++) {
          value = (record.get(columns[i]) || '').toString().toLowerCase();

          if (value.indexOf(filter) > -1) {
            return true;
          }
        }
      });
    }
  }),
  relationshipGiven: Ember.computed('relationshipName', 'relationshipId', function() {
    return this.get('relationshipName') && this.get('relationshipId');
  }),
  hideCreate: Ember.computed('relationshipName', 'relationshipId', function() {
    if (this.get('relationshipName') && this.get('relationshipId')) {
      var constructor = this.admin.store.modelFor(this.get('recordType'));
      var kind = constructor.inverseFor(this.get('relationshipName')).kind;

      if (kind && kind === 'belongsTo' && this.get('records.length') > 0) {
        return true;
      }
    }
  })
});
