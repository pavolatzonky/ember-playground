'use strict';
const path = require('path');
const validate = require('../lib/dotenv/validate');

module.exports = function(environment) {
  let dotenv = process.env.DOTENV;
  let file = '.env';

  if (environment === 'development' && dotenv) {
    file = `${file}-${dotenv}`;

    validate(dotenv);
  }

  return {
    failOnMissingKey: true,
    path: path.join(__dirname, 'dotenv', file),
  };
};
