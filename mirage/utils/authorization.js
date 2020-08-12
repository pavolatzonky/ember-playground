const X_AUTHORIZATION_CODE = 'X-Authorization-Code';
const X_AUTHORIZATION_TOKEN = 'X-Authorization-Token';

export function hasCode(request) {
  return request.headers.has(X_AUTHORIZATION_CODE);
}

export function getCode(request) {
  return request.headers.get(X_AUTHORIZATION_CODE);
}

export function hasToken(request) {
  return request.headers.has(X_AUTHORIZATION_TOKEN);
}

export function getToken(request) {
  return request.headers.get(X_AUTHORIZATION_TOKEN);
}
