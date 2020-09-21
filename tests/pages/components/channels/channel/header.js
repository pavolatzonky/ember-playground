import { attribute } from 'ember-cli-page-object';

export default {
  scope: '[data-test-channels-channel-header="index"]',

  title: {
    scope: '[data-test-channels-channel-header="title"]',
    name: attribute('name'),
  },
  description: {
    scope: '[data-test-channels-channel-header="description"]',
  },
};
