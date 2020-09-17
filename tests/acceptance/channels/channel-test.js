import { module, test } from 'qunit';
import { currentURL, waitUntil } from '@ember/test-helpers';
import format from 'date-fns/format';
import setupApplicationTest from '../../helpers/setup-application-test';
import serviceUnavailable from '../../../mirage/responses/service-unavailable';
import ok from '../../../mirage/responses/ok';
import parseJSON from '../../../mirage/utils/parse-json';
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
      'Three messages are displayed'
    );
  });

  test('shows error message when loading messages fails', async function(assert) {
    this.server.get('/messages', () => {
      return serviceUnavailable();
    });

    await channel.visit();

    assert.equal(
      channel.error.error,
      'Channel messages could not be loaded',
      'Error message is ok'
    );
  });

  test('shows a message being sent (successful scenario)', async function(assert) {
    assert.expect(10);

    await channel.visit();

    assert.equal(currentURL(), '/channels/general');

    this.server.post('/messages', async ({ db }, request) => {
      const data = parseJSON(request);

      assert.equal(
        data.timestamp.substring(0, 18),
        new Date().toISOString().substring(0, 18),
        'Server receives timestamp in the request (accuracy: to seconds) althoug re-set on BE'
      );

      assert.equal(
        data.messageBody,
        'My new message',
        'Server receives message body in the request'
      );

      assert.equal(
        data.channel,
        'general',
        'Server receives channel ID in the request'
      );

      assert.equal(
        data.sender,
        'me',
        'Server receives sender ID in the request'
      );

      data.timestamp = new Date().toISOString();
      const newMessage = db.messages.insert(data);
      return ok(newMessage);
    });

    await channel.messageForm.messageInput.fillIn('My new message');
    channel.messageForm.sendButton.click();

    await waitUntil(function() {
      return channel.messages.messages.length === 3;
    });

    assert.ok(
      channel.messages.messages[2].isSemiTransparent,
      'The currently sent message is semi-transparent'
    );

    assert.equal(
      channel.messages.messages[2].name,
      'Honza Novotný',
      'Correct user name is displayed'
    );

    assert.equal(
      channel.messages.messages[2].body,
      'My new message',
      'Body of the third (currently added) message is shown'
    );

    assert.equal(
      channel.messages.messages[2].avatar.src,
      'https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200',
      'Correct avatar is displayed'
    );

    const timestamp = channel.messages.messages[2].timestamp.text;
    assert.equal(
      timestamp.substring(0, timestamp.length - 3),
      format(new Date(), 'dd/MM/yyyy, HH:mm'),
      'Creation time is displayed'
    );

    await waitUntil(function() {
      return !channel.messages.messages[2].isSemiTransparent;
    });
  });

  test('deletes a message (successful scenario)', async function(assert) {
    await channel.visit();

    await channel.messages.messages[1].deleteButton.click();

    assert.equal(
      channel.messages.messages.length,
      1,
      'One message is displayed'
    );
  });
});
