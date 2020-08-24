import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import setupRenderingTest from '../../../helpers/setup-rendering-test';

module('Integration | Component | message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('senderName', 'Lisa Huang-North');
    this.set('timeStamp', 'Apr 21, 2019 12:21.38 PM');
    this.set('messageText', 'Would you like to join my professional network?');
    this.set(
      'avatarURL',
      'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200'
    );

    await this.render(
      hbs`<Message
        @sender={{this.senderName}}
        @time={{this.timeStamp}}
        @message={{this.messageText}}
        @avatar={{this.avatarURL}}
      />`
    );

    assert.equal(
      document.querySelector('.message__user-name').text.trim(),
      'Lisa Huang-North',
      'Author name is ok'
    );
    assert.equal(
      document.querySelector('.message__timestamp').textContent.trim(),
      'Apr 21, 2019 12:21.38 PM',
      'Time is ok'
    );
    assert.equal(
      document.querySelector('.message__body').textContent.trim(),
      'Would you like to join my professional network?',
      'Text is ok'
    );
    assert.equal(
      document.querySelector('.message__user-avatar').src,
      'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200',
      'URL is ok'
    );
  });
});
