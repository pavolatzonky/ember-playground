'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { browsers } = require('./config/targets');

const isProduction = EmberApp.env() === 'production';
const cssnano = require('cssnano')({ preset: 'default' });
const purgeCSS = require('@fullhuman/postcss-purgecss')({
  content: ['./app/index.html', './app/**/*.hbs', './app/**/*.css'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  whitelistPatterns: [/^_/],
});

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    outputPaths: {
      app: {
        css: {
          app: '/assets/styles/ember-playground.css',
        },
      },
      vendor: {
        css: '/assets/styles/vendor.css',
      },
      testSupport: {
        css: '/assets/styles/test-support.css',
      },
    },

    babel: {
      plugins: [require('ember-auto-import/babel-plugin')],
    },

    'ember-cli-babel': {
      includeExternalHelpers: true,
    },

    'ember-cli-babel-polyfills': {
      includeScriptTags: false,
    },

    hinting: false,
    tests: process.env.EMBER_ENV === 'test',

    fingerprint: {
      extensions: [
        'js',
        'css',
        'png',
        'json',
        'jpg',
        'gif',
        'map',
        'eot',
        'ttf',
        'woff',
        'woff2',
        'svg',
      ],
      exclude: ['package.json', 'version.json'],
    },

    'ember-composable-helpers': {
      only: ['contains', 'queue', 'optional', 'range', 'dec', 'inc', 'sort-by'],
    },

    'ember-test-selectors': {
      strip: false,
    },

    'ember-webcam': {
      enableFlashFallback: false,
    },

    SRI: {
      enabled: false, // follow-up PPL-7226
    },

    minifyCSS: {
      enabled: false,
    },

    postcssOptions: {
      compile: {
        enabled: true,
        extension: 'scss',
        parser: require('postcss-scss'),
        plugins: [
          {
            module: require('@csstools/postcss-sass'),
            options: {
              includePaths: ['node_modules/include-media/dist'],
            },
          },
          require('postcss-import')({ path: ['node_modules'] }),
          require('tailwindcss')('./config/tailwind.js'),
          ...(isProduction ? [purgeCSS] : []),
          {
            module: require('postcss-preset-env'),
            options: {
              browsers,
              autoprefixer: {
                cascade: false,
                grid: true,
              },
              features: {
                'custom-media-queries': true,
                'color-mod-function': true,
              },
            },
          },
          ...(isProduction ? [cssnano] : []),
        ],
      },
    },

    cssModules: {
      extension: 'module.css',
      intermediateOutputPath: 'app/styles/tailwind/modules.css',
    },
  });

  return app.toTree();
};
