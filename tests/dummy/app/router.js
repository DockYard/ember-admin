import Ember from 'ember';
import config from './config/environment';
import adminRouter from 'ember-admin/router';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  adminRouter(this);
});

export default Router;
