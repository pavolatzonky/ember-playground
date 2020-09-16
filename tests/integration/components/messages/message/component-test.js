import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../../helpers/setup-rendering-test';
import page from '../../../../pages/components/messages/message';

module('Integration | Component | messages/message', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    this.push('user', {
      id: 1454,
      firstname: 'John',
      lastname: 'Travolta',
      avatarSrc:
        'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200',
    });

    const message = this.push('message', {
      id: 1,
      timestamp: new Date(2019, 1, 12, 7, 31, 14).toISOString(),
      messageBody: 'A dummy message text',
      channel: 'dev',
      sender: 1454,
    });

    this.set('message', message);

    await this.render(hbs`<Messages::Message
      @message={{this.message}}
    />`);

    assert.equal(
      this.page.avatar.src,
      'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200',
      'Avatar src is ok'
    );
    assert.equal(this.page.name, 'John Travolta', 'Author name is ok');
    assert.equal(
      this.page.timestamp.text.trim(),
      '12/02/2019, 07:31:14',
      'Timestamp is ok'
    );
    assert.equal(this.page.body, 'A dummy message text', 'Message body is ok');
  });
});
