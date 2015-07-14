import Ember from 'ember';
import { module, test } from 'qunit';
import DS from 'ember-data';
import startApp from '../helpers/start-app';

var oldNamespace, adminStore, adminService;
var set = Ember.set;


var App;

module("Admin store", {
  setup: function(){
    App = startApp();
    adminService = App.__container__.lookup('service:admin');
    adminStore = App.__container__.lookup('store:admin');
  },
  teardown: function(){
    App.registry = App.buildRegistry();
    App.reset();
  }
});

test('defaults to "api" namespace', function(assert) {
  var adapter = adminStore.adapterFor('dog');
  assert.equal(adapter.namespace, 'admin');
});

test('appends ember-admin\'s namespace to the end of the adapter namespaces', function(assert) {
  set(adminStore, 'lookupAdapter', function(){
    return DS.RESTAdapter.create({namespace: 'api/v1'});
  });
  var adapter = adminStore.adapterFor('dog');
  assert.equal(adapter.namespace, 'api/v1/admin');
});

test('allow overriding of default namespace', function(assert) {
  adminService.namespace = 'hobbes';
  var adapter = adminStore.adapterFor('dog');
  assert.equal(adapter.namespace, 'hobbes');
});

test('allow `null` namespace', function(assert) {
  adminService.namespace = undefined;
  var adapter = adminStore.adapterFor('dog');
  assert.equal(adapter.namespace, undefined);
});

test('empty admin namespace does not add tralining slash to adapter namespace', function(assert) {
  set(adminStore, 'lookupAdapter', function(){
    return DS.RESTAdapter.create({namespace: 'api/v1'});
  });
  adminService.namespace = '';
  var adapter = adminStore.adapterFor('dog');
  assert.equal(adapter.namespace, 'api/v1');
});
