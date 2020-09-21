import { attribute } from 'ember-cli-page-object';

export default {
  messageInput: {
    scope: '[data-test-channels-channel-message-form="message-input"]',
    placeholder: attribute('placeholder'),
  },

  sendButton: {
    scope: '[data-test-channels-channel-message-form="message-send-button"]',
    disabled: attribute('disabled'),
  },
};
