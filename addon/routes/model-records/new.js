import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/model-records/write';

const {
  inject,
  Route
} = Ember;

export default Route.extend(WriteMixin, {
  adminStore: inject.service(),

  model() {
    let store = this.get('adminStore');
    return store.createRecord(this.paramsFor('model-records').name);
  }
});
