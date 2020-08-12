import { Headers } from 'fetch';

export default function fetchify(mirage) {
  let { pretender } = mirage;
  let originalHandleRequest = pretender.handleRequest;

  pretender.handleRequest = function(request) {
    request.headers = new Headers(request.requestHeaders);
    originalHandleRequest.call(pretender, request);
  };
}
