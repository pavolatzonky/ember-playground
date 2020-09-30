import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChannelsChannelSearchFormComponent extends Component {
  @service router;

  @tracked
  searchTerm = '' || this.args.searchTerm;

  @action
  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
    event.preventDefault();
  }

  @action
  search(event) {
    event.preventDefault();
    this.router.transitionTo('search', {
      queryParams: { searchTerm: this.searchTerm },
    });
  }
}
