import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../helpers/setup-rendering-test';
import page from '../../../pages/components/channels';

module('Integration | Component | channels', function(hooks) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    this.set('channels', [
      {
        id: 1,
        name: 'channel-1',
        description: 'channel 1 description',
      },
      {
        id: 2,
        name: 'channel-2',
        description: 'channel 2 description',
      },
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
      'channel-1',
      'name of the first channel is ok'
    );
    assert.equal(
      this.page.list[1].name.text,
      'channel-2',
      'name of the second channel is ok'
    );
  });
});
