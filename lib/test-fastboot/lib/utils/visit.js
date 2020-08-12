'use strict';
const { promisify } = require('util');
const request = promisify(require('request'));
const { JSDOM } = require('jsdom');

module.exports = async function visit(path, options = {}) {
  let defaults = {
    url: `${process.env.EMBER_TEST_FASTBOOT_URL}${path}`,
    headers: {
      Accept: 'text/html',
      'User-Agent': 'HeadlessChrome/60.0.3082.0',
    },
  };

  const { statusCode, headers, body } = await request(
    Object.assign({}, defaults, options)
  );

  return {
    statusCode,
    headers,
    body,
    document: new JSDOM(body).window.document,
  };
};
