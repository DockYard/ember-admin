import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import adminRouter from 'ember-admin/router';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  adminRouter(this);
});

export default Router;
