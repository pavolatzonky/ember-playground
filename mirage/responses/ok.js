import Mirage from 'ember-cli-mirage';

export default function(data) {
  return new Mirage.Response(200, {}, data);
}
