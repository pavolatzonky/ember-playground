import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | channel-name', function(hooks) {
  setupRenderingTest(hooks);

  test('it formats the given name', async function(assert) {
    const nameValue = 'general';
    this.set('name', nameValue);

    await render(hbs`
    {{channel-name this.name}}`);

    assert.equal(this.element.textContent.trim(), '#general');
  });
});
