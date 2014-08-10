export default function(router) {
  router.resource('admin', function() {
    this.resource('model-records', {path: ':name'}, function() {
      this.route('edit', {path: ':id/edit'});
      this.route('new');
    });
  });
}
