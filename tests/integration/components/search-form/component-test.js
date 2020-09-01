import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';
import { find } from '@ember/test-helpers';

module('Integration | Component | search-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`
      <SearchForm/>
    `);

    assert.ok(find('[data-test-search-form]'), 'Form is present');
    assert.ok(find('[data-test-search-form="button"]'), 'Input is present');
    assert.equal(
      find('[data-test-search-form="field"]').placeholder,
      'Search',
      'Search input placeholder is ok'
    );
  });
});
