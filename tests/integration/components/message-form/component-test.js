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

    assert.ok(this.page.input, 'Input is present');
    assert.equal(
      this.page.input.placeholder,
      'Message #general',
      'Input placeholder is ok'
    );
    assert.equal(this.page.button.text.trim(), 'Send', 'Button text is ok');
  });
});
