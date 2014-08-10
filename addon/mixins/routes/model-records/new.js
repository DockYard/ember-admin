import Ember from 'ember';

export default Ember.Mixin.create({
  model: function() {
    return this.admin.store.createRecord(this.modelFor('model-records').name);
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
    }
  }
});
