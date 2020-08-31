import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';

module('Integration | Component | info-panel', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('me', { nickname: 'Bára' });
    const time = new Date();
    const hours = time.getHours();
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    await this.render(hbs`
      <InfoPanel
        @user={{this.me}}
      />
    `);

    assert.equal(
      document.querySelector('.info-panel__nickname').innerText,
      'Bára',
      'Nickname is ok'
    );
    assert.equal(
      document.querySelector('.info-panel__logged-at').innerText,
      `${hours}:${minutes}`,
      'Login time is ok'
    );
  });
});
