import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';
import page from '../../../pages/components/error';

module('Integration | Component | error', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    this.set('error', 'Error occurred');

    await this.render(hbs`<Error @error={{this.error}} />`);

    assert.equal(this.page.error, 'Error occurred', 'Displays error message');
  });
});
