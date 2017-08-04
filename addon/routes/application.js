import Ember from 'ember';

const {
  getOwner,
  inject,
  Route
} = Ember;

export default Route.extend({
  adminConfig: inject.service('admin-config'),

  beforeModel() {
    this.set('adminConfig.adminLoaded', true);
  },

  model() {
    let dataAdapter = this.get('adminConfig.dataAdapter');

    return dataAdapter.getModelTypes().map(function(type) {
      return type.name;
    });
  }
});
