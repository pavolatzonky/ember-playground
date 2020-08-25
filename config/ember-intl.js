'use strict';

module.exports = function(environment) {
  const config = require('./environment')(environment);
  const { locale: defaultLocale } = config;

  return {
    inputPath: 'translations',
    publicOnly: false,
    fallbackLocale: defaultLocale,
  };
};
