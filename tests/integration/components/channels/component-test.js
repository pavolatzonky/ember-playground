import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';
import page from '../../../pages/components/channels';
import channels from '../../../../mirage/fixtures/channels';

module('Integration | Component | channels', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    this.set('channels', [
      this.push('channel', channels[0]), //z mirage/fixtures
      this.push('channel', channels[1]),
    ]);

    await this.render(hbs`<Channels
      @channels={{this.channels}}
    />`);

    assert.equal(
      this.page.list.length,
      2,
      'There is one channel link shown for every item in the channels array'
    );

    assert.equal(
      this.page.list[0].name.text,
      '#general',
      'name of the first channel is ok'
    );
    assert.equal(
      this.page.list[1].name.text,
      '#dev',
      'name of the second channel is ok'
    );
  });
});
