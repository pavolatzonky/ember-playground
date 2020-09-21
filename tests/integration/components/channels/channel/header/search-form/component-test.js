import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../../../../helpers/setup-rendering-test';
import page from '../../../../../../pages/components/channels/channel/header/search-form';

module(
  'Integration | Component | channels/channel/header/search-form',
  function(hooks) {
    setupRenderingTest(hooks, page);

    test('it renders', async function(assert) {
      await this.render(hbs`
      <Channels::Channel::Header::SearchForm/>
    `);

      assert.ok(this.page.isPresent, 'Form is present');
      assert.ok(this.page.button.isPresent, 'Input is present');
      assert.equal(
        this.page.field.placeholder,
        'Search',
        'Search input placeholder is ok'
      );
    });
  }
);
