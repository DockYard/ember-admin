import Ember from 'ember';
import ColumnsMixin from 'ember-admin/mixins/model-records/columns';

const {
  get,
  set,
  isBlank,
  isNone,
  computed,
  getOwner,
  Component
} = Ember;

export default Component.extend(ColumnsMixin, {
  includedColumns: ['id'],
  didReceiveAttrs() {
    this._super(...arguments);

    let owner = getOwner(this);
    let templatePath = `admin/index/${get(this, 'recordType')}`;
    if (!owner.resolveRegistration(`template:${templatePath}`)) {
      templatePath = 'admin/index/default';
    }

    set(this, 'layout', owner.resolveRegistration(`template:${templatePath}`));
  },
  filteredRecords: computed('records', 'filter', function() {
    if (isBlank(get(this, 'filter'))) {
      return get(this, 'records');
    } else {
      let filter = get(this, 'filter').toLowerCase();
      let columns = get(this, 'filteredColumns');
      return get(this, 'records').filter(function(record) {
        let value;

        for (let i = 0; i < columns.length; i++) {
          value = (get(record, columns[i]) || '').toString().toLowerCase();

          if (value.indexOf(filter) > -1) {
            return true;
          }
        }
      });
    }
  }),
  relationshipGiven: computed('relationshipName', 'relationshipId', function() {
    return get(this, 'relationshipName') && get(this, 'relationshipId');
  }),
  hideCreate: computed('relationshipName', 'relationshipId', function() {
    let relationshipName = get(this, 'relationshipName');
    let relationshipId = get(this, 'relationshipId');

    if (relationshipId) {
      if (isNone(relationshipName)) {
        return true;
      } else {
        let { store } = this.admin;
        let constructor = store.modelFor(get(this, 'recordType'));
        let inverseFor = constructor.inverseFor(relationshipName, store);
        let { kind } = inverseFor;

        if (kind && kind === 'belongsTo' && get(this, 'records.length') > 0) {
          return true;
        }
      }
    }
    return false;
  })
});
