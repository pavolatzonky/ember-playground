'use strict';
const isDevelopment =
  (process.env.EMBER_ENV === 'development' ||
    process.env.EMBER_DEBUG === 'true') &&
  process.env.EMBER_TEST_FASTBOOT !== 'true';

let browsers = [
  'last 2 versions',
  'Explorer >= 11',
  'Chrome >= 40',
  'Opera >= 27',
  'OperaMobile >= 46',
  'Safari >= 10',
  'Android >= 4.4',
  'ExplorerMobile >= 11',
];

if (isDevelopment) {
  browsers = [
    'last 1 Chrome versions',
    'last 1 Edge versions',
    'last 1 Firefox versions',
    'last 1 Safari versions',
  ];
}

module.exports = { browsers };
