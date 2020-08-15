import { module, test } from 'qunit';
import setupRenderingTest from 'ember-playground/tests/helpers/setup-rendering-test';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('avatarSrc', 'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200h');
    this.set('senderName', 'Lisa Huang-North');
    this.set('timestamp', 'Apr 21, 2019 12:21.38 PM');
    this.set('messageBody', 'A dummy message text');

    await this.render(hbs`<Message
      @avatarSrc={{this.avatarSrc}}
      @sender={{this.senderName}}
      @timestamp={{this.timestamp}}
      @messageBody={{this.messageBody}}
    />`);

    assert.equal(document.querySelector('.message__user-avatar').src, 'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200h', 'Avatar src is ok');
    assert.equal(document.querySelector('.message__user-name').innerText.trim(), 'Lisa Huang-North', 'Author name is ok');
    assert.equal(document.querySelector('.message__timestamp').innerText.trim(), 'Apr 21, 2019 12:21.38 PM', 'Timestamp is ok');
    assert.equal(document.querySelector('.message__body').innerText.trim(), 'A dummy message text', 'Message body is ok');
  });
});
