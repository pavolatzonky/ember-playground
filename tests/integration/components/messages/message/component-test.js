import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../../helpers/setup-rendering-test';
import { find } from '@ember/test-helpers';

module('Integration | Component | message', function(hooks) {
  setupRenderingTest(hooks);

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
      find('[data-test-message="avatar"]').src,
      'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200h',
      'Avatar src is ok'
    );
    assert.equal(
      find('[data-test-message="username"]').innerText.trim(),
      'Lisa Huang-North',
      'Author name is ok'
    );
    assert.equal(
      find('[data-test-message="timestamp"]').innerText.trim(),
      '12/02/2019, 07:31:14',
      'Timestamp is ok'
    );
    assert.equal(
      find('[data-test-message="body"]').innerText.trim(),
      'A dummy message text',
      'Message body is ok'
    );
  });
});
