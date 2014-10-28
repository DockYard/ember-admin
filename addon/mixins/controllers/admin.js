import Ember from 'ember';

export default Ember.Mixin.create({
  filteredModels: Ember.computed(function() {
    var includedModels = this.admin.includedModels;
    var excludedModels = this.admin.excludedModels;

    return this.get('model').reduce(function(collection, name) {
      if (includedModels) {
        if (includedModels.contains(name)) {
          collection.push(name);
        }

        if (excludedModels && excludedModels.contains(name)) {
          collection.removeObject(name);
        }
      } else if (excludedModels) {
        if (!excludedModels.contains(name)) {
          collection.push(name);
        }
      } else {
        collection.push(name);
      }

      return collection;
    }, []);
  })
});
