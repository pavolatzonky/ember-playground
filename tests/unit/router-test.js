import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import Service from '@ember/service';
import setupSession from '../helpers/setup-session';
import setupStore from '../helpers/setup-store';
import setupFeatures from '../helpers/setup-features';
import setupMetrics from '../helpers/setup-metrics';

module('Unit | Router', function(hooks) {
  setupTest(hooks);
  setupFeatures(hooks);
  setupSession(hooks);
  setupStore(hooks);
  setupMetrics(hooks);

  test('it skips transition storing correctly', function(assert) {
    assert.expect(3);

    let application = this.owner.lookup('route:application');

    application.set('session.isAuthenticated', false);

    let router = this.owner.lookup('router:main');

    assert.ok(
      router._shouldNotStoreTransition(application, 'account-something')
    );
    assert.notOk(
      router._shouldNotStoreTransition(application, 'something-account')
    );

    application.set('session.isAuthenticated', true);

    assert.ok(
      router._shouldNotStoreTransition(application, 'something-account')
    );
  });

  test('it calls satismeter after route has changed', async function(assert) {
    this.withFeature('satismeter');

    assert.expect(1);
    await this.withUser('barney@zonkej.cz');

    const Satismeter = Service.extend({
      setup() {
        assert.ok(true, 'satismeter.setup() is called');
      },
    });

    this.owner.register('service:satismeter', Satismeter);

    let router = this.owner.lookup('router:main');
    router.trigger('routeDidChange', { to: { name: '' }, routeInfos: [] });
  });

  test('it tracks page after route has changed', async function(assert) {
    let router = this.owner.lookup('router:main');
    router.trigger('routeDidChange', {
      to: { name: 'profile.index' },
      routeInfos: [],
    });

    await settled();
    assert.verifyGTMEvent({
      event: 'pageLoad',
      location: window.location.href,
      pageGroup1_mainCategory: 'Můj profil',
      pageGroup2_subCategory: 'Nerozlišeno',
      pageGroup3_pageType: 'profile:index',
      pageGroup4_pageName: 'Můj profil',
      pageHttpResponseCode: '200',
      routeName: 'profile.index',
    });
  });
});
