'use strict';
module.exports = {
  singleQuote: true,

  trailingComma: 'es5',

  overrides: [
    {
      files: 'app/**/*.css',
      parser: 'css',
    },
    {
      files: 'app/**/*.scss',
      parser: 'scss',
    },
  ],
};
