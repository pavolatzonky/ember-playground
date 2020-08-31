import { helper } from '@ember/component/helper';

export default helper(function channelName([nameValue]) {
  return `#${nameValue}`;
});
