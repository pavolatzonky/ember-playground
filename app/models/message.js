import Model, { attr, belongsTo } from '@ember-data/model';

export default class MessageModel extends Model {
  // @attr id; // ember expects it already by default
  @attr('date') timestamp;
  @attr('string') messageBody;
  @belongsTo('user', { async: true }) sender;
  @belongsTo('channel', { async: true }) channel;
}
