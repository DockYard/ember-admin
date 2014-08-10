# Ember Admin

[![Build](https://travis-ci.org/dockyard/ember-admin.svg?branch=master)](https://travis-ci.org/dockyard/ember-admin)

## About ##

Ensure you clean up after your models.

Any routes you deactivate will check the `model` to ensure it is not
unsaved. If it is it will either rollback or remove the model from the
store depending if has been previously persisted.

## Install ##

```bash
npm install ember-admin --save-dev
```

## Usage ##

Add the Admin routes to your `routes.js`

```js
import adminRouter from 'ember-admin/router';

Router.map(function() {
  adminRouter(this);
});
```

### Backend ###

EmberAdmin expects to access all of your models under an `admin/`
namespaced API. EmberAdmin will take the adapter for your model and
inject the `admin` namespace. So if your `Dog` model's URL is typically:
`/api/dogs` EmberAdmin will try `api/admin/dogs`. You will need to
provide the following backend API endpoints:

* `[GET]    admin/:model`
* `[POST]   admin/:model`
* `[PUT]    admin/:model/:id`
* `[DELETE] admin/:model/:id`

### Customizing ###

By default EmberAdmin will serve up its own templates that are pretty
generic. You can override the following templates paths:

* `app/templates/admin.hbs` - landing page for Admin interface
* `app/templates/model-records/index.hbs` - lists all records for a
  given model
* `app/templates/model-records/edit.hbs` - edit form for a given record
* `app/templates/model-records/new.hbs` - form for creating a new record

The above templates will apply to all models. If you want to have forms
that apply to a specific model for more in-depth customization you
override:

* `app/templates/admin/index/:model.hbs` - lists all records for the
  given model
* `app/templates/admin/edit/:model.hbs` - edit form for the given model
* `app/templates/admin/new/:model.hbs` - form for creating a new record

Just replace `:model` with the name of your model. EmberAdmin will
always attempt to resolve a model-specific template before rendering the
more generic one.

## Authors ##

* [Brian Cardarella](http://twitter.com/bcardarella)

[We are very thankful for the many contributors](https://github.com/dockyard/ember-admin/graphs/contributors)

## Versioning ##

This library follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this gem. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-admin/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](http://dockyard.com), Inc &copy; 2014

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
