import { create, visitable } from 'ember-cli-page-object';
import error from '../components/error';
import channel from '../components/channels/channel';

export default create({
  ...channel,
  error,
  visit: visitable('/channels/general'),
});
