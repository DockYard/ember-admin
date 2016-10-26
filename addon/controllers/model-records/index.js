import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type';

const {
  inject,
  Controller
} = Ember;

export default Controller.extend(RecordTypeMixin, {
  adminStore: inject.service(),
  adminConfig: inject.service()
});
