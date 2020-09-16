import Component from '@glimmer/component';
import { action } from '@ember/object';
import { timeout } from 'ember-concurrency';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import { inject as service } from '@ember/service';

export default class ChannelsChannelComponent extends Component {
  @service store;

  newMessages = ArrayProxy.create({
    content: A([]),
  });

  @action
  async onSendMessage(messageBody) {
    const newMessage = this.store.createRecord('message', {
      messageBody,
      timestamp: new Date(),
      sender: this.args.model.user,
    });
    this.newMessages.pushObject(newMessage);
    await timeout(10);
  }
}
