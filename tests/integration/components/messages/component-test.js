import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

import setupRenderingTest from '../../../helpers/setup-rendering-test';
import page from '../../../pages/components/messages';

module('Integration | Component | messages', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    const message1 = this.push('message', {
      id: 2,
      timestamp: new Date(2020, 11, 30, 12, 1, 54).toISOString(),
      messageBody:
        'Professional network? Haha, you have no professional network!',
      channel: 'general',
      sender: 1,
    });

    const message2 = this.push('message', {
      id: 3,
      timestamp: new Date(2021, 11, 30, 12, 1, 54).toISOString(),
      messageBody: `I didn't mean you Mike.`,
      channel: 'general',
      sender: 1,
    });

    const message3 = this.push('message', {
      id: 1,
      timestamp: new Date(2019, 11, 30, 12, 1, 54).toISOString(),
      messageBody: 'Would you like to join my professional network?',
      channel: 'general',
      sender: 2,
    });

    this.set(
      'messages',
      ArrayProxy.create({
        content: A([message1, message2, message3]),
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
