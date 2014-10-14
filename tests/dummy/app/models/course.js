import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  owners: DS.hasMany('owner')
});
