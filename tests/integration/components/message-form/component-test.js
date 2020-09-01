import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';
import { find } from '@ember/test-helpers';

module('Integration | Component | message-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`
      <MessageForm
        @nameValue="general"
      />
    `);

    assert.ok(
      find('[data-test-message-form="message-input"]'),
      'Input is present'
    );
    assert.equal(
      find('[data-test-message-form="message-input"]').placeholder,
      'Message #general',
      'Input placeholder is ok'
    );
    assert.equal(
      find('[data-test-message-form="message-send-button"]').innerText.trim(),
      'SEND',
      'Button text is ok'
    );
  });
});
