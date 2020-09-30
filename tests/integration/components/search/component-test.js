import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import setupRenderingTest from '../../../helpers/setup-rendering-test';
import page from '../../../pages/components/search';

module('Integration | Component | search', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    const messages = ArrayProxy.create({
      content: A([]),
    });

    this.set('model', messages);

    await this.render(hbs`<Search
      @messages={{this.model}}
    />`);

    assert.ok(this.page.searchForm.isPresent, 'Search form is present');
    assert.ok(this.page.messages.isPresent, 'Messages are present');
  });
});
