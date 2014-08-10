import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(record, property) {
  return record.get(property);
});
