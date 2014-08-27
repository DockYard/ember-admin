import Ember from 'ember';

export default Ember.Mixin.create({
  model: function() {
    return this.admin.store.find(this.modelFor('model-records'));
  }
});
