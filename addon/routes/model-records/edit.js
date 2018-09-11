import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { Promise } from 'rsvp';
import WriteMixin from 'ember-admin/mixins/model-records/write';

export default Route.extend(WriteMixin, {
  model(params) {
    return this.admin.store.find(this.paramsFor('model-records').name, params.id);
  },
  templateAdminPath: 'admin/edit',
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
