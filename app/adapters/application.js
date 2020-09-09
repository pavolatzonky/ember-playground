import { dasherize } from '@ember/string';
import DS from 'ember-data';
import { pluralize } from 'ember-inflector';

const { RESTAdapter } = DS;

export default RESTAdapter.extend({
  namespace: 'api',

  pathForType(modelName) {
    return pluralize(dasherize(modelName));
  },
});
