import { create, visitable } from 'ember-cli-page-object';
import channelHeader from '../components/channel-header';
import messages from '../components/messages';
import messageForm from '../components/message-form';
import infoPanel from '../components/info-panel';

export default create({
  channelHeader,
  messages,
  messageForm,
  infoPanel,
  visit: visitable('/channels/general'),
});