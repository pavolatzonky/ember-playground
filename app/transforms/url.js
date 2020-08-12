import DS from 'ember-data';

const { Transform } = DS;

export default class URLTransform extends Transform {
  deserialize(serialized) {
    if (!serialized) {
      return serialized;
    }

    if (/^http/.test(serialized)) {
      return serialized;
    }

    if (/^\/api/.test(serialized)) {
      return serialized;
    }

    if (/^api/.test(serialized)) {
      return `/${serialized}`;
    }

    if (/^\//.test(serialized)) {
      return `/api${serialized}`;
    }

    return `/api/${serialized}`;
  }

  serialize(deserialized) {
    return deserialized;
  }
}
