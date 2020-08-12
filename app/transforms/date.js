import { DateTransform as Transform } from '@ember-data/serializer/-private';
import parse from 'date-fns/parse';

export const DATE = 'yyyy-MM-dd';

export default class DateTransform extends Transform {
  deserialize(serialized, options = {}) {
    if (serialized === undefined || serialized === null) {
      return null;
    }

    if ('parse' in options) {
      return parse(
        serialized.substring(0, options.parse.length),
        options.parse,
        new Date()
      );
    }

    return super.deserialize(...arguments);
  }
}
