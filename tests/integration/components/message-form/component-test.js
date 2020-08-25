import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';

module('Integration | Component | message-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`
      <MessageForm />
    `);

    assert.ok(
      document.querySelector('.channel-footer__message-input'),
      'Input is present'
    );
    assert.equal(
      document.querySelector('.channel-footer__message-input').placeholder,
      'Message #general',
      'Input placeholder is ok'
    );
    assert.equal(
      document
        .querySelector('.channel-footer__message-send-button')
        .textContent.trim(),
      'Send',
      'Button text is ok'
    );
  });
});
