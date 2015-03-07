import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.container.lookup('data-adapter:main').getModelTypes().map(function(type) {
      return type.name;
    });
  }
});
