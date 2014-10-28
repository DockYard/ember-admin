import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/routes/model-records/write';

export default Ember.Mixin.create(WriteMixin, {
  templateAdminPath: 'admin/edit',

  model: function(params) {
    var modelName = this.paramsFor('model-records').name;

    return this.admin.store.find(modelName, params.id);
  },

  actions: {
    destroyRecord: function(callback) {
      var _this = this;
      var canDestroy = window.confirm('Are you sure you want to destory this record?');
      var promise;

      if (canDestroy) {
        promise = this.get('controller.model').destroyRecord();
        callback(promise);

        promise.then(function() {
          _this.transitionTo('model-records', _this.paramsFor('model-records').name);
        });
      } else {
        callback(Ember.RSVP.Promise.reject());
      }
    }
  }
});
