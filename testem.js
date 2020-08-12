'use strict';
const GitHubReporter = require('./lib/testem/reporters/github');

let test_page = process.env.CI
  ? 'tests/index.html?hidepassed'
  : 'tests/index.html?hidepassed&dockcontainer&mirageLogging';

module.exports = {
  test_page,
  disable_watching: true,
  launch_in_ci: ['Chrome'],
  parallel: 1,
  launch_in_dev: [],
  browser_start_timeout: 300,
  report_file: 'test-reports/app.xml',
  reporter: GitHubReporter,
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
        '--enable-features=NetworkService,NetworkServiceInProcess',
      ].filter(Boolean),
    },
  },
};
