import Ember from 'ember';
import EmberDataRouteMixin from 'ember-data-route/mixins/data-route';

export default Ember.Mixin.create(EmberDataRouteMixin, {
  renderTemplate: function() {
    var templatePath = [this.templateAdminPath, this.modelFor('model-records')].join('/');
    var defaultTemplatePath = [this.templateAdminPath, 'default'].join('/');

    if (this.container.resolve('template:'+templatePath)) {
      this.render(templatePath);
    } else {
      this.render(defaultTemplatePath);
    }
  },
  actions: {
    save: function(callback) {
      var _this = this;
      var promise = this.get('controller.model').save();
      callback(promise);

      promise.then(function() {
        _this.transitionTo('model-records', _this.modelFor('model-records'));
      });
    },
    cancel: function() {
      this.transitionTo('model-records', this.modelFor('model-records'));
    }
  },
  willTransitionConfirm: function() {
    return window.confirm("You have unsaved changes. Are you sure you want to continue?");
  }
});
