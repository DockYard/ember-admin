import Ember from 'ember';
import DS from 'ember-data';
import AdminStore from 'ember-admin/stores/admin';
import AdminService from 'dummy/services/admin';

var oldNamespace, adminStore, adminService;
var set = Ember.set;

module('Admin Store', {
  setup: function() {
    adminService = AdminService.create({
      container: {
        lookup: Ember.K
      }
    });
    adminStore = AdminStore.create({
      container: {
        lookup: function(fullName) {
          if (fullName === 'service:admin') {
            return adminService;
          }
        }
      }
    });
    set(adminStore, 'defaultAdapter', DS.RESTAdapter.create());
    set(adminStore, 'admin', adminService);
  }
});

test('defaults to "api" namespace', function() {
  var adapter = adminStore.adapterFor('dog');
  equal(adapter.namespace, 'admin');
});

test('appends ember-admin\'s namespace to the end of the adapter namespaces', function() {
  set(adminStore, 'defaultAdapter', DS.RESTAdapter.create({namespace: 'api/v1'}));
  var adapter = adminStore.adapterFor('dog');
  equal(adapter.namespace, 'api/v1/admin');
});

test('allow overriding of default namespace', function() {
  adminService.namespace = 'hobbes';
  var adapter = adminStore.adapterFor('dog');
  equal(adapter.namespace, 'hobbes');
});

test('allow `null` namespace', function() {
  adminService.namespace = undefined;
  var adapter = adminStore.adapterFor('dog');
  equal(adapter.namespace, undefined);
});

test('empty admin namespace does not add tralining slash to adapter namespace', function() {
  set(adminStore, 'defaultAdapter', DS.RESTAdapter.create({namespace: 'api/v1'}));
  adminService.namespace = '';
  var adapter = adminStore.adapterFor('dog');
  equal(adapter.namespace, 'api/v1');
});
