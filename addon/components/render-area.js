import Ember from 'ember';
import layout from '../templates/components/render-area';

const { inject } = Ember;

const Component = Ember.Component.extend({
  adminConfig: inject.service(),
  layout,

  didReceiveAttrs() {
    let area = this.get('area');
    let type = this.get('type') || 'default';
    let comp = this.get(`adminConfig.areas.${area}.${type}`);

    if (!comp) {
      comp = this.get(`adminConfig.areas.${area}.default`);
    }

    this.set('comp', comp);
  }
});

Component.reopenClass({
  positionalParams: ['area', 'type']
});

export default Component;
