import Ember from 'ember';
import EmberAdminRouteModelRecordsNewMixin from 'ember-admin/mixins/routes/model-records/new';
import EmberDataRouteMixin from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(
  EmberDataRouteMixin,
  EmberAdminRouteModelRecordsNewMixin
);
