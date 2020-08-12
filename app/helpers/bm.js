import { helper } from '@ember/component/helper';
import { bem } from 'ember-playground/helpers/bem';

export function bm([block, ...modifiers], hash) {
  return bem([block, null, ...modifiers], hash);
}

export default helper(bm);
