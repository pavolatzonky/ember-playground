<% if (testType === 'integration') { %>import { module, test } from 'qunit';
import setupRenderingTest from 'ember-playground/tests/helpers/setup-rendering-test';
import { hbs } from 'ember-cli-htmlbars';
import page from 'ember-playground/tests/pages/components/<%= componentPathName %>';

module('<%= friendlyTestDescription %>', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await this.render(hbs`{{<%= componentPathName %>}}`);

    assert.equal(this.page.text.trim(), '');
  });
});<% } else if (testType === 'unit') { %>import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('<%= friendlyTestDescription %>', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let component = this.owner.factoryFor('component:<%= componentPathName %>').create();
    assert.ok(component);
  });
});<% } %>
