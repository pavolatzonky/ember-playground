import FragmentArrayTransform from 'ember-data-model-fragments/transforms/fragment-array';
import { isNone } from '@ember/utils';

export default class NullSafeFragmentArray extends FragmentArrayTransform {
  deserialize(serialized, { defaultValue = [] }) {
    if (isNone(serialized)) {
      return super.deserialize(defaultValue);
    }

    return super.deserialize(serialized);
  }
}
