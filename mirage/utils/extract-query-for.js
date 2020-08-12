import { A } from '@ember/array';

export default function extractQueryFor(key, url) {
  let parts = A(url.split('?'));

  if (parts.get('length') !== 2) {
    return null;
  }

  parts = A(parts.objectAt(1).split('&'));
  return parts.map(item => item.substr(key.length + 1));
}
