import Route from '@ember/routing/route';

export default class ChannelsRoute extends Route {
  async model() {
    return [
      {
        id: 1,
        name: 'general',
        description:
          'Just some general people generally chatting about general things',
      },
      {
        id: 2,
        name: 'dev',
        description: 'Very serious channel for developers only',
      },
      {
        id: 3,
        name: 'random',
        description: 'Random fun channel',
      },
    ];
  }
}
