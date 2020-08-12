import Mirage from 'ember-cli-mirage';

export default function(data, headers = {}) {
  headers['X-Zonky-Maintenance'] = 'true';
  return new Mirage.Response(503, headers, data);
}
