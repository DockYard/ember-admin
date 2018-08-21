import { test } from 'ember-qunit';
import { rowValuesEqual, inputPropertiesEqual } from '../helpers/equality-helpers';
import { fillInByLabel, fillInByPlaceholder } from '../helpers/fill-in-by';
import { isEmpty } from '@ember/utils';
import moduleForAcceptance from '../helpers/module-for-acceptance';
import Pretender from 'pretender';

let server;

moduleForAcceptance('Acceptance: Admin', {
  beforeEach() {
    let cats = [
      { id: 1, name: 'Felix', age: 10 },
      { id: 2, name: 'Nyan',  age: 3 }
    ];
    server = new Pretender(function() {
      this.get('/admin/cats', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ cats })];
      });
      this.get('/admin/cats/1', function() {
        let cat = { id: 1, name: 'Felix', age: 10 };
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ cats: [cat] })];
      });
      this.put('/admin/cats/1', function() {
        let cat = { id: 1, name: 'Hobbes', age: 29 };
        cats[0] = cat;

        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ cats: [cat] })];
      });
      this.post('/admin/cats', function() {
        let cat = { id: 3, name: 'Lion-O', age: 30 };
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ cats: [cat] })];
      });
      this.delete('/admin/cats/1', function() {
        cats.splice(0, 1);
        return [204, { 'Content-Type': 'application/json' }, ''];
      });
      this.get('/admin/dogs', function() {
        let dogs = [
          { id: 1, name: 'Boomer', age: 2 }
        ];
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ dogs })];
      });
      this.get('/admin/dogs/1', function() {
        let dogs = [
          { id: 1, name: 'Boomer', age: 2 }
        ];
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ dogs })];
      });
    });
  },
  afterEach() {
    server.shutdown();
  }
});

test('listing all models', function(assert) {
  visit('/admin');

  andThen(function() {
    let links = find('a');
    assert.equal(links.first().text(), 'bird');
    assert.equal(links.last().text(), 'toy');
  });
});

test('viewing a model\'s records', function(assert) {
  visit('/admin');

  andThen(function() {
    let links = find('a:contains("cat")');
    click(`#${links.first().prop('id')}`);
  });

  andThen(function() {
    let rows = find('.cat table tr');

    rowValuesEqual(assert, rows.eq(0), 'id', 'name', 'age', 'foo', 'bar', 'baz');
    rowValuesEqual(assert, rows.eq(1), '1', 'Felix', '10', '', '', '');
    rowValuesEqual(assert, rows.eq(2), '2', 'Nyan', '3', '', '', '');
  });
});

test('filtering records by value', function(assert) {
  visit('/admin/cat');

  andThen(function() {
    fillInByPlaceholder('Filter', 'Felix');
  });

  andThen(function() {
    let rows = find('.cat table tr');

    rowValuesEqual(assert, rows.eq(0), 'id', 'name', 'age', 'foo', 'bar', 'baz');
    rowValuesEqual(assert, rows.eq(1), '1', 'Felix', '10', '', '', '');
    assert.ok(isEmpty(rows.eq(2)), 'third row should not exist');
  });
});

test('editing a record', function(assert) {
  visit('/admin/cat');

  andThen(function() {
    let link = find('.cat a:contains("Felix")');
    click(link);
  });

  andThen(function() {
    fillInByLabel('name', 'Hobbes');
    fillInByLabel('age', 29);
    click(find('button.save'));
  });

  andThen(function() {});

  andThen(function() {
    let rows = find('.cat table tr');
    rowValuesEqual(assert, rows.eq(1), '1', 'Hobbes', '29', '', '', '');
  });
});

test('creating a new record', function(assert) {
  visit('/admin/cat');

  andThen(function() {
    let link = find('.cat a:contains("Create")');
    click(link, 'cannot find "Create"');
  });

  andThen(function() {
    fillInByLabel('name', 'Lion-O');
    fillInByLabel('age', 30);
    click(find('button.save'));
  });

  andThen(function() {});

  andThen(function() {
    let rows = find('.cat table tr');
    rowValuesEqual(assert, rows.eq(3), '3', 'Lion-O', '30', '', '', '');
  });
});

test('creating doesn\'t affect list', function(assert) {
  visit('/admin/cat');
  let oldConfirm = window.confirm;
  window.confirm = function() {
    return true;
  };

  let rows;

  andThen(function() {
    let link = find('.cat a:contains("Create")');

    rows = find('.cat tr');

    click(link);
  });

  andThen(function() {
    visit('/admin/cat');
  });

  andThen(function() {
    let newRows = find('.cat tr');
    assert.equal(rows.length, newRows.length, 'Number of rows unaffected');
    window.confirm = oldConfirm;
  });
});

