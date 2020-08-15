/* eslint complexity: "off" */
'use strict';

module.exports = function(environment) {
  const APP_URL = process.env.APP_URL || 'http://localhost:4200';
  const APP_NAME = process.env.APP_NAME || 'Zonkej';
  const API_URL = process.env.API_URL || '';
  const REDIRECT_URL = process.env.REDIRECT_URL || 'http://localhost:9000';
  const FASTBOOT_HOST = process.env.FASTBOOT_HOST || 'http://localhost:4200';
  const RECAPTCHA_SITE_KEY =
    process.env.RECAPTCHA_SITE_KEY ||
    '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  const GCM_SENDER_ID = process.env.GCM_SENDER_ID || '997571095814';
  const ONE_SIGNAL_APP_ID =
    process.env.ONE_SIGNAL_APP_ID || 'e39727c2-22fb-4789-98e1-804f0ec7aa7b';
  const ONE_SIGNAL_SAFARI_WEB_ID =
    process.env.ONE_SIGNAL_SAFARI_WEB_ID ||
    'web.onesignal.auto.2900aeea-27da-4bc5-9f95-2e3d9a76781c';
  const HOMEPAGE_URL =
    process.env.HOMEPAGE_URL || 'https://homepage-preprod.zonkej.cz';
  const STATUS_PAGE_URL =
    process.env.STATUS_PAGE_URL || 'https://status.zonky.cz';
  const ZONKYTIMES_URL =
    process.env.ZONKYTIMES_URL ||
    'https://homepage-preprod.zonkej.cz/zonkytimes';
  const COOKIE_DOMAIN_NAKED = process.env.COOKIE_DOMAIN_NAKED || 'localhost';
  const COOKIE_PATH = '/';
  const LIVEAGENT_DOMAIN = COOKIE_DOMAIN_NAKED.replace(/^\./, '');
  const LIVEAGENT_EMAIL_DOMAIN =
    LIVEAGENT_DOMAIN === 'localhost' ? 'zonkej.cz' : LIVEAGENT_DOMAIN;

  const ENV = {
    modulePrefix: 'ember-playground',
    environment,
    rootURL: '/',
    locationType: 'history',
    historySupportMiddleware: true,
    appURL: APP_URL,
    appName: APP_NAME,
    redirectURL: REDIRECT_URL,
    gcmSenderId: GCM_SENDER_ID,
    mainColor: '#37b1bf',
    homepageURL: HOMEPAGE_URL,
    statusPageURL: STATUS_PAGE_URL,
    zonkytimesURL: ZONKYTIMES_URL,

    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    api: {
      namespace: '/api',
    },

    locale: 'cs-cz',

    internationalFallbackLocale: 'en-gb',

    /**
     * List of locales that are up for use in the GUI and by the users
     * 1. any locale added here requires adding to ASSET_TRANSLATIONS_FILE_MAP
     * 2. keep the order of the array the way you want to order options in GUI
     * 3. update blueprint generation
     * @see /app/config/constants/asset-translations-file-map.js
     * @see /blueprints/component-translation/index.js
     */
    activeLocales: ['cs-cz', 'en-gb', 'es-es'],

    consent: {
      cookie: {
        name: 'cookieconsent_dismissed',
        content: 'dismiss',
        domain: COOKIE_DOMAIN_NAKED,
        path: COOKIE_PATH,
        expireDays: 365,
      },
    },

    intl: {
      cookie: {
        name: 'locale',
        domain: COOKIE_DOMAIN_NAKED,
        path: COOKIE_PATH,
        expireDays: 365,
      },
    },

    defaultCountryCode: 'CZ',

    defaultPhonePrefix: '+420',
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-cli-mirage'] = {
      enabled: !API_URL,
    };
  }

  if (environment === 'test' || process.env.EMBER_TEST_FASTBOOT) {
    // Testem prefers this...
    ENV.locationType = 'none';

    ENV.locale = 'cs-test';

    ENV.appURL = '';

    ENV.appName = 'Zonkej';
    ENV.appShortName = 'Zonkej';

    ENV['ember-cli-mirage'] = {
      enabled: true,
      autostart: true,
    };

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    // ENV.contact.email = 'info@zonkej.cz';

    if (process.env.EMBER_TEST_FASTBOOT) {
      ENV.appURL = APP_URL;
      ENV.APP.rootElement = 'body';
      ENV['ember-cli-mirage'].enabled = false;
    }
  }

  if (environment === 'production') {
  }

  return ENV;
};
