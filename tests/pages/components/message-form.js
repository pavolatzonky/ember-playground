import { attribute } from 'ember-cli-page-object';

export default {
  messageInput: {
    scope: '[data-test-channel-footer="message-input"]',
    placeholder: attribute('placeholder'),
  },

  sendButton: {
    scope: '[data-test-channel-footer="message-send-button"]',
    disabled: attribute('disabled'),
  },
};
