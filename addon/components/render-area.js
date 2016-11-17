import Ember from 'ember';
import layout from '../templates/components/render-area';

const { inject, observer } = Ember;

const Component = Ember.Component.extend({
  adminConfig: inject.service(),
  layout,

  didReceiveAttrs() {
    this.changeComponent();
  },

  changeComponentOnTheme: observer('adminConfig.activeTheme', function () {
    this.changeComponent();
  }),

  changeComponent() {
    let theme = this.get('adminConfig.activeTheme') || 'default';
    let area = this.get('area');
    let type = this.get('type') || 'default';
    let comp = this.get(`adminConfig.areas.${theme}.${area}.${type}`);

    if (!comp) {
      comp = this.get(`adminConfig.areas.${theme}.${area}.default`);
    }

    this.set('comp', comp);
  }
});

Component.reopenClass({
  positionalParams: ['area', 'type']
});

export default Component;
