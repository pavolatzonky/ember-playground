import { module, test } from 'qunit';
import setupRenderingTest from 'ember-playground/tests/helpers/setup-rendering-test';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('<%= friendlyTestName %>', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    await render(hbs`<div {{<%= dasherizedModuleName %>}}></div>`);

    assert.ok(true);
  });
});
