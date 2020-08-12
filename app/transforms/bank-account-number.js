import DS from 'ember-data';
import { isEmpty } from '@ember/utils';
import {
  humanizeAccountNumber,
  normalize,
  baseFrom,
  prefixFrom,
} from '../utils/bank-account';

const { Transform } = DS;

export default class BankAccountNumberTransform extends Transform {
  deserialize(serialized) {
    return humanizeAccountNumber(serialized);
  }

  serialize(deserialized) {
    if (deserialized.indexOf('-') < 0) {
      let accountNo = baseFrom(deserialized);
      let prefix = prefixFrom(deserialized);

      return normalize(accountNo, prefix);
    }

    let [prefix, accountNo] = deserialized.split('-');

    if (isEmpty(accountNo)) {
      return '';
    }

    return normalize(accountNo, prefix);
  }
}
