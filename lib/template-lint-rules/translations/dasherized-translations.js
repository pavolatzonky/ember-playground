'use strict';

const { Rule } = require('ember-template-lint');
const { dasherize } = require('ember-cli-string-utils');

module.exports = class DasherizedTranslations extends Rule {
  visitor() {
    return {
      MustacheStatement(node) {
        const translation = this.extractTranslation(node);
        if (!translation) {
          return;
        }

        const value = translation.value || '';
        const arr = value.split('.');
        const prefix = arr.shift();
        const translate = arr.join('.');
        const dasherizedTranslate = dasherize(translate);

        if (translate === dasherizedTranslate) {
          return;
        }

        this.log({
          message: `Translation must use dasherized case.
            Incorrect:\t${value}.
            Correct:\t${prefix}.${dasherizedTranslate}.`,
          line: node.loc && node.loc.start.line,
          column: node.loc && node.loc.start.column,
          source: this.sourceForNode(node),
          fix: {
            text: dasherizedTranslate,
          },
        });
      },
    };
  }

  extractTranslation(node) {
    if (node.path.original === 't') {
      return node.params[0];
    }
  }
};
