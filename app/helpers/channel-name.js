import { helper } from '@ember/component/helper';

export default helper(function channelName(nameValue) {
  const channelName = nameValue[0];
  const hash = '#';
  return `${hash}${channelName}`;
});
