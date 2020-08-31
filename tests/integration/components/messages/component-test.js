import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';

module('Integration | Component | messages', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('messages', [
      {
        avatarSrc:
          'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200',
        sender: 'Lisa Huang-North',
        timestamp: new Date(2019, 1, 12, 7, 31, 14),
        messageBody: 'Would you like to join my professional network?',
      },
      {
        avatarSrc:
          'https://en.gravatar.com/userimage/4584631/86f74019598950f6efd7b1b8e493259a.jpeg',
        sender: 'Mike North',
        timestamp: new Date(2020, 11, 30, 12, 1, 54),
        messageBody:
          'Hello developer, I looked at your profile and am impressed by your 14 years of COBOL experience. Are you happy in your current role?',
      },
    ]);

    await this.render(hbs`<Messages
      @messages={{this.messages}}
    />`);

    assert.equal(
      document.querySelectorAll('.message').length,
      2,
      'There is one message shown for every array item.'
    );
  });
});
