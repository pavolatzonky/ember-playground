import { helper } from '@ember/component/helper';

export default helper(function channelName([name]) {
  return `#${name}`;
});
