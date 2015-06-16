import Ember from 'ember';

function relationshipMacro(type) {
  return Ember.computed('recordType', 'id', function() {
    var _this = this;

    return this.get('model')._debugInfo().propertyInfo.groups.filter(function(group) {
      if (group.name === type) {
        return true;
      }
    }).reduce(function(relationships, group) {
      group.properties.forEach(function(property) {
        var records = _this.get('model.' + property);

        // This might have to be written in such a way
        // as to provide an observer for 'model.'+property
        // and push onto the array when that property is available
        if (!Ember.isArray(records)) {
          records = Ember.A([records]);
        }

        var store = _this.container.lookup('store:admin');
        var constructor = _this.get('model.constructor');
        var inverse = constructor.inverseFor(property, store);
        var meta = constructor.metaForProperty(property);

        relationships.pushObject({
          name:    property,
          records: records,
          type:    meta.type,
          inverse: inverse && inverse.name
        });
      });

      return relationships;
    }, Ember.A());
  });
}

export default Ember.Mixin.create({
  hasMany: relationshipMacro('Has Many'),
  belongsTo: relationshipMacro('Belongs To'),
  relationshipTypes: Ember.computed('recordType', 'id', function() {
    return [this.get('hasMany'), this.get('belongsTo')];
  }),
});
