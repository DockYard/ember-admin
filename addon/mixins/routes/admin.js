import Ember from 'ember';

export default Ember.Mixin.create({
  model: function() {
    return this.container.lookup('data-adapter:main').getModelTypes().map(function(type) {
      return type.name;
    });
  }
});
