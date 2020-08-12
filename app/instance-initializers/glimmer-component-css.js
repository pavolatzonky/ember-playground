import podNames from 'ember-component-css/pod-names';

// https://github.com/ebryn/ember-component-css/issues/342#issuecomment-575207562
export function initialize(appInstance) {
  for (let [componentPath, styleNamespace] of Object.entries(podNames)) {
    let factory = appInstance.factoryFor(`component:${componentPath}`);
    if (factory === undefined) {
      continue;
    }

    let klass = factory.class;
    if (klass === undefined) {
      continue;
    }

    let set = 'componentCssClassName' in klass.prototype;
    if (set === true) {
      continue;
    }

    Object.defineProperty(klass.prototype, 'componentCssClassName', {
      configurable: true,
      enumerable: true,
      get() {
        return styleNamespace;
      },
    });
  }
}

export default {
  after: 'route-styles',
  initialize,
};
