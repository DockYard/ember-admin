import DS from 'ember-data';

const {
  attr,
  hasMany,
  Model
} = DS;

export default Model.extend({
  name: attr('string'),
  cats: hasMany('cat', { async: true }),
  courses: hasMany('course', { inverse: 'owners', async: true })
});
