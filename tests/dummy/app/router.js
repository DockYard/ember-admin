import Ember from 'ember';
import adminRouter from 'ember-admin/router';

var Router = Ember.Router.extend({
  location: DummyENV.locationType
});

Router.map(function() {
  adminRouter(this);
});

export default Router;
