window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "Using `Ember.HTMLBars.makeBoundHelper` is deprecated. Please refactor to using `Ember.Helper` or `Ember.Helper.helper`." },
    { handler: "silence", matchMessage: "Using Ember.HTMLBars._registerHelper is deprecated. Helpers (even dashless ones) are automatically resolved." },
    { handler: "throw", matchMessage: "The filter API will be moved into a plugin soon. To enable store.filter using an environment flag, or to use an alternative, you can visit the ember-data-filter addon page" },
    { handler: "silence", matchMessage: "Controller#needs is deprecated, please use Ember.inject.controller() instead" }
  ]
};
