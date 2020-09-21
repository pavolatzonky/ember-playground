import { attribute, hasClass, text } from 'ember-cli-page-object';

export default {
  scope: '[data-test-channels-channel-messages-message="index"]',

  isSemiTransparent: hasClass('opacity-50'),

  avatar: {
    scope: '[data-test-channels-channel-messages-message="user-avatar"]',
    src: attribute('src'),
  },

  name: text('[data-test-channels-channel-messages-message="user-name"]'),

  timestamp: {
    scope: '[data-test-channels-channel-messages-message="timestamp"]',
  },

  body: text('[data-test-channels-channel-messages-message="body"]'),

  deleteButton: {
    scope: '[data-test-channels-channel-messages-message="delete"]',
  },

  errorMessage: {
    scope: '[data-test-channels-channel-messages-message="error-message"]',
  },
};
