import { attribute, text } from 'ember-cli-page-object';

export default {
  scope: '[data-test-message="index"]',
  avatar: {
    scope: '[data-test-message="user-avatar"]',
    src: attribute('src'),
  },

  name: text('[data-test-message="user-name"]'),

  timestamp: {
    scope: '[data-test-message="timestamp"]',
  },

  body: text('[data-test-message="body"]'),
};
