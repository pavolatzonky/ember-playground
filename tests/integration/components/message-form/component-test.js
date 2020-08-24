import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import setupRenderingTest from '../../../helpers/setup-rendering-test';

module('Integration | Component | channel-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`<MessageForm />`);

    assert.ok(
      document.querySelector('.channel-footer__message-input'),
      'Input is present'
    );
  });
});
