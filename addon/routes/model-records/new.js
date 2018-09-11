import Route from '@ember/routing/route';
import WriteMixin from 'ember-admin/mixins/model-records/write';

export default Route.extend(WriteMixin, {
  model() {
    return this.admin.store.createRecord(this.paramsFor('model-records').name);
  },
  templateAdminPath: 'admin/new'
});
