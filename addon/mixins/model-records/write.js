import Ember from 'ember';
import EmberDataRouteMixin from 'ember-data-route';

const {
  get,
  Mixin
} = Ember;

export default Mixin.create(EmberDataRouteMixin, {
  renderTemplate() {
    const templatePath = `${this.templateAdminPath}/${this.paramsFor('model-records').name}`;
    const defaultTemplatePath = `${this.templateAdminPath}/default`;

    if (this.container.lookupFactory(`template:${templatePath}`)) {
      this.render(templatePath);
    } else {
      this.render(defaultTemplatePath);
    }
  },
  actions: {
    save(callback) {
      const promise = get(this, 'controller.model').save();
      callback(promise);

      promise.then(() => {
        this.transitionTo('model-records', this.paramsFor('model-records').name);
      });
    },
    cancel() {
      this.transitionTo('model-records', this.paramsFor('model-records').name);
    }
  },
  willTransitionConfirm() {
    return window.confirm('You have unsaved changes. Are you sure you want to continue?');
  }
});
