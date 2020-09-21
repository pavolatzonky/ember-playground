import { create, visitable } from 'ember-cli-page-object';
import channelHeader from './channel/channel-header';
import messages from '../components/messages';
import messageForm from './channel/message-form';
import infoPanel from './channel/info-panel';
import error from '../components/error';

export default create({
  channelHeader,
  messages,
  messageForm,
  infoPanel,
  error,
  visit: visitable('/channels/general'),
});
