import { module, test } from 'qunit';
import setupRenderingTest from 'ember-playground/tests/helpers/setup-rendering-test';
import { hbs } from 'ember-cli-htmlbars';
import page from 'ember-playground/tests/pages/components/info-panel';

module('Integration | Component | info-panel', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    await this.render(hbs`
      <InfoPanel />
    `);

    assert.equal(
      document.querySelector('.info-panel__nickname').text.trim(),
      'Magda',
      'Nickname is ok.'
    );
    assert.equal(
      document.querySelector('.info-panel__logged-at'),
      'Last login time is present.'
    );
  });
});
