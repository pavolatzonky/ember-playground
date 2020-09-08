import { collection } from 'ember-cli-page-object';

export default {
  list: collection('[data-test-channels="list-item"]', {
    name: {
      scope: '[data-test-channels="list-item-name"]',
    },
  }),
};
