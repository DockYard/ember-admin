import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    set(controller, 'recordType', this.paramsFor('model-records').name);
  }
});
