import Application from 'ember-playground/app';
import { setApplication } from '@ember/test-helpers';
import start from 'ember-exam/test-support/start';
import config from 'ember-playground/config/environment';
import { assign } from '@ember/polyfills';

Object.assign = Object.assign || assign; // IE 11 support

setApplication(Application.create(config.APP));
start();
