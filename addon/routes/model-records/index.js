import Ember from 'ember';

const {
  get,
  inject,
  Route
} = Ember;

export default Route.extend({
  adminStore: inject.service(),

  model() {
    let adminStore = this.get('adminStore');
    let params = this.paramsFor('model-records');

    return adminStore.findAll(params.name).then(function(records) {
      return records.filter(function(item) {
        return !get(item, 'isNew');
      });
    });
  },

  setupController(controller, resolved) {
    controller.set('records', resolved);
  }
});
