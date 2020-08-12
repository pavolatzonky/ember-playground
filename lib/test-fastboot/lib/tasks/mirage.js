'use strict';
const Task = require('ember-cli/lib/models/task');
const ExpressServer = require('ember-cli/lib/tasks/server/express-server');

class MirageTask extends Task {
  run(options) {
    let mirage = new ExpressServer({
      ui: this.ui,
      project: this.project,
      watcher: Promise.resolve({ directory: '' }),
      serverRoot: './tests-fastboot/mirage',
      serverWatcher: null,
    });

    let mirageOptions = Object.assign({}, options);

    mirageOptions.ssl = false;
    mirageOptions.rootURL = '/';
    mirageOptions.port = 3010;

    process.env.API_URL = `http://localhost:${mirageOptions.port}`;

    return mirage.start(mirageOptions);
  }
}

module.exports = MirageTask;
