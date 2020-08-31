import { module, test } from 'qunit';
import setupRenderingTest from 'ember-playground/tests/helpers/setup-rendering-test';
import { hbs } from 'ember-cli-htmlbars';
import page from 'ember-playground/tests/pages/components/info-panel';

module('Integration | Component | info-panel', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    await this.render(hbs`
      <InfoPanel
        @nickname="Magda"
      />
    `);

    assert.equal(
      document.querySelector('.info-panel__nickname').innerText.trim(),
      'Magda',
      'Nickname is ok.'
    );
    assert.equal(
      document.querySelector('.info-panel__logged-at').innerText,
      `${hours}:${minutes}`,
      'Last login time is okay.'
    );
  });
});
