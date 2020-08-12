export default function(request) {
  let params = request.requestBody;
  let pairs = params.split('&');
  let result = {};

  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    let value = decodeURIComponent(pair[1]);
    let key = decodeURIComponent(pair[0]);
    let isArray = /\[\]$/.test(key);
    let dictMatch = key.match(/^(.+)\[([^\]]+)\]$/);

    if (dictMatch) {
      let subkey = dictMatch[2];

      key = dictMatch[1];
      result[key] = result[key] || {};
      result[key][subkey] = value;
    } else if (isArray) {
      key = key.substring(0, key.length - 2);
      result[key] = result[key] || [];
      result[key].push(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}
