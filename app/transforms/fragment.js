import FragmentTransform from 'ember-data-model-fragments/transforms/fragment';
import { isNone } from '@ember/utils';

export default class NullSafeFragment extends FragmentTransform {
  deserialize(serialized, { defaultValue }) {
    if (isNone(serialized) && defaultValue) {
      return super.deserialize(defaultValue);
    }

    return super.deserialize(serialized);
  }
}
