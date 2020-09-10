import Component from '@glimmer/component';

export default class MessagesComponent extends Component {
  get sortedMessages() {
    return this.args.messages.toArray().sortBy('timestamp');
  }
}
