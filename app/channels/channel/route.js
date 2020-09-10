import Route from '@ember/routing/route';

export default class ChannelsChannelRoute extends Route {
  async model(params) {
    return this.store.peekRecord('channel', params.channel_id);
  }

  async afterModel(channel) {
    const messages = await this.store.query('message', {
      channelId: channel.id,
    });
    channel.set('messages', messages); // channel.messages = messages;
    // return this.store.query('message', { channelId: channel.id }).then((messages)=>{
    //   channel.set('messages', messages);
    // });
  }
}
