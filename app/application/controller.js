import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  firstMessageSentOn = new Date(2019, 1, 12, 7, 31, 14);
  secondMessageSentOn = new Date(2020, 11, 30, 12, 1, 54);
  lastLoginAt = new Date();
}
