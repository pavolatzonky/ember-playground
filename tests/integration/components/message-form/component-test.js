import { module, test } from 'qunit';
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
    assert.equal(this.page.sendButton.text.trim(), 'Send', 'Button text is ok');
  });
});
