import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | user', function(hooks) {
  setupTest(hooks);

  test('it computes full name', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('user', {
      firstname: 'John',
      lastname: 'Travolta',
    });
    assert.equal(model.fullname, 'John Travolta', 'Full name is ok');
  });
});
