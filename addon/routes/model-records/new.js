import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/model-records/write';

const {
  Route
} = Ember;

export default Route.extend(WriteMixin, {
  model() {
    return this.admin.store.createRecord(this.paramsFor('model-records').name);
  },
  templateAdminPath: 'admin/new'
});
