import { attribute } from 'ember-cli-page-object';

export default {
  scope: '[data-test-search-form="index"]',
  field: {
    scope: '[data-test-search-form="field"]',
    placeholder: attribute('placeholder'),
  },

  button: {
    scope: '[data-test-search-form="button"]',
  },
};
