import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency-decorators';

export default class MessageFormComponent extends Component {
  @tracked
  messageBody = '';

  // @tracked
  // inProgress = false;

  get isMessageBodyAbsent() {
    const trimmedMessageBody = this.messageBody.trim();
    return trimmedMessageBody.length === 0;
  }

  @action
  updateMessageBody(event) {
    this.messageBody = event.target.value;
    event.preventDefault();
  }

  @task
  *sendMessageTask() {
    yield this.args.onSendMessage(this.messageBody);
    this.messageBody = '';
  }

  // @action
  // async sendMessage() {
  //   this.inProgress = true;
  //   await this.args.onSendMessage({ messageBody: this.messageBody });
  //   this.messageBody = '';
  //   this.inProgress = false;
  // }
}
