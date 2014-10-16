import Ember from 'ember';

var get = Ember.get;

export default Ember.Component.extend({
  defaultLayout: function(context, options){
    var path = 'record.' + get(context, 'column');

    options.hash = {};
    Ember.Handlebars.helpers['bind'].call(context, path, options);
  }
});
