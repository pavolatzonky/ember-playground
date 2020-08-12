export function readCookie(name) {
  let cookies = decodeURIComponent(document.cookie).split(';');
  let search = `${name}=`;

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(search) === 0) {
      return cookie.substring(search.length, cookie.length);
    }
  }
}

export function writeCookie(name, value, options = {}) {
  let parts = [`${name}=${encodeURIComponent(value)}`];

  if (options.expires) {
    parts.push(`expires=${options.expires}`);
  }

  let path = options.path || '/';
  parts.push(`path=${path}`);

  document.cookie = parts.join('; ');
}

export function clearCookie(name) {
  let expires = new Date(Date.UTC(1970, 0, 1));

  writeCookie(name, '', { expires });
}
