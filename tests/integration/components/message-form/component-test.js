import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { timeout } from 'ember-concurrency';

import setupRenderingTest from '../../../helpers/setup-rendering-test';
import page from '../../../pages/components/message-form';

module('Integration | Component | message-form', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    await this.render(hbs`
      <MessageForm />
    `);

    assert.ok(this.page.messageInput.isPresent, 'Input is present');
    assert.equal(
      this.page.messageInput.placeholder,
      'Message #general',
      'Input placeholder is ok'
    );
    assert.equal(
      this.page.sendButton.text.trim(),
      'Send',
      'Send button text is ok'
    );
    assert.equal(
      this.page.sendButton.disabled,
      'disabled',
      'Send button is disabled'
    );
  });

  test('it sends a new message (successful scenario)', async function(assert) {
    assert.expect(4);

    this.set('sendMessage', async messageBody => {
      assert.equal(
        messageBody,
        'New message',
        'message body present on the new message'
      );

      //return true; // simulates success
      await timeout(1000);
    });

    await this.render(hbs`
      <MessageForm
        @onSendMessage={{this.sendMessage}}
      />
    `);

    await this.page.messageInput.fillIn('New message');

    assert.notOk(this.page.sendButton.disabled, 'Send button is enabled');

    await this.page.sendButton.click();

    assert.equal(this.page.messageInput.value, '', 'input is cleared');

    assert.equal(
      this.page.sendButton.disabled,
      'disabled',
      'Send button is disabled after message was sent successfuly'
    );
  });
});
