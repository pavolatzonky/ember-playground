'use strict';
module.exports = {
  name: 'test:fastboot',
  description: "Runs your app's FastBoot test suite.",

  availableOptions: [
    { name: 'host', type: String, default: 'localhost' },
    { name: 'port', type: Number, default: 4200 },
  ],

  async run(options) {
    const { App } = require('ember-cli-addon-tests');
    const MirageTask = require('../tasks/mirage');
    const TestTask = require('../tasks/test');

    process.env.EMBER_TEST_FASTBOOT = 'true';
    process.env.EMBER_TEST_FASTBOOT_URL = `http://${options.host}:${options.port}`;

    let { ui, project } = this;

    let mirageTask = new MirageTask({ ui, project });
    let testTask = new TestTask({ ui, project });
    let app = new App(process.cwd());

    await mirageTask.run(options);

    await app.startServer({ port: options.port });

    const { failed } = await testTask.run(options);

    await app.stopServer();

    if (failed > 0) {
      throw new Error('FastBoot test suite failed!');
    }
  },
};
