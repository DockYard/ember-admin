import { alias } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { inject } from '@ember/controller';

export default Mixin.create({
  'model-records': inject(),
  recordType: alias('model-records.recordType')
});
