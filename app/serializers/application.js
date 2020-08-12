import DS from 'ember-data';

const { JSONSerializer } = DS;

export default class ApplicationSerializer extends JSONSerializer {
  normalizeSingleResponse(store, primaryModelClass, payload, id) {
    if (payload) {
      payload.id = payload.id || id || '1';
    }
    return super.normalizeSingleResponse(...arguments);
  }
}
