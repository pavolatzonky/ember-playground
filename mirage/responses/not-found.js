import Mirage from 'ember-cli-mirage';

export default function(data) {
  return new Mirage.Response(404, {}, data);
}
