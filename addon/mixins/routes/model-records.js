import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    return params.name;
  }
});
