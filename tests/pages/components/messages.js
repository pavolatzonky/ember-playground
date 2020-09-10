import { collection } from 'ember-cli-page-object';
import message from './messages/message';

export default {
  messages: collection(message.scope, {
    ...message,
  }),
};
