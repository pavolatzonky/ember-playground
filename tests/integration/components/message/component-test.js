import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';

module('Integration | Component | message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('senderName', 'Lisa Huang-North');
    this.set('timeStamp', 'Apr 21, 2019 12:21.38 PM');
    this.set('messageText', 'Would you like to join my professional network?');

    await this.render(hbs`<Message
      @sender={{this.senderName}}
      @timestamp={{this.timeStamp}}
      @message={{this.messageText}}
    />`);
    //await this.pauseTest(); - používáme při debuggování

    assert.equal(
      document.querySelector('.message__user-name').text.trim(),
      'Lisa Huang-North',
      'Author name is ok'
    );

    // test timestamp
    assert.equal(
      document.querySelector('.message__timestamp').textContent.trim(),
      'Apr 21, 2019 12:21.38 PM',
      'Timestamp is ok'
    );

    // test message text
    assert.equal(
      document.querySelector('.message__body').textContent.trim(),
      'Would you like to join my professional network?',
      'Message is ok'
    );
  });
});
