import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | channel', function(hooks) {
  setupTest(hooks);

  test('it specifies a custom primary key', function(assert) {
    const store = this.owner.lookup('service:store');
    const serializer = store.serializerFor('channel');

    assert.equal(
      serializer.primaryKey,
      'name',
      'Primary key is defined correctly'
    );
  });
});
