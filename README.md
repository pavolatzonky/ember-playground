# ember-playground

A bare EmberJS project with NPM modules setup taken from zonky-app in order to provide a starting point for playing with EmberJS framework.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](http://git-scm.com/)
- [Volta](https://volta.sh/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `$ git clone git@github.com:pavolatzonky/ember-playground.git`
- `$ cd ember-playground`
- `$ npm install`

## Running / Development

- `$ npm run start`
- visit app at [http://localhost:4200](http://localhost:4200)

By default application uses configuration provided in `config/environment.js` and connects to local API server (Mirage).

#### Code Generators

Use generators for code, try `$ ember help generate` for more details.

We use [pods](https://ember-cli.com/user-guide/#using-pods) structure for UI parts (`route`, `template`, `controller`, and `component`) by default, so use generators for `model`, `service`, `adapter`, and `serializer` with `--pod` option.

- `$ ember generate route marketplace/index`
- `$ ember generate model marketplace-record --pod`

_ProTip: Ember CLI commands have shorter aliases, try `$ ember help` for more details._

### Code Style

- [EditorConfig](http://editorconfig.org) (see `.editorconfig` configuration)
- [ESLint](https://eslint.org) (see `.eslintrc.js` configuration)
- [Prettier](https://prettier.io) (see `.prettierrc.js` configuration)
- [TemplateLint](https://github.com/rwjblue/ember-cli-template-lint) (see `.template-lintrc.js` configuration)
- [stylelint](https://github.com/billybonks/ember-cli-stylelint) (see `.stylelintrc.js` configuration)
- `$ npm run lint:js -- --fix` to fix linting issues in JavaScript files
- `$ npm run lint:hbs` to print out linting issues in template files

_ProTip: Configure integration with your favourite IDE._

### Running Tests

- `$ npm run test` for CI testing \*
- `$ npm run test:browser` for development testing (open URL provided by Testem)
- `$ npm run test:fastboot` for FastBoot testing

\* see `coverage/index.html` for code coverage results

### Font Awesome subsetting

Integration of font-awesome icons is handled by the [ember-fontawesome](https://github.com/FortAwesome/ember-fontawesome) addon.


## Further Reading / Useful Links

- [Ember.js](http://emberjs.com/)
- [Ember CLI](http://ember-cli.com/)
- [Ember Inspector](https://github.com/emberjs/ember-inspector#readme)
- [Ember FastBoot](http://www.ember-fastboot.com)
- [Ember CLI Deploy](http://ember-cli-deploy.com)
