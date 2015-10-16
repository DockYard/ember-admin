import DS from 'ember-data';

const {
  attr,
  hasMany,
  Model
} = DS;

export default Model.extend({
  name: attr('string'),
  age:  attr('number'),
  toys: hasMany('toy', { async: true })
});
