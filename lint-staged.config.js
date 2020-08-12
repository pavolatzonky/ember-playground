'use strict';
module.exports = {
  '**/*.js': ['npx eslint --fix', 'git add'],
  '**/*.hbs': ['npx ember-template-lint --quiet'],
  '**/*.css': ['npx stylelint --fix', 'git add'],
  '**/*.scss': ['npx stylelint --fix --config .stylelintrc.scss.js', 'git add'],
  'translations/**/*.yaml': [
    'node lib/utils/check-for-missing-translation-files.js',
  ],
};
