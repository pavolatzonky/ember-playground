import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../../helpers/setup-rendering-test';
import page from '../../../../pages/components/message';

module('Integration | Component | message', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    this.set(
      'avatarSrc',
      'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200h'
    );
    this.set('senderName', 'Lisa Huang-North');
    this.set('timestamp', new Date(2019, 1, 12, 7, 31, 14));
    this.set('messageBody', 'A dummy message text');

    await this.render(hbs`<Messages::Message
      @avatarSrc={{this.avatarSrc}}
      @sender={{this.senderName}}
      @timestamp={{this.timestamp}}
      @messageBody={{this.messageBody}}
    />`);

    assert.equal(
      this.page.avatar.src,
      'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200h',
      'Avatar src is ok'
    );
    assert.equal(this.page.name, 'Lisa Huang-North', 'Author name is ok');
    assert.equal(
      this.page.timestamp.text.trim(),
      '12/02/2019, 07:31:14',
      'Timestamp is ok'
    );
    assert.equal(this.page.body, 'A dummy message text', 'Message body is ok');
  });
});
