import { module } from 'ember-qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      if (options.beforeEach) {
        return options.beforeEach(...arguments);
      }
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach(...arguments);
      return resolve(afterEach).then(() => destroyApp(this.application));
    }
  });
}
