import DS from 'ember-data';

export default DS.Model.extend({
  name:  DS.attr('string'),
  age:   DS.attr('number'),
  foo:   DS.attr('string'),
  bar:   DS.attr('string'),
  baz:   DS.attr('string'),
  toys:  DS.hasMany('toy', {async: true}),
  owner: DS.belongsTo('owner', {async: true})
});
