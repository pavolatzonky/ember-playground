import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import setupRenderingTest from '../../../../helpers/setup-rendering-test';
import page from '../../../../pages/channels/channel';

module('Integration | Component | channels/channel', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    const channel = this.push('channel', {
      name: 'general',
      description: 'General chitchat',
    });

    const messages = ArrayProxy.create({
      content: A([]),
    });

    const newMessages = ArrayProxy.create({
      content: A([]),
    });

    const user = this.push('user', {
      id: 1454,
      firstname: 'John',
      lastname: 'Travolta',
      avatarSrc:
        'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200',
    });

    this.set('model', { channel, messages, newMessages, user });

    await this.render(hbs`<Channels::Channel
      @model={{this.model}}
    />`);

    assert.ok(page.channelHeader.isPresent, 'Channel Header is present.');
    assert.ok(page.messages.isPresent, 'Messages are present.');
    assert.ok(page.messageForm.isPresent, 'Message form is present.');
    assert.ok(page.infoPanel.isPresent, 'Info panel is present.');
  });
});
