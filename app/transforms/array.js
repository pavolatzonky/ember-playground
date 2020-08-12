import { A } from '@ember/array';
import ArrayTransform from 'ember-data-model-fragments/transforms/array';

export default ArrayTransform.extend({
  deserialize() {
    return A(this._super(...arguments));
  },
});
