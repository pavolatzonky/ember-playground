'use strict';
module.exports = {
  extends: ['octane', 'stylistic'],
  rules: {
    'dasherized-test-attributes': true,
    'dasherized-translations': true,
    'eol-last': 'never',
    'inline-link-to': true,
    // 'no-bare-strings': true,
    'no-curly-component-invocation': {
      allow: ['application/in-element', 'brand/id', 'brand/name'],
    },
    'no-implicit-this': {
      allow: ['application/in-element', 'brand/id', 'brand/name'],
    },
  },
  plugins: [
    './lib/template-lint-rules/test-attributes',
    './lib/template-lint-rules/translations',
  ],
  overrides: [
    {
      files: '**/tests/**/*.js',
      rules: {
        'no-bare-strings': false,
      },
    },
  ],
};
