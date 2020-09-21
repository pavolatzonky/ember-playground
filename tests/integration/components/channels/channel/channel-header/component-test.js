import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import setupRenderingTest from '../../../../../helpers/setup-rendering-test';
import page from '../../../../../pages/channels/channel/channel-header';

module('Integration | Component | channels/channel/channel-header', function(
  hooks
) {
  setupRenderingTest(hooks, page);

  test('it renders', async function(assert) {
    this.set('name', 'channel name');
    this.set('description', 'channel description');

    await this.render(hbs`
      <Channels::Channel::ChannelHeader
        @name={{this.name}}
        @description={{this.description}}
      />
    `);

    assert.ok(this.page.isPresent, 'Channel header component exists');
    assert.equal(this.page.title.text, '#channel name', 'Title is ok');
    assert.equal(this.page.title.name, 'my-title', 'Title name attr is ok');

    assert.equal(
      this.page.description.text,
      'channel description',
      'Description is present'
    );
  });
});
