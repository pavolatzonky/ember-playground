import Helper from '@ember/component/helper';
import { isArray } from '@ember/array';

function spreadArrayTypeElements(modifiers = []) {
  return modifiers.reduce((prev, modifier) => {
    if (isArray(modifier)) {
      prev.push(...spreadArrayTypeElements(modifier));
    } else {
      prev.push(modifier);
    }
    return prev;
  }, []);
}

export function bem([block, element, ...modifiers], { prefix } = {}) {
  let result = '';
  let base = '';
  modifiers = spreadArrayTypeElements(modifiers);

  if (block) {
    base += block.componentCssClassName || block;
  }

  if (element) {
    base += `__${element}`;
  }

  if (prefix) {
    result += prefix;
  }

  result += base;
  result += modifiers
    .filter(Boolean)
    .map(modifier => ` ${base}--${modifier}`)
    .join('');

  return result;
}

export default Helper.helper(bem);
