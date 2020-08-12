'use strict';

const component = require('ember-source/blueprints/component');
const { activeLocales } = require('../../config/environment')('development');

/**
 * Specify all locales to include in translation flow
 * @type {string[]}
 */
const locales = ['cs-test'].concat(activeLocales);

component.afterInstall = async function(options) {
  for (const locale of locales) {
    await this.taskFor('generate-from-blueprint').run({
      args: ['component-translation', locale],
      component: options.entity.name,
    });
  }

  await this.taskFor('generate-from-blueprint').run({
    args: ['page-object-component', options.entity.name],
  });
};

module.exports = component;
