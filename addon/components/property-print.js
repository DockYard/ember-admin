import Ember from 'ember';
import layout from '../templates/property-print';

const get = Ember.get;
const set = Ember.set;
const observer = Ember.observer;
const addObserver = Ember.addObserver;

export default Ember.Component.extend({
  setupCellObsever: observer('record', 'column', function() {
    const record = get(this, 'record');
    const column = get(this, 'column');

    if (!record || !column) { return; } // might want to teardown

    addObserver(this, 'record.' + column, this, this._updateCell);
    this._updateCell();
  }).on('init'),

  _updateCell: function() {
    const record = get(this, 'record');
    const column = get(this, 'column');
    const value = get(record, column);

    set(this, 'cellValue', value);
  },

  defaultLayout: layout
});
