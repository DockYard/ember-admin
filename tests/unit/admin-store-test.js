import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import DS from 'ember-data';

let adminService;

const {
  get,
  set
} = Ember;

moduleFor('ember-admin@store:admin', 'Unit | Store | admin', {
  needs: ['service:admin'],
  setup() {
    this.inject.service('admin');
    adminService = get(this, 'admin');
  }
});

test('defaults to "api" namespace', function(assert) {
  const adapter = this.subject().adapterFor('dog');
  assert.equal(adapter.namespace, 'admin');
});

test('appends ember-admin\'s namespace to the end of the adapter namespaces', function(assert) {
  set(this.subject(), 'lookupAdapter', function() {
    return DS.RESTAdapter.create({ namespace: 'api/v1' });
  });
  const adapter = this.subject().adapterFor('dog');
  assert.equal(adapter.namespace, 'api/v1/admin');
});

test('allow overriding of default namespace', function(assert) {
  adminService.namespace = 'hobbes';
  const adapter = this.subject().adapterFor('dog');
  assert.equal(adapter.namespace, 'hobbes');
});

test('allow `null` namespace', function(assert) {
  adminService.namespace = undefined;
  const adapter = this.subject().adapterFor('dog');
  assert.equal(adapter.namespace, undefined);
});

test('empty admin namespace does not add tralining slash to adapter namespace', function(assert) {
  set(this.subject(), 'lookupAdapter', function() {
    return DS.RESTAdapter.create({ namespace: 'api/v1' });
  });
  adminService.namespace = '';
  const adapter = this.subject().adapterFor('dog');
  assert.equal(adapter.namespace, 'api/v1');
});
