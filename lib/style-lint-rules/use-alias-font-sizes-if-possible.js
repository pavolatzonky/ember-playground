'use strict';
let stylelint = require('stylelint');

let ruleName = 'zonky/use-alias-font-sizes-if-possible';
let messages = stylelint.utils.ruleMessages(ruleName, {
  expected(currentValue, expectedValue) {
    return `Use font-sizes from "_variables.scss". Replace "${currentValue}" with "${expectedValue}".`;
  },
});

const fontSizesWithAlias = new Map([
  [`map_get($font-sizes, 'title')`, `$fsz-title`],
  [`map_get($font-sizes, 'icon')`, `$fsz-icon`],
  [`map_get($font-sizes, 'default-heading')`, `$fsz-heading`],
  [`12px`, `map_get($font-sizes, 'small')`],
  [`14px`, `map_get($font-sizes, 'default')`],
  [`16px`, `map_get($font-sizes, 'medium')`],
  [`20px`, `map_get($font-sizes, 'mediumx')`],
  [`24px`, `map_get($font-sizes, 'large')`],
  [`36px`, `map_get($font-sizes, 'xlarge')`],
  [`48px`, `map_get($font-sizes, 'xxlarge')`],
]);

module.exports = stylelint.createPlugin(ruleName, function(
  enabled,
  _,
  context
) {
  if (!enabled) {
    return;
  }

  return function(root, result) {
    root.walkDecls('font-size', function(decl) {
      if (fontSizesWithAlias.has(decl.value)) {
        let currentValue = decl.value;
        let expectedValue = fontSizesWithAlias.get(decl.value);

        if (context.fix) {
          decl.value = expectedValue;
          return;
        }

        stylelint.utils.report({
          result,
          ruleName,
          message: messages.expected(currentValue, expectedValue),
          node: decl,
          word: decl.value,
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
