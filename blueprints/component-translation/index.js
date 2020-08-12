'use strict';
const translation = require('ember-intl/blueprints/translation');
const { classify } = require('ember-cli-string-utils');

translation.fileMapTokens = function(options) {
  if (options.locals.componentPathName) {
    return {
      __path__(options) {
        return options.locals.componentPathName;
      },
      __name__(options) {
        return options.dasherizedModuleName;
      },
    };
  }

  throw new Error('Must provide a component name after locale');
};

translation.locals = function(options) {
  const locals = {
    translationNamespace: '',
    componentPathName: options.taskOptions.component,
  };

  if (options.taskOptions.component) {
    locals.translationNamespace = options.taskOptions.component
      .split('/')
      .map(classify)
      .join('::');
  }

  return locals;
};

module.exports = translation;
