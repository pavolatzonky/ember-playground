'use strict';
const node = require('eslint-plugin-node');
const {
  ORDER_OF_COMPONENT_PROPERTIES,
  ORDER_OF_CONTROLLER_PROPERTIES,
  ORDER_OF_MODEL_PROPERTIES,
  ORDER_OF_ROUTE_PROPERTIES,
} = require('./lib/eslint');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['babel', 'ember', 'hbs', 'qunit'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
    'plugin:qunit/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    complexity: 'error',
    eqeqeq: 'error',
    'no-debugger': 'error',
    'no-restricted-imports': [
      'error',
      {
        name: '@ember/error',
        message: 'Please use native Error class instead.',
      },
      {
        name: '@ember/test',
        message: 'Please use ember-test-waiters instead.',
      },
      {
        name: 'date-fns',
        message:
          'Please use explicit module specifier for a function to not break tree-shaking.',
      },
    ],
    'no-sync': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'babel/no-unused-expressions': 'error',
    'ember/alias-model-in-controller': 'off',
    'ember/named-functions-in-promises': 'off',
    'ember/new-module-imports': 'error',
    'ember/no-attrs-in-components': 'error',
    'ember/no-duplicate-dependent-keys': 'error',
    'ember/no-get': 'error',
    'ember/no-jquery': 'error',
    'ember/no-old-shims': 'error',
    'ember/order-in-components': [
      'error',
      { order: ORDER_OF_COMPONENT_PROPERTIES },
    ],
    'ember/order-in-controllers': [
      'error',
      { order: ORDER_OF_CONTROLLER_PROPERTIES },
    ],
    'ember/order-in-models': ['error', { order: ORDER_OF_MODEL_PROPERTIES }],
    'ember/order-in-routes': ['error', { order: ORDER_OF_ROUTE_PROPERTIES }],
    'ember/require-super-in-init': 'error',
    'ember/use-ember-get-and-set': 'off',
    'hbs/check-hbs-template-literals': 'error',
  },
  overrides: [
    // Node.js files
    {
      files: [
        '.ember-cli.js',
        '.eslintrc.js',
        '.huskyrc.js',
        '.prettierrc.js',
        '.stylelintrc.js',
        '.stylelintrc.scss.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'lint-staged.config.js',
        'testem.js',
        'aws/**/*.js',
        'config/**/*.js',
        'blueprints/**/index.js',
        'lib/**/*.js',
        'server/**/*.js',
        'sitemap/**/*.js',
        'tests-fastboot/**/*.js',
        'tests-node/**/*.js',
      ],
      excludedFiles: [
        'lib/**/addon/**/*.js',
        'lib/**/app/**/*.js',
        'tests/pages/**/index.js',
      ],
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'script',
      },
      plugins: ['node'],
      env: {
        browser: false,
        node: true,
      },
      rules: Object.assign({}, node.configs.recommended.rules, {
        'require-await': 'error',
        strict: ['error', 'global'],
        'node/no-unpublished-require': 'off',
        'ember/avoid-leaking-state-in-ember-objects': 'off',
      }),
    },

    // Ember.js test files
    {
      files: ['tests/**/*.js'],
      env: {
        embertest: true,
        qunit: true,
      },
      rules: {
        'no-restricted-imports': [
          'error',
          'rsvp',
          {
            name: '@ember/runloop',
            message: 'Using runloop is not necessary anymore.',
          },
          {
            name: 'ember-test-helpers',
            message: 'Please use @ember/test-helpers instead.',
          },
        ],
      },
    },
  ],
};
