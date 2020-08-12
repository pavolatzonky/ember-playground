import { computed } from '@ember/object';
import Cookies from 'ember-cookies/services/cookies';
import config from 'ember-playground/config/environment';

const { rootURL } = config;

export default Cookies.extend({
  _window: computed(function() {
    return window;
  }),

  write(name, value, options = {}) {
    // note: when in IE on localhost then domain needs to be null!
    options.path = options.path || rootURL;
    this._applySecureFlag(options);
    return this._super(name, value, options);
  },

  clear(name, options = {}) {
    options.path = options.path || rootURL;
    this.write(name, '', options);
    return this._super(name, options);
  },

  readJson(name) {
    let content = this.read(name);

    if (!content) {
      return {};
    }

    return JSON.parse(content);
  },

  writeJson(name, value, options = {}) {
    return this.write(name, JSON.stringify(value), options);
  },

  _applySecureFlag(options) {
    if (options.secure !== undefined) {
      return;
    }

    let fastboot = this._fastBoot;
    let _window = this._window;
    let protocol = fastboot.isFastBoot
      ? fastboot.request.protocol
      : _window.location.protocol;

    options.secure = protocol.indexOf('https') === 0;
  },
});
