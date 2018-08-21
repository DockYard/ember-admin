import layout from '../templates/property-print';
import Component from '@ember/component';
import { on } from '@ember/object/evented';
import { get } from '@ember/object';
import { set } from '@ember/object';
import { observer } from '@ember/object';
import { addObserver } from '@ember/object/observers';

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
