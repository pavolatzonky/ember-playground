'use strict';
const slackDidUpload = require('../lib/utils/slack-did-upload');
const slackDidActivate = require('../lib/utils/slack-did-activate');
const slackDidFail = require('../lib/utils/slack-did-fail');

module.exports = target => ({
  build: {
    environment: target,
  },

  aws: {
    region: process.env.AWS_REGION,
    accountId: process.env.AWS_ACCOUNT_ID,
  },

  s3: {
    bucket: process.env.ASSETS_S3_BUCKET,
    region: process.env.AWS_REGION,
    filePattern:
      '**/*.{js,css,png,gif,ico,jpg,json,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf,html,webmanifest}',
    fileIgnorePattern: 'package.json',
  },

  'elastic-beanstalk': {
    bucket: process.env.FASTBOOT_S3_BUCKET,
    region: process.env.AWS_REGION,
    key: 'fastboot-deploy-info.json',
  },

  'revision-data': {
    type: 'version-commit',
  },

  slack: {
    webhookURL: process.env.SLACK_URL,
    channel: `#${process.env.SLACK_CHANNEL}`,
    didUpload: slackDidUpload,
    didActivate: slackDidActivate,
    didFail: slackDidFail,
  },
});
