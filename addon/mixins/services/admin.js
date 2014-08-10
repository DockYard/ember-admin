import Ember from 'ember';

export default Ember.Mixin.create({
  initStore: Ember.on('init', function() {
    this.set('store', this.container.lookup('store:admin'));
  }),
  store: null,
  includedModels: null,
  excludedModels: null,
  includeColumns: {
    presentation: ['bigName', 'name']
  }
});
