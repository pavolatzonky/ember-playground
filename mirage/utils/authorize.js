import { readCookie } from './cookies';
import { cookie } from './session';

export default function(db) {
  let email = readCookie(cookie.name);
  let user = db.users.findBy({ email });

  if (user) {
    return {
      user,
      userId: user.id,
      username: user.email,
    };
  }
}
