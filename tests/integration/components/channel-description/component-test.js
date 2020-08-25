import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';

module('Integration | Component | channel-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('name', 'channel name');
    this.set('description', 'channel description');

    await this.render(hbs`
      <ChannelHeader
        @name={{this.name}}
        @description={{this.description}}
      />
    `);

    assert.equal(
      document.querySelector('.channel-header__title').innerText.trim(),
      '#channel name',
      'Title is present'
    );
    assert.equal(
      document.querySelector('.channel-header__description').innerText.trim(),
      'channel description',
      'Description is present'
    );
  });
});