test('deleting a record & confirming', function(assert) {
  let confirmCount = 0;
  let oldConfirm = window.confirm;
  window.confirm = function() {
    confirmCount = 1;
    return true;
  };
  visit('/admin/cat/1/edit');

  andThen(function() {
    click(find('button.delete'));
  });

  andThen(function() {});

  andThen(function() {
    let rows = find('.cat table tr');
    rowValuesEqual(assert, rows.eq(1), '2', 'Nyan', '3', '', '', '');
    assert.equal(confirmCount, 1);
    window.confirm = oldConfirm;
  });
});

test('deleting a record & not confirming', function(assert) {
  let oldConfirm = window.confirm;
  window.confirm = function() {
    return false;
  };
  visit('/admin/cat/1/edit');

  andThen(function() {
    click(find('button.delete'));
  });

  andThen(function() {});

  andThen(function() {
    assert.equal(currentURL(), '/admin/cat/1/edit');
    window.confirm = oldConfirm;
  });
});

test('canceling edit', function(assert) {
  visit('/admin/cat/1/edit');
  andThen(function() {
    click(find('button.cancel'));
  });

  andThen(function() {
    assert.equal(currentURL(), '/admin/cat');
  });
});

test('canceling new', function(assert) {
  let oldConfirm = window.confirm;
  window.confirm = function() {
    return true;
  };

  visit('/admin/cat/new');
  andThen(function() {
    click(find('button.cancel'));
  });

  andThen(function() {
    assert.equal(currentURL(), '/admin/cat');
    window.confirm = oldConfirm;
  });
});

test('excluding models', function(assert) {
  let adminSettings = this.application.__container__.lookup('service:admin');
  adminSettings.set('excludedModels', ['cat']);

  visit('/admin');

  andThen(function() {
    assert.equal(find('a:contains("cat")')[0], undefined);
    adminSettings.set('excludedModels', null);
  });
});

test('including models', function(assert) {
  let adminSettings = this.application.__container__.lookup('service:admin');
  adminSettings.set('includedModels', ['dog']);

  visit('/admin');

  andThen(function() {
    assert.equal(find('a:contains("cat")')[0], undefined);
    adminSettings.set('includedModels', null);
  });
});

test('including & excluding model', function(assert) {
  let adminSettings = this.application.__container__.lookup('service:admin');
  adminSettings.set('includedModels', ['cat', 'dog']);
  adminSettings.set('excludedModels', ['cat']);

  visit('/admin');

  andThen(function() {
    assert.equal(find('a:contains("cat")')[0], undefined);
    adminSettings.set('includedModels', null);
    adminSettings.set('excludedModels', null);
  });
});

test('including model columns', function(assert) {
  let adminSettings = this.application.__container__.lookup('service:admin');
  adminSettings.set('includedColumns', {
    'cat': ['name']
  });

  visit('/admin/cat');

  andThen(function() {
    let rows = find('.cat table tr');
    rowValuesEqual(assert, rows.eq(0), 'id', 'name');
    rowValuesEqual(assert, rows.eq(1), '1', 'Felix');
    rowValuesEqual(assert, rows.eq(2), '2', 'Nyan');

    visit('/admin/cat/1/edit');
  });

  andThen(function() {
    let inputs = find('input[type="text"]:not([placeholder="Filter"])');
    inputPropertiesEqual(assert, inputs, 'name');

    adminSettings.set('includedColumns', null);
  });
});

test('excluding model columns', function(assert) {
  let adminSettings = this.application.__container__.lookup('service:admin');
  adminSettings.set('excludedColumns', {
    'cat': ['name']
  });

  visit('/admin/cat');

  andThen(function() {
    let rows = find('.cat table tr');
    rowValuesEqual(assert, rows.eq(0), 'id', 'age', 'foo', 'bar', 'baz');
    rowValuesEqual(assert, rows.eq(1), '1', '10', '', '', '');
    rowValuesEqual(assert, rows.eq(2), '2', '3', '', '', '');

    visit('/admin/cat/1/edit');
  });

  andThen(function() {
    let inputs = find('input[type="text"]:not([placeholder="Filter"])');
    inputPropertiesEqual(assert, inputs, 'age', 'foo', 'bar', 'baz');

    adminSettings.set('excludedColumns', null);
  });
});

test('can override index template', function(assert) {
  visit('/admin/dog');
  andThen(function() {
    assert.equal(find('h3.index').text(), 'Dogs Index');
  });
});

test('can override new template', function(assert) {
  visit('/admin/dog/new');
  andThen(function() {
    assert.equal(find('h3.new').text(), 'Dogs New');
  });
});

test('can override edit template', function(assert) {
  visit('/admin/dog/1/edit');
  andThen(function() {
    assert.equal(find('h3.edit').text(), 'Dogs Edit');
  });
});
