import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') firstname;
  @attr('string') lastname;
  @attr('string') avatarSrc;
  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}
