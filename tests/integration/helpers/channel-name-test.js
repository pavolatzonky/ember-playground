import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | channel-name', function(hooks) {
  setupRenderingTest(hooks);

  test('it prefixes given channel name', async function(assert) {
    this.set('channelName', 'channel');

    await render(hbs`
      {{channel-name this.channelName}}
    `);

    assert.equal(this.element.textContent.trim(), '#channel');
  });
});
