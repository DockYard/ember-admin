import Ember from 'ember';
import layout from '../templates/property-print';

const {
  Component,
  on,
  get,
  set,
  observer,
  addObserver
} = Ember;

export default Component.extend({
  setupCellObsever: observer('record', 'column', on('init', function() {
    let record = get(this, 'record');
    let column = get(this, 'column');

    if (!record || !column) {
      return;
    }

    addObserver(this, `record.${column}`, this, this._updateCell);
    this._updateCell();
  })),

  _updateCell() {
    let record = get(this, 'record');
    let column = get(this, 'column');
    let value = get(record, column);

    set(this, 'cellValue', value);
  },

  layout
});
