import Model, { attr } from '@ember-data/model';

export default class MessageModel extends Model {
  // @attr id; // ember expects it already by default
  @attr('string') avatarSrc;
  @attr('string') sender;
  @attr('date') timestamp;
  @attr('string') messageBody;
}
