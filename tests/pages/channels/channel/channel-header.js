import { attribute } from 'ember-cli-page-object';

export default {
  scope: '[data-test-channels-channel-channel-header="index"]',

  title: {
    scope: '[data-test-channels-channel-channel-header="title"]',
    name: attribute('name'),
  },
  description: {
    scope: '[data-test-channels-channel-channel-header="description"]',
  },
};
