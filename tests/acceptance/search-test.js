import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import setupApplicationTest from '../helpers/setup-application-test';
import search from '../pages/search';

module('Acceptance | search', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /search page works', async function(assert) {
    await search.visit();

    assert.equal(currentURL(), '/search', 'URL is ok');
  });
});
