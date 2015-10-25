import Ember from 'ember';

const {
  set,
  Route,
} = Ember;

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    set(controller, 'recordType', this.paramsFor('model-records').name);
  }
});
