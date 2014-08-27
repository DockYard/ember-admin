import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/routes/model-records/write';

export default Ember.Mixin.create(WriteMixin, {
  model: function(params) {
    return this.admin.store.find(this.modelFor('model-records'), params.id);
  },
  templateAdminPath: 'admin/edit',
  actions: {
    destroyRecord: function(callback) {
      var _this = this;
      var canDestroy = window.confirm("Are you sure you want to destory this record?");
      var promise;

      if (canDestroy) {
        promise = this.get('controller.model').destroyRecord();
        callback(promise);

        promise.then(function() {
          _this.transitionTo('model-records', _this.modelFor('model-records'));
        });
      } else {
        promise = new Ember.RSVP.Promise(function(resolve, reject) {
          reject();
        });
        callback(promise);
      }
    },
  }
});
