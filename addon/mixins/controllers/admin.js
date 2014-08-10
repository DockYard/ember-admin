import Ember from 'ember';

export default Ember.Mixin.create({
  filteredModels: Ember.computed(function() {
    var _this = this;

    return this.get('model').reduce(function(collection, name) {
      if (_this.admin.includedModels) {
        if (_this.admin.includedModels.contains(name)) {
          collection.push(name);
        }
        if (_this.admin.excludedModels && _this.admin.excludedModels.contains(name)) {
          collection.remove(name);
        }
      } else if (_this.admin.excludedModels) {
        if (!_this.admin.excludedModels.contains(name)) {
          collection.push(name);
        }
      } else {
        collection.push(name);
      }

      return collection;
    }, []);
  })
});
