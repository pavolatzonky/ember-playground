'use strict';

module.exports = function(environment) {
  const config = require('./environment')(environment);
  const { locale: defaultLocale } = config;

  return {
    autoPolyfill: false,
    disablePolyfill: true,
    errorOnMissingTranslations: false,
    locales: null,
    fallbackLocale: 'cs-cz',
    outputPath: 'assets/translations',
    publicOnly: true,
    requiresTranslation(key, locale) {
      // Translations are required for tests and main locale
      return ['cs-test'].concat(defaultLocale).indexOf(locale) >= 0;
    },
  };
};
