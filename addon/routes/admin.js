import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model() {
    return this.container.lookup('data-adapter:main').getModelTypes().map(function(type) {
      return type.name;
    });
  }
});
