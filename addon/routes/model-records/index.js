import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  model() {
    return this.admin.store.findAll(this.paramsFor('model-records').name).then(function(records) {
      return records.filter(function(item) {
        return !get(item, 'isNew');
      });
    });
  }
});
