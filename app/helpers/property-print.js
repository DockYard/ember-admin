import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(record, property, options) {
  return Ember.Handlebars.helpers.bind.call(this, record+'.'+property, options);
});
