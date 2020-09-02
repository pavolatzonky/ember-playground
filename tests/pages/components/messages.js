import { collection } from 'ember-cli-page-object';

export default {
  messages: collection('[data-test-message="index"]'),
};
