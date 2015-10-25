import Ember from 'ember';
import { contains, removeObject } from 'ember-admin/utils/array';

const {
  get,
  computed,
  A: emberArray,
  Controller
} = Ember;

export default Controller.extend({
  filteredModels: computed(function() {
    const {
      includedModels,
      excludedModels
    } = this.admin;

    return get(this, 'model').reduce(function(collection, name) {
      if (includedModels) {
        if (contains(includedModels, name)) {
          collection.push(name);
        }

        if (excludedModels && contains(excludedModels, name)) {
          removeObject(collection, name);
        }
      } else if (excludedModels) {
        if (!contains(excludedModels, name)) {
          collection.push(name);
        }
      } else {
        collection.push(name);
      }

      return collection;
    }, emberArray());
  })
});
