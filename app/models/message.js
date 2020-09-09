import Model, { attr } from '@ember-data/model';

export default class MessageModel extends Model {
  // @attr id; // ember expects it already by default
  @attr() avatarSrc;
  @attr() sender;
  @attr() timestamp;
  @attr() messageBody;
}
