import { writeCookie } from './cookies';
import { cookie } from './session';

export const USER_LOGGEDIN = '/api/loggedin';
const USER_BAD_CREDENTIALS = '/api/public-login?app&error';
export const USER_DISABLED = '/api/public-login?app&disabledError';
export const USER_LOCKED = '/api/public-login?app&lockedError';
export const USER_EXPIRED = '/api/public-login?app&expiredError';

/**
 * Authenticates user in Mirage, for `session` it creates cookie,
 * otherwise it creates OAuth token, which is send to the user
 * and stored in database.
 */
export default function(db, { email, password = 'Zebra2014', code }) {
  let user = db.users.findBy({ email });

  if (!user || password !== 'Zebra2014' || (code && code !== '123456')) {
    return USER_BAD_CREDENTIALS;
  }

  switch (user.email) {
    case 'disabled@zonkej.cz':
      return USER_DISABLED;
    case 'locked@zonkej.cz':
      return USER_LOCKED;
    case 'expired@zonkej.cz':
      return USER_EXPIRED;
    default:
      writeCookie(cookie.name, user.email);
      return USER_LOGGEDIN;
  }
}
