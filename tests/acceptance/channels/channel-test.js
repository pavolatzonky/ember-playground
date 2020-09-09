import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import setupApplicationTest from '../../helpers/setup-application-test';
import channels from '../../pages/channels';
import channel from '../../pages/channels/channel';

module('Acceptance | channels/channel', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /channels/channel', async function(assert) {
    await channel.visit();

    assert.equal(currentURL(), '/channels/general');

    assert.ok(channel.channelHeader.isPresent, 'Channel Header is present.');
    assert.ok(channel.messages.isPresent, 'Messages are present.');
    assert.ok(channel.messageForm.isPresent, 'Message form is present.');
    assert.ok(channel.infoPanel.isPresent, 'Info panel is present.');

    assert.equal(
      channel.channelHeader.title.text,
      '#general',
      'Channel header title is okay'
    );
    assert.equal(
      channel.channelHeader.description.text,
      'Just some general people generally chatting about general things',
      'Channel header description is okay'
    );
    assert.equal(
      channel.messages.messages.length,
      2,
      'Two messages are displayed'
    );
  });

  test('switching channels causes /channels/channel content to change', async function(assert) {
    await channel.visit();

    assert.equal(currentURL(), '/channels/general');

    await channels.list[1].name.click();

    assert.equal(
      channel.channelHeader.title.text,
      '#dev',
      'Channel header title has changed'
    );
    assert.equal(
      channel.channelHeader.description.text,
      'Very serious channel for developers only',
      'Channel header description has changed'
    );

    // otestovanie noveho obsahu messages
    assert.equal(
      channel.messages.messages.length,
      3,
      'Two messages are displayed'
    );
  });
});
