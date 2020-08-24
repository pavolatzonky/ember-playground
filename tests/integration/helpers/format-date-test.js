import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | format-date', function(hooks) {
  setupRenderingTest(hooks);

  test('it formats the given date', async function(assert) {
    const dateValue = new Date(2000, 10, 30, 9, 30, 0);

    this.set('date', dateValue); // positional argument
    this.set('outputFormat', 'dd.MM.yyyy'); // named argument

    await render(hbs`
    {{format-date this.date outputFormat=this.outputFormat}}`);

    assert.equal(
      this.element.textContent.trim(),
      '30.11.2000'
    );
  });
});
