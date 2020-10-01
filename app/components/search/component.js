import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

export default class SearchComponent extends Component {
  @tracked filteredChannel = null;
  @tracked filteredUser = null;

  @computed('filteredChannel', 'filteredUser')
  get filteredMessages() {
    return ArrayProxy.create({
      content: A(
        this.args.messages.filter(message => {
          let matchesChannel = true;
          let matchesUser = true;

          if (this.filteredChannel) {
            matchesChannel = message.channel.get('id') === this.filteredChannel;
          }
          if (this.filteredUser) {
            matchesUser = message.sender.get('id') === this.filteredUser;
          }

          return matchesChannel && matchesUser;
        })
      ),
    });
  }

  @action
  filterByChannel(event) {
    this.filteredChannel = event.target.value;
  }

  @action
  filterByUser(event) {
    const userId = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      this.filteredUser = userId;
    } else {
      this.filteredUser = null;
    }
  }
}
