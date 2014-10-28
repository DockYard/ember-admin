import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/routes/model-records/write';

export default Ember.Mixin.create(WriteMixin, {
  templateAdminPath: 'admin/new',

  model: function() {
    var modelName = this.paramsFor('model-records').name;

    return this.admin.store.createRecord(modelName);
  }
});
