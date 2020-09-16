import Route from '@ember/routing/route';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

export default class ChannelsChannelRoute extends Route {
  async model(params) {
    const channel = this.store.peekRecord('channel', params.channel_id);
    return { channel };
  }

  async afterModel(model) {
    // = { channel }
    const user = this.modelFor('application');
    const messages = await this.store.query('message', {
      channelId: model.channel.id,
    });
    model.messages = messages; // nastaveno na celém objektu;
    model.user = user;
    model.newMessages = ArrayProxy.create({
      content: A([]),
    });

    // return this.store.query('message', { channelId: channel.id }).then((messages)=>{
    //   channel.set('messages', messages);
    // });
  }
}

//vracíme tu channel jako součást objektu, kam si pak dáme ještě user a messages
