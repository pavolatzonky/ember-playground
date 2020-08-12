'use strict';

const { Rule } = require('ember-template-lint');
const { dasherize } = require('ember-cli-string-utils');

module.exports = class DasherizedTestAttributes extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        const dataTestAttribute = this.extractDataTestAttribute(node);
        if (!dataTestAttribute) {
          return;
        }

        const value = dataTestAttribute.value.chars || '';
        const dasherized = dasherize(value);
        if (value === dasherized) {
          return;
        }

        this.log({
          message: `Data test attributes must use dasherized case.
            Incorrect: ${dataTestAttribute.name}="${value}".
            Correct: ${dataTestAttribute.name}="${dasherized}"`,
          line: node.loc && node.loc.start.line,
          column: node.loc && node.loc.start.column,
          source: this.sourceForNode(node),
          fix: {
            text: `${dataTestAttribute.name}="${dasherized}"`,
          },
        });
      },
    };
  }

  extractDataTestAttribute(node) {
    return node.attributes.find(attribute =>
      attribute.name.startsWith('data-test-')
    );
  }
};
