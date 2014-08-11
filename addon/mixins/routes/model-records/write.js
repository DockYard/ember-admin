import Ember from 'ember';
import EmberDataRouteMixin from 'ember-data-route/mixins/data-route';

export default Ember.Mixin.create(EmberDataRouteMixin, {
  renderTemplate: function() {
    var templatePath = this.templateAdminPath + this.modelFor('model-records').name;

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
    cancel: function() {
      this.transitionTo('model-records', this.modelFor('model-records').name);
    }
  },
  willTransitionConfirm: function() {
    return window.confirm("You have unsaved changes. Are you sure you want to continue?");
  }
});
