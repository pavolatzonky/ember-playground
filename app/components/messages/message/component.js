import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';

export default class MessagesMessageComponent extends Component {
  @task
  *deleteMessageTask() {
    yield this.args.onDeletionMessage(this.args.message);
  }
}
