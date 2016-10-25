import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/model-records/write';

const {
  get,
  inject,
  Route,
  RSVP: { Promise }
} = Ember;

export default Route.extend(WriteMixin, {
  adminStore: inject.service(),
  templateAdminPath: 'admin/edit',

  model(params) {
    let store = this.get('adminStore');

    return store.find(this.paramsFor('model-records').name, params.id);
  },

  actions: {
    destroyRecord(callback) {
      let canDestroy = window.confirm('Are you sure you want to destroy this record?');
      let promise;

      if (canDestroy) {
        promise = get(this, 'controller.model').destroyRecord();
        callback(promise);

        promise.then(() => {
          this.transitionTo('model-records', this.paramsFor('model-records').name);
        });
      } else {
        promise = new Promise(function(resolve, reject) {
          reject();
        });
        callback(promise);
      }
    }
  }
});
