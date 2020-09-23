import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('channels', function() {
    this.route('channel', { path: '/:channel_id' });
  });
  this.route('search');
});
