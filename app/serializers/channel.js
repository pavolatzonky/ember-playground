import ApplicationSerializer from './application';

export default class ChannelSerializer extends ApplicationSerializer {
  primaryKey = 'name';
}
