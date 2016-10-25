import Ember from 'ember';
import { includes, removeObject } from 'ember-admin/utils/array';

const {
  get,
  getOwner,
  computed,
  A: emberArray,
  Controller
} = Ember;

export default Controller.extend({
  filteredModels: computed(function() {
    let admin = getOwner(this).lookup('store:admin');
    let {
      includedModels,
      excludedModels
    } = admin;

    return get(this, 'model').reduce(function(collection, name) {
      if (includedModels) {
        if (includes(includedModels, name)) {
          collection.push(name);
        }

        if (excludedModels && includes(excludedModels, name)) {
          removeObject(collection, name);
        }
      } else if (excludedModels) {
        if (!includes(excludedModels, name)) {
          collection.push(name);
        }
      } else {
        collection.push(name);
      }

      return collection;
    }, emberArray());
  })
});
