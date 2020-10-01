import Route from '@ember/routing/route';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

export default class SearchRoute extends Route {
  queryParams = {
    searchTerm: {
      refreshModel: true, //aktivuje se model hook poté, co se změní searchTerm
    },
  };

  async model({ searchTerm }) {
    let messages;
    //destrukturované (params)

    if (searchTerm.trim() === '') {
      messages = ArrayProxy.create({
        content: A([]),
      });
    } else {
      messages = this.store.query('message', { searchTerm }); // { searchTerm: searchTerm}
    }

    return { messages, searchTerm };
  }

  async afterModel(model) {
    const channels = await this.store.findAll('channel');
    model.channels = channels;
    const users = await this.store.findAll('user');
    model.users = users;
  }
}
