import Ember from 'ember';
import layout from '../templates/property-print';

const {
  on,
  get,
  set,
  observer,
  addObserver
} = Ember;

export default Ember.Component.extend({
  setupCellObsever: observer('record', 'column', on('init', function() {
    const record = get(this, 'record');
    const column = get(this, 'column');

    if (!record || !column) {
      return;
    }

    addObserver(this, `record.${column}`, this, this._updateCell);
    this._updateCell();
  })),

  _updateCell() {
    const record = get(this, 'record');
    const column = get(this, 'column');
    const value = get(record, column);

    set(this, 'cellValue', value);
  },

  defaultLayout: layout
});
