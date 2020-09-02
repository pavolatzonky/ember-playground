import { attribute } from 'ember-cli-page-object';

export default {
  input: {
    scope: '[data-test-message-form="input"]',
    placeholder: attribute('placeholder'),
  },

  button: {
    scope: '[data-test-message-form="send-button"]',
  },
};
