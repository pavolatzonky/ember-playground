import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';

module('Integration | Component | info-panel', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('user', { nickname: 'Imhotep' });

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    await this.render(hbs`
      <InfoPanel @user={{this.user}} />
    `);

    assert.equal(
      document
        .querySelector('.info-panel__logged-as-section')
        .textContent.trim(),
      'Logged in as Imhotep',
      'Logged as section is ok'
    );
    assert.equal(
      document
        .querySelector('.info-panel__logged-at-section')
        .textContent.trim(),
      `Last login at ${hours}:${minutes}`,
      'Logged at section is ok'
    );
  });
});
