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
  })
});
