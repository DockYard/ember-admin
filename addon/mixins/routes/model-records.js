import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    return this.admin.store.find(params.name);
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('recordType', this.paramsFor('model-records').name);
  }
});
