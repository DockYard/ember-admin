import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    return this.admin.store.filter(params.name, {}, function (item) {
      return !item.get('isNew');
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    var modelName = this.paramsFor('model-records').name;

    controller.set('recordType', modelName);
  }
});
