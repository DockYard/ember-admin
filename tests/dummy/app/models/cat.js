import DS from 'ember-data';

const {
  attr,
  hasMany,
  belongsTo,
  Model
} = DS;

export default Model.extend({
  name:  attr('string'),
  age:   attr('number'),
  foo:   attr('string'),
  bar:   attr('string'),
  baz:   attr('string'),
  toys:  hasMany('toy', { async: true }),
  owner: belongsTo('owner', { async: true })
});
