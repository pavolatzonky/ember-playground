import { helper } from '@ember/component/helper';
import format from 'date-fns/format';

export default helper(function formatDate([dateValue], hash) {
  return format(dateValue, hash.outputFormat)
});
