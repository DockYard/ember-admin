import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { rowValuesEqual, inputPropertiesEqual } from '../helpers/equality-helpers';
import { fillInByLabel, fillInByPlaceholder } from '../helpers/fill-in-by';
import Pretender from 'pretender';

var App, server;
var offset, toy;

module('Acceptance: Admin', {
  setup: function() {
    App = startApp();
    offset = 0;
    server = new Pretender(function() {
      this.get('/admin/cats', function(request) {
        var cats = [
          [
            { id: 1, name: "Felix", age: 10 },
            { id: 2, name: "Nyan",  age: 3  }
          ],
          [
            { id: 1, name: "Hobbes", age: 29 },
            { id: 2, name: "Nyan",   age: 3  }
          ],
          [
            { id: 1, name: "Hobbes", age: 29 },
            { id: 2, name: "Nyan",   age: 3  },
            { id: 3, name: "Lion-O", age: 30 }
          ],
          [
            { id: 2, name: "Nyan",   age: 3  },
          ]
        ];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({cats: cats[offset]})];
      });
      this.get('/admin/cats/1', function(request) {
        var cats = [
          { id: 1, name: "Felix", age: 10 }
        ];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({cats: cats})];
      });
      this.put('/admin/cats/1', function(request) {
        var cats = [
          { id: 1, name: "Hobbes", age: 29 }
        ];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({cats: cats})];
      });
      this.post('/admin/cats', function(request) {
        var cats = [
          { id: 3, name: "Lion-O", age: 30 }
        ];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({cats: cats})];
      });
      this.delete('/admin/cats/1', function(request) {
        return [204, {"Content-Type": "application/json"}, ''];
      });
      this.get('/admin/dogs', function(request) {
        var dogs = [
          { id: 1, name: "Boomer", age: 2 }
        ];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({dogs: dogs})];
      });
      this.get('/admin/dogs/1', function(request) {
        var dogs = [
          { id: 1, name: "Boomer", age: 2 }
        ];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({dogs: dogs})];
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('listing all models', function(assert) {
  visit('/admin');

  andThen(function() {
    var links = find('a');
    assert.equal(links.first().text(), 'bird');
    assert.equal(links.last().text(), 'toy');
  });
});

test('viewing a model\'s records', function(assert) {
  visit('/admin');

  andThen(function() {
    var links = find('a:contains("cat")');
    click('#' + links.first().prop('id'));
  });

  andThen(function() {
    var rows = find('.cat table tr');

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
    var rows = find('.cat table tr');

    rowValuesEqual(assert, rows.eq(0), 'id', 'name', 'age', 'foo', 'bar', 'baz');
    rowValuesEqual(assert, rows.eq(1), '1', 'Felix', '10', '', '', '');
    assert.ok(Ember.isEmpty(rows.eq(2)), 'third row should not exist');
  });
});

test('editing a record', function(assert) {
  visit('/admin/cat');

  andThen(function() {
    var link = find('.cat a:contains("Felix")');
    click(link);
  });

  andThen(function() {
    fillInByLabel('name', 'Hobbes');
    fillInByLabel('age', 29);
    offset = 1;
    click(find('button.save'));
  });

  andThen(function() {});

  andThen(function() {
    var rows = find('.cat table tr');
    rowValuesEqual(assert, rows.eq(1), '1', 'Hobbes', '29', '', '', '');
  });
});

test('creating a new record', function(assert) {
  visit('/admin/cat');

  andThen(function() {
    var link = find('.cat a:contains("Create")');
    click(link, "cannot find 'Create'");
  });

  andThen(function() {
    fillInByLabel('name', 'Lion-O');
    fillInByLabel('age', 30);
    offset = 2;
    click(find('button.save'));
  });

  andThen(function() {});

  andThen(function() {
    var rows = find('.cat table tr');
    rowValuesEqual(assert, rows.eq(3), '3', 'Lion-O', '30', '', '', '');
  });
});

test('creating doesn\'t affect list', function(assert) {
  visit('/admin/cat');

  var rows;

  andThen(function() {
    var link = find('.cat a:contains("Create")');

    rows = find('.cat tr');

    click(link);
  });

  andThen(function() {});

  andThen(function() {
    var newRows = find('.cat tr');
    assert.equal(rows.length, newRows.length, 'Number of rows unaffected');
  });
});

test('deleting a record & confirming', function(assert) {
  var confirmCount = 0;
  var oldConfirm = window.confirm;
  window.confirm = function() { confirmCount = 1; return true; };
  visit('/admin/cat/1/edit');

  andThen(function() {
    offset = 3;
    click(find('button.delete'));
  });

  andThen(function() {});

  andThen(function() {
    var rows = find('.cat table tr');
    rowValuesEqual(assert, rows.eq(1), '2', 'Nyan', '3', '', '', '');
    assert.equal(confirmCount, 1);
    window.confirm = oldConfirm;
  });
});

test('deleting a record & not confirming', function(assert) {
  var confirmCount = 0;
  var oldConfirm = window.confirm;
  window.confirm = function() { return false; };
  visit('/admin/cat/1/edit');

  andThen(function() {
    offset = 3;
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
  var oldConfirm = window.confirm;
  window.confirm = function() { return true; };

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
  var adminSettings = App.__container__.lookup('service:admin');
  adminSettings.set('excludedModels', ['cat']);

  visit('/admin');

  andThen(function() {
    assert.equal(find('a:contains("cat")')[0], undefined);
    adminSettings.set('excludedModels', null);
  });
});

test('including models', function(assert) {
  var adminSettings = App.__container__.lookup('service:admin');
  adminSettings.set('includedModels', ['dog']);

  visit('/admin');

  andThen(function() {
    assert.equal(find('a:contains("cat")')[0], undefined);
    adminSettings.set('includedModels', null);
  });
});

test('including & excluding model', function(assert) {
  var adminSettings = App.__container__.lookup('service:admin');
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
  var adminSettings = App.__container__.lookup('service:admin');
  adminSettings.set('includedColumns', {
    'cat': ['name']
  });

  visit('/admin/cat');

  andThen(function() {
    var rows = find('.cat table tr');
    rowValuesEqual(assert, rows.eq(0), 'id', 'name');
    rowValuesEqual(assert, rows.eq(1), '1', 'Felix');
    rowValuesEqual(assert, rows.eq(2), '2', 'Nyan');

    visit('/admin/cat/1/edit');
  });

  andThen(function() {
    var inputs = find('input[type="text"]:not([placeholder="Filter"])');
    inputPropertiesEqual(assert, inputs, 'name');

    adminSettings.set('includedColumns', null);
  });
});

test('excluding model columns', function(assert) {
  var adminSettings = App.__container__.lookup('service:admin');
  adminSettings.set('excludedColumns', {
    'cat': ['name']
  });

  visit('/admin/cat');

  andThen(function() {
    var rows = find('.cat table tr');
    rowValuesEqual(assert, rows.eq(0), 'id', 'age', 'foo', 'bar', 'baz');
    rowValuesEqual(assert, rows.eq(1), '1', '10', '', '', '');
    rowValuesEqual(assert, rows.eq(2), '2', '3', '', '', '');

    visit('/admin/cat/1/edit');
  });

  andThen(function() {
    var inputs = find('input[type="text"]:not([placeholder="Filter"])');
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

module('Acceptance: Admin Relationships', {
  setup: function() {
    App = startApp();
    offset = 0;
    server = new Pretender(function() {
      this.get('/admin/cats', function() {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({cats: [], owners: [], toys: []})];
      });
      this.get('/admin/cats/1', function(request) {
        var cats = [
          { id: 1, name: "Felix", age: 10, owner: 1, toys: [1,2] },
        ];
        var owners = [
          { id: 1, name: "Pat Sullivan", cats: [1] }
        ];
        var toys = [
          { id: 1, name: "Ball", cat: 1 },
          { id: 2, name: "Mouse", cat: 1 }
        ];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({cats: cats, owners: owners, toys: toys})];
      });
      this.get('/admin/birds', function() {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({birds: [], toys: []})];
      });
      this.get('/admin/birds/1', function(request) {
        var birds = [
          { id: 1, name: "Boomer", toys: [3] }
        ];
        var toys = [
          { id: 3, name: "Duck", bird: 1 }
        ];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({birds: birds, toys: toys})];
      });
      this.post('/admin/toys', function(request) {
        toy = JSON.parse(request.requestBody).toy;
        toy.id = 3;
        return [200, {"Content-Type": "application/json"}, JSON.stringify({toys: [toy]})];
      });
      this.post('/admin/courses', function(request) {
        var course = JSON.parse(request.requestBody).course;
        course.id = 3;
        return [200, {"Content-Type": "application/json"}, JSON.stringify({courses: [course]})];
      });
      this.get('/admin/toys', function() {
        var toys = [
          { id: 1, name: "Ball", cat: 1 },
          { id: 2, name: "Mouse", cat: 1 }
        ];

        if (toy) {
          toys.push(toy);
        }
        return [200, {"Content-Type": "application/json"}, JSON.stringify({toys: toys})];
      });
      this.get('/admin/owners', function() {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({owners: []})];
      });
      this.get('/admin/courses', function() {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({courses: []})];
      });
      this.get('/admin/owners/1', function() {
        var owners = [
          { id: 1, name: 'Brian', courses: [1] }
        ];
        var courses = [
          { id: 1, title: 'Teach Your Dog', owners: [1] }
        ];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({owners: owners, courses: courses})];
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
    toy = undefined;
  }
});

test('should list relationships', function(assert) {
  visit('/admin/cat/1/edit');

  andThen(function() {
    var ownerRows = find('.owner table tr');
    rowValuesEqual(assert, ownerRows.eq(0), 'id', 'name');
    rowValuesEqual(assert, ownerRows.eq(1), '1', 'Pat Sullivan');

    var toyRows = find('.toy table tr');
    rowValuesEqual(assert, toyRows.eq(0), 'id', 'name');
    rowValuesEqual(assert, toyRows.eq(1), '1', 'Ball');
    rowValuesEqual(assert, toyRows.eq(2), '2', 'Mouse');
  });
});

test('should create new model as a relationship to parent', function(assert) {
  visit('/admin/cat/1/edit');

  andThen(function() {
    click('.toy a:contains("Create")');
  });

  andThen(function() {
    fillInByLabel('name', 'Bell');
    click(find('button.save'));
  });

  andThen(function() {
    click('.toy a:contains("Bell")');
  });

  andThen(function() {
    click('.cat a:contains("Felix")');
  });

  andThen(function() {
    var toyRows = find('.toy table tr');
    rowValuesEqual(assert, toyRows.eq(3), '3', 'Bell');
  });
});

test('should not display "Create" if singular relationship model exists', function(assert) {
  visit('/admin/cat/1/edit');

  andThen(function() {
    var createLink = find('.owner a:contains("Create")');
    assert.equal(0, createLink.length, 'should not find the Create link');
  });
});

test('should not display "Create" if no inverse relationship exists', function(assert) {
  visit('/admin/bird/1/edit');

  andThen(function() {
    var toysTable = find('.toy');
    assert.equal(1, toysTable.length, 'should find the toy relationship table');
    var createLink = find('.toy a:contains("Create")');
    assert.equal(0, createLink.length, 'should not find the Create link');
  });
});

test('should properly create Many-to-Many relationship with inverse', function(assert) {
  visit('/admin/owner/1/edit');

  andThen(function() {
    var coursesTable = find('.course');
    assert.equal(1, coursesTable.length, 'should find the course relationship table');
    click('.course a:contains("Create")');
  });

  andThen(function() {
    fillInByLabel('title', 'New Course!');
    click(find('button.save'));
  });
});
