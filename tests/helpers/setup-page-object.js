import { create } from 'ember-cli-page-object';

export default function(hooks, page) {
  if (page) {
    hooks.beforeEach(function() {
      this.page = create(page);
    });
  }
}
