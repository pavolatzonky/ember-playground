'use strict';
const path = require('path');
const glob = require('glob');
const QUnit = require('qunit');
const { TapReporter } = require('js-reporters');
const Task = require('ember-cli/lib/models/task');

class TestTask extends Task {
  run() {
    return new Promise(resolve => {
      let root = path.join(this.project.root, '/tests-fastboot/');

      glob
        .sync(path.join(root, '/**/*-test.js'))
        .map(name => name.replace(/\.js$/g, ''))
        .forEach(require);

      TapReporter.init(QUnit);

      QUnit.done(resolve);
      QUnit.start();
    });
  }
}

module.exports = TestTask;
