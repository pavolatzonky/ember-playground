import Mirage from 'ember-cli-mirage';

export default function(data, request) {
  let page = parseInt(request.headers.get('X-Page'), 10);
  let perPage = parseInt(request.headers.get('X-Size'), 10);
  let total = data.length;

  page = page || 0;
  perPage = perPage || 20;

  data = data.slice(page * perPage, page * perPage + perPage);

  return new Mirage.Response(200, { 'X-Total': total }, data);
}
