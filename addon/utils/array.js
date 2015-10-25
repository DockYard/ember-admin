import Ember from 'ember';

const {
  A: emberArray
} = Ember;

const {
  contains: _contains,
  pushObject: _pushObject,
  removeObject: _removeObject
} = Ember.A();

export function contains(array, ...values) {
  return _contains.apply(emberArray(array), values);
}

export function pushObject(array, ...values) {
  return _pushObject.apply(emberArray(array), values);
}

export function removeObject(array, ...values) {
  return _removeObject.apply(emberArray(array), values);
}
