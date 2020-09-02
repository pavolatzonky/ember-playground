import { collection } from 'ember-cli-page-object';
import message from './message';

export default {
  messages: collection(message.scope, {
    ...message,
  }),
};
