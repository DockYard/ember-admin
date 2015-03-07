import Ember from 'ember';
import layout from '../templates/property-print';

var get = Ember.get;
var set = Ember.set;
var observer = Ember.observer;
var addObserver = Ember.addObserver;

export default Ember.Component.extend({
  setupCellObsever: observer('record', 'column', function() {
    var record = get(this, 'record');
    var column = get(this, 'column');

    if (!record || !column) { return; } // might want to teardown

    addObserver(this, 'record.' + column, this, this._updateCell);
    this._updateCell();
  }).on('init'),

  _updateCell: function() {
    var record = get(this, 'record');
    var column = get(this, 'column');
    var value = get(record, column);

    set(this, 'cellValue', value);
  },

  defaultLayout: layout
});
