import RouteRecognizer from 'route-recognizer';
import users from 'ember-playground/mirage/routes/users';
import channels from 'ember-playground/mirage/routes/channels';

import fetchify from './utils/fetch';

export default function() {
  // Support for REPORT method before it is implemented in Pretender
  this.pretender.hosts.forURL(
    'https://app.launchdarkly.com'
  ).REPORT = new RouteRecognizer();
  this.pretender.report = function(path, handler, async) {
    return this.register('REPORT', path, handler, async);
  };

  /**
   * The address corresponds to ZONKY_COMPANIES_AUTOCOMPLETE_ENDPOINT_URL
   * in system-parameters fixture and is a call to external endpoint
   * that we want to mock for the purpose of local dev and testing
   */

  this.pretender.hosts.forURL('http://localhost:4200/merk-api-mock');

  this.passthrough('/assets/**');
  this.passthrough('/write-coverage');
  this.passthrough('/version.json');
  this.passthrough('https://app.launchdarkly.com/**', ['get', 'report']);
  this.passthrough('https://stage-zonky.cs106.force.com/**');
  this.passthrough('https://events.launchdarkly.com/**');
  this.passthrough('https://app.satismeter.com/**');

  this.passthrough('/api/public-login');
  this.passthrough('/api/loggedin');
  this.passthrough('/api/public-logout');

  this.namespace = '/api';
  this.timing = 400;

  fetchify(this);

  users(this);
  channels(this);
}
