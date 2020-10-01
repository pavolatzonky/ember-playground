import searchForm from './ui/search-form';
import messages from './channels/channel/messages';
import { collection } from 'ember-cli-page-object';

export default {
  searchForm,
  messages,

  checkboxesChannels: collection('[data-test-search="checkbox-channel"]'),

  checkboxesUsers: collection('[data-test-search="checkbox-user"]'),
};
