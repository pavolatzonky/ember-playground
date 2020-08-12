import Application from '@ember/application';
import EmberResolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'ember-playground/config/environment';

class Resolver extends EmberResolver {
  findModuleName(parsedName, loggingDisabled) {
    let moduleName = super.findModuleName(parsedName, loggingDisabled);

    if (
      parsedName.prefix === config.modulePrefix &&
      parsedName.fullName.startsWith('template:components') &&
      moduleName &&
      !moduleName.startsWith(`${config.modulePrefix}/components`)
    ) {
      moduleName = moduleName.replace(
        config.modulePrefix,
        `${config.modulePrefix}/components`
      );
    }

    return moduleName;
  }
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
