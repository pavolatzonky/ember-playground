'use strict';
const visit = require('./lib/utils/visit');

module.exports = {
  name: 'test-fastboot',

  includedCommands() {
    return {
      'test:fastboot': require('./lib/commands/test'),
    };
  },

  setupFastBootTest(hooks) {
    hooks.before(function() {
      this.visit = visit.bind(this);
    });
  },
};
