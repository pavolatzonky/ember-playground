import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';
module('Integration | Component | search-form', function(hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function(assert) {
    await this.render(hbs`
      <SearchForm />
    `);
    assert.ok(document.querySelector('form'), 'Form is present');
    assert.ok(
      document.querySelector('.search-form__button'),
      'Input is present'
    );
  });
});
