import Ember from 'ember';
import ColumnsMixin from 'ember-admin/mixins/model-records/columns';

export default Ember.Component.extend(ColumnsMixin, {
  includedColumns: ['id'],
  defaultLayout: Ember.computed(function() {
    var templatePath = 'admin/index/' + this.get('recordType');
    if (!this.container.lookupFactory('template:'+templatePath)) {
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
    var relationshipName = this.get('relationshipName');
    var relationshipId = this.get('relationshipId');

    if (relationshipId) {
      if (Ember.isNone(relationshipName)) {
        return true;
      } else {
        var store = this.admin.store;
        var constructor = store.modelFor(this.get('recordType'));
        var inverseFor = constructor.inverseFor(relationshipName, store);
        var kind = inverseFor.kind;
        if (kind && kind === 'belongsTo' && this.get('records.length') > 0) {
          return true;
        }
      }
    }
    return false;
  })
});
