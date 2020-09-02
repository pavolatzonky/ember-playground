import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';
import page from '../../../pages/components/info-panel';

module('Integration | Component | info-panel', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    this.set('user', { nickname: 'Honza' });

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
      this.page.nickname.text.trim(),
      'Honza',
      'Logged as section is ok'
    );
    assert.equal(
      this.page.login.text.trim(),
      `${hours}:${minutes}`,
      'Logged at section is ok'
    );
  });
});
