import { helper } from '@ember/component/helper';

export default helper(function formatChannelName([name]) {
  return `# ${name}`;
});
