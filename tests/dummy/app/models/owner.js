import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  cats: DS.hasMany('cat', {async: true}),
  courses: DS.hasMany('course', {inverse: 'owners', async: true})
});
