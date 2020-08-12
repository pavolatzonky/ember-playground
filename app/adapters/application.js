import { dasherize } from '@ember/string';
import DS from 'ember-data';
import { pluralize } from 'ember-inflector';

const { RESTAdapter } = DS;

const REQUEST_Headers = {
  page: {
    key: 'X-Page',
    normalize(value) {
      return parseInt(value, 10);
    },
  },
  size: {
    key: 'X-Size',
    normalize(value) {
      return parseInt(value, 10);
    },
  },
  sort: {
    key: 'X-Order',
    normalize(value) {
      return `${value}`;
    },
  },
};

const RESPONSE_HEADERS = {
  total: {
    key: 'X-Total',
    normalize(value) {
      return parseInt(value, 10);
    },
  },
};

export default RESTAdapter.extend({
  namespace: 'api',

  pathForType(modelName) {
    return pluralize(dasherize(modelName));
  },
});
