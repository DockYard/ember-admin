import Ember from 'ember';

const {
  get,
  inject,
  Route
} = Ember;

export default Route.extend({
  adminConfig: inject.service(),

  model() {
    let config = this.get('adminConfig');
    debugger;
    return config.store.findAll(this.paramsFor('model-records').name).then(function(records) {
      return records.filter(function(item) {
        return !get(item, 'isNew');
      });
    });
  }
});
