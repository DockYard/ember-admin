import Ember from 'ember';
import EmberAdminRouteModelRecordsEditMixin from 'ember-admin/mixins/routes/model-records/edit';
import EmberDataRouteMixin from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(
  EmberAdminRouteModelRecordsEditMixin,
  EmberDataRouteMixin
);
