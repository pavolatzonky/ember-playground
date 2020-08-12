import Mirage from 'ember-cli-mirage';

export default function(data, headers = {}) {
  return new Mirage.Response(502, headers, data);
}
