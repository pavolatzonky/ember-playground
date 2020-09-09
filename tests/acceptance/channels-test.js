import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import setupApplicationTest from '../helpers/setup-application-test';
import channels from '../pages/channels';

module('Acceptance | channels', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /channels', async function(assert) {
    await channels.visit();

    assert.equal(channels.list[0].name.text, 'general');
    assert.equal(channels.list[1].name.text, 'dev');
    assert.equal(channels.list[2].name.text, 'random');

    assert.equal(currentURL(), '/channels', 'URL is ok');
  });

  test('redirection from /channels to specific channel works', async function(assert) {
    await channels.visit();

    await channels.list[0].name.click();

    assert.equal(currentURL(), '/channels/general', 'URL is ok');
  });
});
