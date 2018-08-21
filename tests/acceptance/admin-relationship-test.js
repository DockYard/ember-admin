import { test } from 'ember-qunit';
import { rowValuesEqual } from '../helpers/equality-helpers';
import { fillInByLabel } from '../helpers/fill-in-by';
import Pretender from 'pretender';
import moduleForAcceptance from '../helpers/module-for-acceptance';

let server, toy;

moduleForAcceptance('Acceptance: Admin Relationships', {
  beforeEach() {
    server = new Pretender(function() {
      this.get('/admin/cats', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ cats: [], owners: [], toys: [] })];
      });
      this.get('/admin/cats/1', function() {
        let cats = [
          { id: 1, name: 'Felix', age: 10, owner: 1, toys: [1,2] }
        ];
        let owners = [
          { id: 1, name: 'Pat Sullivan', cats: [1] }
        ];
        let toys = [
          { id: 1, name: 'Ball', cat: 1 },
          { id: 2, name: 'Mouse', cat: 1 }
        ];
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ cats, owners, toys })];
      });
      this.get('/admin/birds', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ birds: [], toys: [] })];
      });
      this.get('/admin/birds/1', function() {
        let birds = [
          { id: 1, name: 'Boomer', toys: [3] }
        ];
        let toys = [
          { id: 3, name: 'Duck', bird: 1 }
        ];
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ birds, toys })];
      });
      this.post('/admin/toys', function(request) {
        toy = JSON.parse(request.requestBody).toy;
        toy.id = 3;
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ toys: [toy] })];
      });
      this.post('/admin/courses', function(request) {
        let { course } = JSON.parse(request.requestBody);
        course.id = 3;
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ courses: [course] })];
      });
      this.get('/admin/toys', function() {
        let toys = [
          { id: 1, name: 'Ball', cat: 1 },
          { id: 2, name: 'Mouse', cat: 1 }
        ];

        if (toy) {
          toys.push(toy);
        }
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ toys })];
      });
      this.get('/admin/toys/3', function() {
        let toys = [
          { id: 3, name: 'Bell', cat: 1 }
        ];
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ toys })];
      });
      this.get('/admin/owners', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ owners: [] })];
      });
      this.get('/admin/courses', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ courses: [] })];
      });
      this.get('/admin/owners/1', function() {
        let owners = [
          { id: 1, name: 'Brian', courses: [1] }
        ];
        let courses = [
          { id: 1, title: 'Teach Your Dog', owners: [1] }
        ];
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ owners, courses })];
      });
    });
  },
  afterEach() {
    server.shutdown();
    toy = undefined;
  }
});

test('should list relationships', function(assert) {
  visit('/admin/cat/1/edit');

  andThen(function() {
    let ownerRows = find('.owner table tr');
    rowValuesEqual(assert, ownerRows.eq(0), 'id', 'name');
    rowValuesEqual(assert, ownerRows.eq(1), '1', 'Pat Sullivan');

    let toyRows = find('.toy table tr');
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
    let toyRows = find('.toy table tr');
    rowValuesEqual(assert, toyRows.eq(3), '3', 'Bell');
  });

  andThen(function() {
    click('.toy a:contains("Bell")');
  });

  andThen(function() {
    click('.cat a:contains("Felix")');
  });
});

test('should not display "Create" if singular relationship model exists', function(assert) {
  visit('/admin/cat/1/edit');

  andThen(function() {
    let createLink = find('.owner a:contains("Create")');
    assert.equal(0, createLink.length, 'should not find the Create link');
  });
});

test('should not display "Create" if no inverse relationship exists', function(assert) {
  visit('/admin/bird/1/edit');

  andThen(function() {
    let toysTable = find('.toy');
    assert.equal(1, toysTable.length, 'should find the toy relationship table');
    let createLink = find('.toy a:contains("Create")');
    assert.equal(0, createLink.length, 'should not find the Create link');
  });
});

test('should properly create Many-to-Many relationship with inverse', function(assert) {
  visit('/admin/owner/1/edit');

  andThen(function() {
    let coursesTable = find('.course');
    assert.equal(1, coursesTable.length, 'should find the course relationship table');
    click('.course a:contains("Create")');
  });

  andThen(function() {
    fillInByLabel('title', 'New Course!');
    click(find('button.save'));
  });
});
