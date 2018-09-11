import DS from 'ember-data';

const {
  RESTAdapter
} = DS;

export default RESTAdapter.extend({
  shouldBackgroundReloadRecord() {
    return true;
  },

  fastboot: null
});
