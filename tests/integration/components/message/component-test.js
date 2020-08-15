import { module, test } from 'qunit';
import setupRenderingTest from 'ember-playground/tests/helpers/setup-rendering-test';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('senderName', "Lisa Huang-North");

    await this.render(hbs`<Message @sender={{this.senderName}} />`);

    assert.equal(document.querySelector('.message__user-name').text.trim(), 'Lisa Huang-North', 'Author name is ok');

    // TODO:
    // test timestamp
    // test message text
  });
});
