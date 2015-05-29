# Ember Admin

[![Build](https://travis-ci.org/dockyard/ember-admin.svg?branch=master)](https://travis-ci.org/dockyard/ember-admin)

## About ##

Automatically discover your models and interact with all model data in a
simple CRUD interface. Great for a drop-in starter admin backend.

EmberAdmin uses its own data store so as not to pull in data it
shouldn't into your regular data store.

EmberData is currently a requirement.

## Install ##

```bash
npm install ember-admin --save-dev
```

## Usage ##

Add the admin routes to your `router.js`

```js
import adminRouter from 'ember-admin/router';

Router.map(function() {
  adminRouter(this);
});
```

Start your ember-cli project and navigate to `/admin`.

### Restricting Access ###

By default EmberAdmin is unrestricted. If you'd like to restrict access
you should override the `admin` route `app/routes/admin.js`

```js
import Ember from 'ember';
import EmberAdminRouteAdmin from 'ember-admin/routes/admin';

export default EmberAdminRouteAdmin.extend({

});
```

Now you can extend the Route to behave however you'd like.

**Note**: you should always take care to ensure that your backend API
used by EmberAdmin is properly restricted to authorized users.

### Backend ###

EmberAdmin expects as a default to access all of your models under an `admin/`
namespaced API. EmberAdmin will take the adapter for your model and
append `admin` to the current namespace. So if your `Dog` model's URL is typically:
`/api/dogs` EmberAdmin will try `/api/admin/dogs`. You will need to
provide the following backend API endpoints:

* `[GET]    /admin/:model`
* `[POST]   /admin/:model`
* `[PUT]    /admin/:model/:id`
* `[DELETE] /admin/:model/:id`

### Customizing ###

#### Templates ####

By default EmberAdmin will serve up its own templates that are pretty
generic. You can override the following template paths:

* `app/templates/admin.hbs` - landing page for admin interface
* `app/templates/admin/index/default.hbs` - lists all records for a
  given model
* `app/templates/admin/edit/default.hbs` - edit form for a given record
* `app/templates/admin/new/default.hbs` - form for creating a new record

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

#### Namespace ####

If you want to access your models under a different namespace
override `app/services/admin.js` in the following way:

```js
import Ember from 'ember';
import EmberAdminServiceAdmin from 'ember-admin/services/admin';

export default EmberAdminServiceAdmin.extend({
  namespace: 'custom'
});
```
So if your `Dog` model's URL is typically:
`/api/dogs` EmberAdmin will now try `/api/custom/dogs`.

#### Including / Excluding Models ####

All models available to Ember Data will be included by default. But you
may not want to give access to all models. You can control this behavior
with the Admin Service object. You will need to override
`app/services/admin.js`

```js
import Ember from 'ember';
import EmberAdminServiceAdmin from 'ember-admin/services/admin';

export default EmberAdminServiceAdmin.extend({
  includedModels: null,
  excludedModels: null
});
```

If you set `includedModels` to an array like `['person', 'project']`
then **only** the `Person` and `Project` models will be available to the
admin interface.

If you set `excludedModels` to an array like `['person']` then every
model **except** `Person` will be available to the admin interface.

You can mix `includedModels` and `excludedModels`:

```js
includedModels: ['person', 'project'],
excludedModels: ['person']
```

This configuration means that **only** the `Project` model will be
available.

### Including / Excluding Columns ###

All columns defined are included by default. But you may not want to
allow all columns to be listed on the index, or part of the form. Or,
you may want to use non `DS.attr` properties. To define the specific
columns to include or exclude for a given model you need to override the
Admin Service object from the previous section, and modify the
following:

```js
includedColumns: {
  'person': ['name', 'age']
},
excludedColumns: {
  'project': ['dateCreated']
}
```

`includedColumns` and `excludedColumns` are objects who's keys should
map to the model name. Each key's values are a collection of values that
should match properties.

The record index table will *always* have the `id` property available.
And the record edit/create forms will *never* have the `id` property
editable.

## Plugins ##

Plugins can take many forms but the general idea is that they will extend the default behavior of `ember-admin`. Below is a list to choose from.

* [ember-admin-bootstrap](https://github.com/dockyard/ember-admin-bootstrap)

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

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2014

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
