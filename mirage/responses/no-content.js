import Mirage from 'ember-cli-mirage';

export default function(headers = {}) {
  return new Mirage.Response(204, headers);
}
