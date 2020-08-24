import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import setupRenderingTest from '../../../helpers/setup-rendering-test';

module('Integration | Component | channel-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('channelName', 'general');
    this.set(
      'descriptionText',
      'Just some general people generally chatting about general things'
    );

    await this.render(
      hbs`<ChannelHeader
        @channel={{this.channelName}}
        @description={{this.descriptionText}}
      />`
    );

    assert.equal(
      document.querySelector('.channel-header__title').innerText.trim(),
      '# general',
      'Channel name is ok'
    );
    assert.equal(
      document.querySelector('.channel-header__description').innerText.trim(),
      'Just some general people generally chatting about general things',
      'Channel description is ok'
    );
  });
});
