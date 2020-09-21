import Component from '@glimmer/component';

export default class ChannelsChannelMessagesComponent extends Component {
  get sortedMessages() {
    return this.args.messages.toArray().sortBy('timestamp');
  }
}
