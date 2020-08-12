import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export function initialize() {
  Component.reopen({
    classBlock: alias('componentCssClassName'),
  });
}

export default {
  initialize,
};
