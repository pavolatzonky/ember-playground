import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import setupApplicationTest from '../helpers/setup-application-test';
import application from '../pages/index';
//import channels from '../pages/channels';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('redirection from / to /channels page works', async function(assert) {
    await application.visit();

    assert.equal(currentURL(), '/channels', 'URL is ok');
  });
});
