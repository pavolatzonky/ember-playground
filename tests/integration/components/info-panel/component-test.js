import { module, test } from 'qunit';
import setupRenderingTest from 'ember-playground/tests/helpers/setup-rendering-test';
import { hbs } from 'ember-cli-htmlbars';
import page from 'ember-playground/tests/pages/components/info-panel';
import { find } from '@ember/test-helpers';

module('Integration | Component | info-panel', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    this.set('user', { nickname: 'Magda' }); //this je kontext testu, potřebuju v tom kontextu propertu user, která je objekt s propertou nickname
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    await this.render(hbs`
      <InfoPanel
        @user={{this.user}}
      />
    `);

    assert.equal(
      find('[data-test-info-panel="nickname"]').innerText.trim(),
      'Magda',
      'Nickname is ok.'
    );
    assert.equal(
      find('[data-test-info-panel="timestamp"]').innerText,
      `${hours}:${minutes}`,
      'Last login time is okay.'
    );
  });
});
