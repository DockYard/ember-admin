import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/routes/model-records/write';

export default Ember.Mixin.create(WriteMixin, {
  model: function() {
    return this.admin.store.createRecord(this.paramsFor('model-records').name);
  },
  templateAdminPath: 'admin/new'
});
