import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

import setupRenderingTest from '../../../helpers/setup-rendering-test';
import page from '../../../pages/components/messages';

module('Integration | Component | messages', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    this.set(
      'messages',
      ArrayProxy.create({
        content: A([
          {
            avatarSrc:
              'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200',
            sender: 'Lisa Huang-North',
            timestamp: new Date(2020, 11, 30, 12, 1, 54),
            messageBody:
              'Professional network? Haha, you have no professional network!',
          },
          {
            avatarSrc:
              'https://en.gravatar.com/userimage/4584631/86f74019598950f6efd7b1b8e493259a.jpeg',
            sender: 'Lisa Huang-North',
            timestamp: new Date(2021, 11, 30, 12, 1, 54),
            messageBody: `I didn't mean you Mike.`,
          },
          {
            avatarSrc:
              'https://en.gravatar.com/userimage/4584631/86f74019598950f6efd7b1b8e493259a.jpeg',
            sender: 'Mike Nort',
            timestamp: new Date(2019, 11, 30, 12, 1, 54),
            messageBody: 'Would you like to join my professional network?',
          },
        ]),
      })
    );

    await this.render(hbs`<Messages
      @messages={{this.messages}}
    />`);

    assert.equal(
      this.page.messages.length,
      3,
      'There is one message shown for every item in the message array'
    );

    // testing order of the messages
    assert.equal(
      this.page.messages[0].body,
      'Would you like to join my professional network?',
      'First message displayed is ok'
    );
    assert.equal(
      this.page.messages[1].body,
      'Professional network? Haha, you have no professional network!',
      'Second message displayed is ok'
    );
    assert.equal(
      this.page.messages[2].body,
      `I didn't mean you Mike.`,
      'Third message displayed is ok'
    );
  });
});
