import ApplicationAdapter from './application';
import { computed } from '@ember/object';

export default ApplicationAdapter.extend({
  namespace: computed(function() {
    return '';
  })
});
