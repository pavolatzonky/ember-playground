import Model, { attr } from '@ember-data/model';

export default class ChannelModel extends Model {
  // @attr id; // ember expects it already by default
  @attr name;
  @attr description;
}
