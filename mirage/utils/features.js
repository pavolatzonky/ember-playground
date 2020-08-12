import { assert } from '@ember/debug';

export default function feature(key, mirage) {
  assert('Mirage instance must be passed', mirage);

  return (
    (mirage.features && mirage.features.isEnabled(key)) ||
    (window.ZonkyApp.__container__ &&
      window.ZonkyApp.__container__.lookup('service:features').isEnabled(key))
  );
}
