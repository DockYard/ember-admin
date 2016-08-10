import Ember from 'ember';
import ApplicationAdapter from './application';

const {
  computed
} = Ember;

export default ApplicationAdapter.extend({
  namespace: computed(function() {
    return '';
  })
});
