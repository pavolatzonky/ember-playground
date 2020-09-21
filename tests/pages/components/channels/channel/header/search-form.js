import { attribute } from 'ember-cli-page-object';

export default {
  scope: '[data-test-channels-channel-header-search-form="index"]',
  field: {
    scope: '[data-test-channels-channel-header-search-form="field"]',
    placeholder: attribute('placeholder'),
  },

  button: {
    scope: '[data-test-channels-channel-header-search-form="button"]',
  },
};
