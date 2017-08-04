import Ember from 'ember';

const { set, inject } = Ember;

export default Ember.Mixin.create({
  adminConfig: inject.service(),

  didReceiveAttrs() {
    let areas = this.get('adminConfig.areas');
    let area = this.get('area');
    let type = this.get('type') || 'default';
    let send = this.get('send');
    let location = `${area}.${type}`;

    if (!areas[area]) {
      areas[area] = {};
    }

    set(areas, location, send);
  }
});
