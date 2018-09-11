import { moduleFor, test } from 'ember-qunit';
import RESTAdapter from 'ember-data/adapters/rest';
import { get } from '@ember/object';

let adminService;

moduleFor('ember-admin@store:admin', 'Unit | Store | admin', {
  needs: ['service:admin'],
  beforeEach() {
    this.inject.service('admin');
    adminService = get(this, 'admin');
  }
});

test('defaults to "api" namespace', function(assert) {
  let adapter = this.subject().adapterFor('dog');
  assert.equal(adapter.namespace, 'admin');
});

test('appends ember-admin\'s namespace to the end of the adapter namespaces', function(assert) {
  let {
    container: { owner }
  } = this;
  owner.register('adapter:dog', RESTAdapter.extend({ namespace: 'api/v1' }));
  let adapter = this.subject().adapterFor('dog');
  assert.equal(adapter.namespace, 'api/v1/admin');
});

test('allow overriding of default namespace', function(assert) {
  adminService.namespace = 'hobbes';
  let adapter = this.subject().adapterFor('dog');
  assert.equal(adapter.namespace, 'hobbes');
});

test('allow `null` namespace', function(assert) {
  adminService.namespace = undefined;
  let adapter = this.subject().adapterFor('dog');
  assert.equal(adapter.namespace, undefined);
});

test('empty admin namespace does not add tralining slash to adapter namespace', function(assert) {
  let {
    container: { owner }
  } = this;

  owner.register('adapter:dog', RESTAdapter.extend({ namespace: 'api/v1' }));
  adminService.namespace = '';
  let adapter = this.subject().adapterFor('dog');
  assert.equal(adapter.namespace, 'api/v1');
});
