export default function(request) {
  let body;

  if (request && request.requestBody) {
    body = JSON.parse(request.requestBody);
  }

  return body;
}
