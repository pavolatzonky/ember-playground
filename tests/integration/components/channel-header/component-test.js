import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';
import { find } from '@ember/test-helpers';

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

    assert.ok(find('[data-test-channel-header]'), 'Header exists');
    assert.equal(
      find('[data-test-channel-header="title"]').innerText.trim(),
      '#channel name',
      'Title is present'
    );
    assert.equal(
      find('[data-test-channel-header="description"]').innerText.trim(),
      'channel description',
      'Description is present'
    );
  });
});
