import { module, test } from 'qunit';
import setupRenderingTest from 'ember-playground/tests/helpers/setup-rendering-test';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | message', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('senderName', "Lisa Huang-North");

    await this.render(hbs`<Message @sender={{this.senderName}} />`);

    assert.equal(document.querySelector('.message__user-name').text.trim(), 'Lisa Huang-North', 'Author name is ok');

  });

  test('it renders', async function (assert) {
    this.set('timeStamp', "Apr 21, 2019 12:21.38 PM");

    await this.render(hbs`<Message @time={{this.timeStamp}} />`);

    assert.equal(document.querySelector('.message__timestamp').text.trim(), 'Apr 21, 2019 12:21.38 PM', 'Time is ok');

  });

  test('it renders', async function (assert) {
    this.set('messageText', "Would you like to join my professional network?");

    await this.render(hbs`<Message @message={{this.messageText}} />`);

    assert.equal(document.querySelector('.message__body').text.trim(), 'Would you like to join my professional network?', 'Text is ok');

  });
});
