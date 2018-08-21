import { get } from '@ember/object';
import { getOwner } from '@ember/application';
import Mixin from '@ember/object/mixin';
import EmberDataRouteMixin from 'ember-data-route';

export default Mixin.create(EmberDataRouteMixin, {
  renderTemplate() {
    let templatePath = `${this.templateAdminPath}/${this.paramsFor('model-records').name}`;
    let defaultTemplatePath = `${this.templateAdminPath}/default`;

    if (getOwner(this).lookup(`template:${templatePath}`)) {
      this.render(templatePath);
    } else {
      this.render(defaultTemplatePath);
    }
  },
  actions: {
    save(callback) {
      let promise = get(this, 'controller.model').save();
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
