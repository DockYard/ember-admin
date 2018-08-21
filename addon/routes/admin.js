import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';

export default Route.extend({
  model() {
    return getOwner(this).lookup('data-adapter:main').getModelTypes().map(function(type) {
      return type.name;
    });
  }
});
