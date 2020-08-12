import { clearCookie } from './cookies';
import { cookie } from './session';

export default function() {
  clearCookie(cookie.name);
}
