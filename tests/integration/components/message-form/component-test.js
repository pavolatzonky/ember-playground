import { module, test, todo } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
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

  todo('it sends a new message (successful scenario)', async function(assert) {
    assert.expect(2);

    this.set('sendMessage', async newMessage => {
      assert.equal(
        newMessage.messageBody,
        'New message',
        'message body present on the new message'
      );

      assert.ok(
        this.page.sendButton.disabled,
        'Send button is disabled as message is being sent'
      );

      return true; // simulates success
    });

    await this.render(hbs`
      <MessageForm
        @onMessageSend={{this.sendMessage}}
      />
    `);

    await this.page.messageInput.fillIn('New message');

    assert.notOk(this.page.sendButton.disabled, 'Send button is enabled');

    await this.page.sendButton.click();

    assert.notOk(
      this.page.sendButton.disabled,
      'Send button is enabled after message was sent successfuly'
    );

    assert.equal(this.page.messageInput.value(), '', 'input is cleared');
  });
});
