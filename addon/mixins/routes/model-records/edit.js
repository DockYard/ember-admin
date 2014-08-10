import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    return this.admin.store.find(this.modelFor('model-records').name, params.id);
  },
  renderTemplate: function() {
    var templatePath = 'admin/edit/' + this.modelFor('model-records').name;

    if (this.container.resolve('template:'+templatePath)) {
      this.render(templatePath);
    } else {
      this.render();
    }
  },
  actions: {
    save: function(callback) {
      var _this = this;
      var promise = this.get('controller.model').save();
      callback(promise);

      promise.then(function() {
        _this.transitionTo('model-records', _this.modelFor('model-records').name);
      });
    },
    destroyRecord: function(callback) {
      var _this = this;
      var promise = this.get('controller.model').destroyRecord();
      callback(promise);

      promise.then(function() {
        _this.transitionTo('model-records', _this.modelFor('model-records').name);
      });
    }
  }
});
