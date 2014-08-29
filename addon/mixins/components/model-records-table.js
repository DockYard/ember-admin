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
