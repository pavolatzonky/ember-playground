import Mirage from 'ember-cli-mirage';

export default function(data, headers = {}) {
  return new Mirage.Response(403, headers, data);
}
