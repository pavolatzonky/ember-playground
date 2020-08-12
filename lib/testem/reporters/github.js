'use strict';
const FailureOnlyReporter = require('testem-failure-only-reporter');
const displayutils = require('testem/lib/utils/displayutils');

module.exports = class GitHubReporter extends FailureOnlyReporter {
  display(prefix, result) {
    super.display(prefix, result);

    if (this.shouldShow(result)) {
      let message = displayutils.resultString(
        this.id,
        prefix,
        result,
        this.quietLogs
      );

      this.out.write(this.format(message));
    }
  }

  shouldShow(result) {
    return process.env.GITHUB_ACTIONS && !result.passed && !result.skipped;
  }

  format(message) {
    message = message.substring(0, message.indexOf('browser log')).trim();
    return `::error::${message.replace(/\r/g, '%0D').replace(/\n/g, '%0A')}\n`;
  }
};
