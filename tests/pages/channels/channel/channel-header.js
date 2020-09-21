import { attribute } from 'ember-cli-page-object';

export default {
  scope: '[data-test-channel-header="index"]',

  title: {
    scope: '[data-test-channel-header="title"]',
    name: attribute('name'),
  },
  description: { scope: '[data-test-channel-header="description"]' },
};
