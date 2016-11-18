import Ember from 'ember';
import EmberDataRouteMixin from 'ember-data-route';

const {
  get,
  Mixin
} = Ember;

export default Mixin.create(EmberDataRouteMixin, {
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
