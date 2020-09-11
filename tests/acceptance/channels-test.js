import { module, test } from 'qunit';
import { currentURL, setupOnerror } from '@ember/test-helpers';
import setupApplicationTest from '../helpers/setup-application-test';
import channels from '../pages/channels';
import serviceUnavailable from '../../mirage/responses/service-unavailable';

module('Acceptance | channels', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /channels', async function(assert) {
    await channels.visit();

    assert.equal(channels.list[0].name.text, '#general');
    assert.equal(channels.list[1].name.text, '#dev');
    assert.equal(channels.list[2].name.text, '#random');

    assert.equal(currentURL(), '/channels', 'URL is ok');
  });

  test('redirection from /channels to specific channel works', async function(assert) {
    await channels.visit();

    await channels.list[0].name.click();

    assert.equal(currentURL(), '/channels/general', 'URL is ok');
  });

  test('shows error message when loading channels fails', async function(assert) {
    assert.expect(2);

    this.server.get('/channels', () => {
      return serviceUnavailable();
    });

    setupOnerror(error => {
      assert.ok(error, 'Propagated error is correct');
    });

    await channels.visit();

    assert.equal(
      channels.error.error,
      'Channels could not be loaded',
      'Error message is ok'
    );
  });
});
