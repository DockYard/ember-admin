import Ember from 'ember';
import EmberDataRouteMixin from 'ember-data-route/mixins/data-route';

export default Ember.Mixin.create(EmberDataRouteMixin, {
  renderTemplate: function() {
    var modelName = this.paramsFor('model-records').name;
    var templatePath = [this.templateAdminPath, modelName].join('/');
    var defaultTemplatePath = [this.templateAdminPath, 'default'].join('/');

    if (this.container.resolve('template:' + templatePath)) {
      this.render(templatePath);
    } else {
      this.render(defaultTemplatePath);
    }
  },

  actions: {
    save: function(callback) {
      var _this = this;
      var modelName = this.paramsFor('model-records').name;
      var promise = this.get('controller.model').save();

      callback(promise);

      promise.then(function() {
        _this.transitionTo('model-records', modelName);
      });
    },

    cancel: function() {
      var modelName = this.paramsFor('model-records').name;

      this.transitionTo('model-records', modelName);
    }
  },

  willTransitionConfirm: function() {
    return window.confirm('You have unsaved changes. Are you sure you want to continue?');
  }
});
