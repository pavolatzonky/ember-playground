import Component from '@glimmer/component';
import { action } from '@ember/object';

import { inject as service } from '@ember/service';

export default class ChannelsChannelComponent extends Component {
  @service store;

  @action
  async onSendMessage(messageBody) {
    const newMessage = this.store.createRecord('message', {
      messageBody,
      sender: this.args.model.user,
      channel: this.args.model.channel,
      timestamp: new Date(),
    });
    this.args.model.newMessages.pushObject(newMessage);
    try {
      await newMessage.save();
    } catch (e) {
      this.args.model.newMessages.removeObject(newMessage);
      throw e;
    }
  }

  @action
  async onDeletionMessage(message) {
    this.args.model.newMessages.removeObject(message);
    await message.destroyRecord();
  }
}
