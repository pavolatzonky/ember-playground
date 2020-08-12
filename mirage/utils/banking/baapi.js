import parseJSON from '../parse-json';

export function buildURL(request) {
  let { bic, callbackUrl, callbackErrorUrl } = parseJSON(request);
  let success = encodeURIComponent(callbackUrl);
  let failure = encodeURIComponent(callbackErrorUrl);

  return `https://zonkej.baapi.cz/${bic}/?success=${success}&failure=${failure}`;
}
