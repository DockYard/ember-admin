export default function(router) {
  router.route('admin', { resetNamespace: true }, function() {
    this.route('model-records', { path: ':name', resetNamespace: true }, function() {
      this.route('edit', { path: ':id/edit' });
      this.route('new');
    });
  });
}
