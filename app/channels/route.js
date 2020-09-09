import Route from '@ember/routing/route';

export default class ChannelsRoute extends Route {
  async model() {
    return await this.store.findAll('channel');
  }
}
