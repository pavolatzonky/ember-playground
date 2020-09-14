import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MessageFormComponent extends Component {
  @tracked
  messageBody = '';

  @action
  updateMessageBody(message) {
    this.messageBody = message.target.value;
  }
}
