import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  features: service(),

  compute([featureName, compareToValue, fallback]) {
    if (typeof compareToValue === 'undefined') {
      compareToValue = true;
    }

    return this.features.variation(featureName, fallback) === compareToValue;
  },
});
