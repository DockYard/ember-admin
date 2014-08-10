import Ember from 'ember';

export default Ember.Mixin.create({
  needs: ['model-records'],
  columns: Ember.computed.mapBy('controllers.model-records.columns', 'name'),
  filteredColumns: Ember.computed.filter('columns', function(name) {
    return name !== 'id';
  })
});
