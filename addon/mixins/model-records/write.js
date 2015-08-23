import Ember from 'ember';
import EmberDataRouteMixin from 'ember-data-route';

export default Ember.Mixin.create(EmberDataRouteMixin, {
  renderTemplate: function() {
    var templatePath = [this.templateAdminPath, this.paramsFor('model-records').name].join('/');
    var defaultTemplatePath = [this.templateAdminPath, 'default'].join('/');
    
    if (this.container.lookupFactory('template:'+templatePath)) {
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
        _this.transitionTo('model-records', _this.paramsFor('model-records').name);
      });
    },
    cancel: function() {
      this.transitionTo('model-records', this.paramsFor('model-records').name);
    }
  },
  willTransitionConfirm: function() {
    return window.confirm("You have unsaved changes. Are you sure you want to continue?");
  }
});
