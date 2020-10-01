import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

export default class SearchComponent extends Component {
  @tracked filteredChannels = A([]);
  @tracked filteredUsers = A([]);

  @computed('args.messages.[]', 'filteredChannels.[]', 'filteredUsers.[]')
  get filteredMessages() {
    return ArrayProxy.create({
      content: A(
        this.args.messages.filter(message => {
          let matchesChannel = true;
          let matchesUser = true;

          if (this.filteredChannels.length > 0) {
            const channelId = message.channel.get('id');
            matchesChannel = this.filteredChannels.indexOf(channelId) > -1;
          }
          if (this.filteredUsers.length > 0) {
            const userId = message.sender.get('id');
            matchesUser = this.filteredUsers.indexOf(userId) > -1;
          }

          return matchesChannel && matchesUser;
        })
      ),
    });
  }

  @action
  filterByChannel({ target: { value: channelId, checked: isChecked } }) {
    //destrukturalizace
    if (isChecked) {
      this.filteredChannels.addObject(channelId);
    } else {
      this.filteredChannels.removeObject(channelId);
    }
  }

  @action
  filterByUser({ target: { value: userId, checked: isChecked } }) {
    if (isChecked) {
      this.filteredUsers.addObject(userId);
    } else {
      this.filteredUsers.removeObject(userId);
    }
  }

  //  @action
  //   filterByUser(event) {
  //     const userId = event.target.value;
  //     const isChecked = event.target.checked;
  //     if (isChecked) {
  //       this.filteredUsers.addObject(userId);
  //     } else {
  //       this.filteredUsers.removeObject(userId);
  //     }
  //   }
}
