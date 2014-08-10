import Ember from 'ember';

export default Ember.Mixin.create({
  model: function() {
    return this.admin.store.find(this.modelFor('model-records').name);
  },
  renderTemplate: function() {
    var templatePath = 'admin/index/' + this.modelFor('model-records').name;

    if (this.container.resolve('template:'+templatePath)) {
      this.render(templatePath);
    } else {
      this.render();
    }
  }
});
