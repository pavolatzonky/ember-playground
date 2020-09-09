import Model, { attr } from '@ember-data/model';

export default class ChannelModel extends Model {
  @attr('string') name; // unique, serves as record ID
  @attr('string') description;
}
