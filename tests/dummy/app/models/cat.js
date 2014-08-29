import DS from 'ember-data';

export default DS.Model.extend({
  name:  DS.attr('string'),
  age:   DS.attr('number'),
  toys:  DS.hasMany('toy'),
  owner: DS.belongsTo('owner')
});
