import Ember from 'ember';
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

test('listing all models', function() {
  visit('/admin');

  andThen(function() {
    var links = find('a');
    equal(links.first().text(), 'cat');
    equal(links.last().text(), 'toy');
  });
});

test('viewing a model\'s records', function() {
  visit('/admin');

  andThen(function() {
    var links = find('a:contains("cat")');
    click('#' + links.first().prop('id'));
  });

  andThen(function() {
    var rows = find('.cat table tr');

    rowValuesEqual(rows.eq(0), 'id', 'name', 'age', 'foo', 'bar', 'baz');
    rowValuesEqual(rows.eq(1), '1', 'Felix', '10', '', '', '');
    rowValuesEqual(rows.eq(2), '2', 'Nyan', '3', '', '', '');
  });
});

test('filtering records by value', function() {
  visit('/admin/cat');

  andThen(function() {
    fillInByPlaceholder('Filter', 'Felix');
  });

  andThen(function() {
    var rows = find('.cat table tr');

    rowValuesEqual(rows.eq(0), 'id', 'name', 'age', 'foo', 'bar', 'baz');
    rowValuesEqual(rows.eq(1), '1', 'Felix', '10', '', '', '');
    ok(Ember.isEmpty(rows.eq(2)), 'third row should not exist');
  });
});

test('editing a record', function() {
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
    rowValuesEqual(rows.eq(1), '1', 'Hobbes', '29', '', '', '');
  });
});

test('creating a new record', function() {
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
    rowValuesEqual(rows.eq(3), '3', 'Lion-O', '30', '', '', '');
  });
});

test('deleting a record & confirming', function() {
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
    rowValuesEqual(rows.eq(1), '2', 'Nyan', '3', '', '', '');
    equal(confirmCount, 1);
    window.confirm = oldConfirm;
  });
});

test('deleting a record & not confirming', function() {
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
    equal(currentURL(), '/admin/cat/1/edit');
    window.confirm = oldConfirm;
  });
});

test('canceling edit', function() {
  visit('/admin/cat/1/edit');
  andThen(function() {
    click(find('button.cancel'));
  });

  andThen(function() {
    equal(currentURL(), '/admin/cat');
  });
});

test('canceling new', function() {
  var oldConfirm = window.confirm;
  window.confirm = function() { return true; };

  visit('/admin/cat/new');
  andThen(function() {
    click(find('button.cancel'));
  });

  andThen(function() {
    equal(currentURL(), '/admin/cat');
    window.confirm = oldConfirm;
  });
});

test('excluding models', function() {
  var adminSettings = App.__container__.lookup('service:admin');
  adminSettings.set('excludedModels', ['cat']);

  visit('/admin');

  andThen(function() {
    equal(find('a:contains("cat")')[0], undefined);
    adminSettings.set('excludedModels', null);
  });
});

test('including models', function() {
  var adminSettings = App.__container__.lookup('service:admin');
  adminSettings.set('includedModels', ['dog']);

  visit('/admin');

  andThen(function() {
    equal(find('a:contains("cat")')[0], undefined);
    adminSettings.set('includedModels', null);
  });
});

test('including & excluding model', function() {
  var adminSettings = App.__container__.lookup('service:admin');
  adminSettings.set('includedModels', ['cat', 'dog']);
  adminSettings.set('excludedModels', ['cat']);

  visit('/admin');

  andThen(function() {
    equal(find('a:contains("cat")')[0], undefined);
    adminSettings.set('includedModels', null);
    adminSettings.set('excludedModels', null);
  });
});

test('including model columns', function() {
  var adminSettings = App.__container__.lookup('service:admin');
  adminSettings.set('includedColumns', {
    'cat': ['name']
  });

  visit('/admin/cat');

  andThen(function() {
    var rows = find('.cat table tr');
    rowValuesEqual(rows.eq(0), 'id', 'name');
    rowValuesEqual(rows.eq(1), '1', 'Felix');
    rowValuesEqual(rows.eq(2), '2', 'Nyan');

    visit('/admin/cat/1/edit');
  });

  andThen(function() {
    var inputs = find('input[type="text"]:not([placeholder="Filter"])');
    inputPropertiesEqual(inputs, 'name');

    adminSettings.set('includedColumns', null);
  });
});

test('excluding model columns', function() {
  var adminSettings = App.__container__.lookup('service:admin');
  adminSettings.set('excludedColumns', {
    'cat': ['name']
  });

  visit('/admin/cat');

  andThen(function() {
    var rows = find('.cat table tr');
    rowValuesEqual(rows.eq(0), 'id', 'age', 'foo', 'bar', 'baz');
    rowValuesEqual(rows.eq(1), '1', '10', '', '', '');
    rowValuesEqual(rows.eq(2), '2', '3', '', '', '');

    visit('/admin/cat/1/edit');
  });

  andThen(function() {
    var inputs = find('input[type="text"]:not([placeholder="Filter"])');
    inputPropertiesEqual(inputs, 'age', 'foo', 'bar', 'baz');

    adminSettings.set('excludedColumns', null);
  });
});

test('can override index template', function() {
  visit('/admin/dog');
  andThen(function() {
    equal(find('h3.index').text(), 'Dogs Index');
  });
});

test('can override new template', function() {
  visit('/admin/dog/new');
  andThen(function() {
    equal(find('h3.new').text(), 'Dogs New');
  });
});

test('can override edit template', function() {
  visit('/admin/dog/1/edit');
  andThen(function() {
    equal(find('h3.edit').text(), 'Dogs Edit');
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
      this.post('/admin/toys', function(request) {
        toy = JSON.parse(request.requestBody).toy;
        toy.id = 3;
        return [200, {"Content-Type": "application/json"}, JSON.stringify({toys: [toy]})];
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
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
    toy = undefined;
  }
});

test('should list relationships', function() {
  visit('/admin/cat/1/edit');

  andThen(function() {
    var ownerRows = find('.owner table tr');
    rowValuesEqual(ownerRows.eq(0), 'id', 'name');
    rowValuesEqual(ownerRows.eq(1), '1', 'Pat Sullivan');

    var toyRows = find('.toy table tr');
    rowValuesEqual(toyRows.eq(0), 'id', 'name');
    rowValuesEqual(toyRows.eq(1), '1', 'Ball');
    rowValuesEqual(toyRows.eq(2), '2', 'Mouse');
  });
});

test('should create new model as a relationship to parent', function() {
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
    rowValuesEqual(toyRows.eq(3), '3', 'Bell');
  });
});

test('should not display "Create" if singular relationship model exists', function() {
  visit('/admin/cat/1/edit');

  andThen(function() {
    var createLink = find('.owner a:contains("Create")');
    equal(0, createLink.length, 'should not find the Create link');
  });
});
