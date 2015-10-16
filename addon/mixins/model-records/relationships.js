import Ember from 'ember';
import { pushObject } from 'ember-admin/utils/array';

const {
  get,
  computed,
  isArray,
  Mixin,
  A: emberArray
} = Ember;

function relationshipMacro(type) {
  return computed('recordType', 'id', function() {

    return get(this, 'model')._debugInfo().propertyInfo.groups.filter(function(group) {
      return group.name === type;
    }).reduce((relationships, group) => {
      group.properties.forEach((property) => {
        let records = get(this, `model.${property}`);

        // This might have to be written in such a way
        // as to provide an observer for 'model.'+property
        // and push onto the array when that property is available
        if (!isArray(records)) {
          records = emberArray([records]);
        }

        const store = this.container.lookup('store:admin');
        const constructor = get(this, 'model.constructor');
        const inverse = constructor.inverseFor(property, store);
        const meta = constructor.metaForProperty(property);

        pushObject(relationships, {
          name:    property,
          records,
          type:    meta.type,
          inverse: inverse && inverse.name
        });
      });

      return relationships;
    }, emberArray());
  });
}

export default Mixin.create({
  hasMany: relationshipMacro('Has Many'),
  belongsTo: relationshipMacro('Belongs To'),
  relationshipTypes: computed('recordType', 'id', function() {
    return [get(this, 'hasMany'), get(this, 'belongsTo')];
  })
});
