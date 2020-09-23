import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';
import page from '../../../pages/components/search';

module('Integration | Component | search', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    await this.render(hbs`<Search />`);

    assert.ok(this.page.searchForm.isPresent, 'Search form is present');
  });
});
