import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/model-records/write';

export default Ember.Route.extend(WriteMixin, {
  model: function() {
    return this.admin.store.createRecord(this.paramsFor('model-records').name);
  },
  templateAdminPath: 'admin/new'
});
