import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import setupApplicationTest from '../helpers/setup-application-test';
import search from '../pages/search';

module('Acceptance | search', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /search page works', async function(assert) {
    await search.visit();

    assert.equal(currentURL(), '/search', 'URL is ok');

    assert.ok(search.search.searchForm.isPresent, 'Search Form is present');
    assert.ok(search.search.messages.isPresent, 'Messages are present');
  });

  test('starting new search by typing in new search term', async function(assert) {
    assert.expect(4);

    await search.visit();

    assert.equal(currentURL(), '/search');

    await search.search.searchForm.field.fillIn('forever');
    await search.search.searchForm.button.click();

    assert.equal(currentURL(), '/search?searchTerm=forever');

    assert.equal(
      search.search.messages.messages[0].body,
      'It will take us forever',
      'Full body of message including the search term is shown'
    );

    assert.equal(
      search.search.searchForm.field.value,
      'forever',
      'Search term remains as input'
    );
  });

  test('filters messages by channel and user', async function(assert) {
    await search.visit();

    assert.equal(currentURL(), '/search');

    await search.search.searchForm.field.fillIn('a');
    await search.search.searchForm.button.click();

    assert.equal(currentURL(), '/search?searchTerm=a');

    assert.equal(
      search.search.messages.messages.length,
      4,
      'Four messages filtered by search term are shown'
    );

    await search.search.checkboxesChannels[1].click();

    assert.equal(
      search.search.messages.messages.length,
      3,
      'Three messages filtered by search term and channel are shown'
    );

    await search.search.checkboxesUsers[2].click();

    assert.equal(
      search.search.messages.messages.length,
      2,
      'Two messages filtered by search term, channel, and user are shown'
    );

    await search.search.checkboxesUsers[2].click();

    assert.equal(
      search.search.messages.messages.length,
      3,
      'Three messages are shown again after unchecking user filter'
    );

    await search.search.checkboxesChannels[1].click();

    assert.equal(
      search.search.messages.messages.length,
      4,
      'Four messages are shown again after unchecking channel filter'
    );
  });
});
