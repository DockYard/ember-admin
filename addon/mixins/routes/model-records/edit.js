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
      var canDestroy = window.confirm("Are you sure you want to destory this record?");
      var promise;

      if (canDestroy) {
        promise = this.get('controller.model').destroyRecord();
        callback(promise);

        promise.then(function() {
          _this.transitionTo('model-records', _this.modelFor('model-records').name);
        });
      } else {
        promise = new Ember.RSVP.Promise(function(resolve, reject) {
          reject();
        });
        callback(promise);
      }
    },
    cancel: function() {
      this.transitionTo('model-records', this.modelFor('model-records').name);
    }
  },
  willTransitionConfirm: function() {
    return window.confirm("You have unsaved changes. Are you sure you want to continue?");
  }
});
