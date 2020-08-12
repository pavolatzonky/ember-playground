import Mirage from 'ember-cli-mirage';

export default function(
  data = {},
  status = 400,
  headers = { 'WWW-Authenticate': 'invalid-token' }
) {
  return new Mirage.Response(status, headers, data);
}
