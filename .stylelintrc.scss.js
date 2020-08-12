'use strict';
module.exports = {
  plugins: [
    'stylelint-prettier',
    './lib/style-lint-rules/use-alias-font-sizes-if-possible.js',
  ],
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier'],
  rules: {
    'prettier/prettier': true,
    'no-descending-specificity': null,
    'zonky/use-alias-font-sizes-if-possible': true,
  },
};
