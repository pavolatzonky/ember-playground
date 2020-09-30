import { attribute } from 'ember-cli-page-object';

export default {
  scope: '[data-test-ui-search-form="index"]',
  field: {
    scope: '[data-test-ui-search-form="field"]',
    placeholder: attribute('placeholder'),
  },

  button: {
    scope: '[data-test-ui-search-form="button"]',
  },
};
