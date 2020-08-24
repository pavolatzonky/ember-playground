import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';

module('Integration | Component | message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('avatarSrc', 'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200h');
    this.set('senderName', 'Lisa Huang-North');
    this.set('timestamp', new Date(2019, 1, 12, 7, 31, 14));
    this.set('messageBody', 'A dummy message text');

    await this.render(hbs`<Message
      @avatarSrc={{this.avatarSrc}}
      @sender={{this.senderName}}
      @timestamp={{this.timestamp}}
      @messageBody={{this.messageBody}}
    />`);

    assert.equal(document.querySelector('.message__user-avatar').src, 'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200h', 'Avatar src is ok');
    assert.equal(document.querySelector('.message__user-name').innerText.trim(), 'Lisa Huang-North', 'Author name is ok');
    assert.equal(document.querySelector('.message__timestamp').innerText.trim(), '12/02/2019, 07:31:14', 'Timestamp is ok');
    assert.equal(document.querySelector('.message__body').innerText.trim(), 'A dummy message text', 'Message body is ok');
  });
});
