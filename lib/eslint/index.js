'use strict';
const ORDER_OF_COMPONENT_PROPERTIES = [
  'service',
  'property',
  ['single-line-function', 'multi-line-function'],
  'observer',
  'init',
  'didReceiveAttrs',
  'willRender',
  'willInsertElement',
  'didInsertElement',
  'didRender',
  'didUpdateAttrs',
  'willUpdate',
  'didUpdate',
  'willDestroyElement',
  'willClearRender',
  'didDestroyElement',
  'actions',
  'method',
  'empty-method',
];

const ORDER_OF_CONTROLLER_PROPERTIES = [
  'controller',
  'service',
  'query-params',
  'inherited-property',
  'property',
  ['single-line-function', 'multi-line-function'],
  'observer',
  'actions',
  'method',
  'empty-method',
];

const ORDER_OF_MODEL_PROPERTIES = [
  'attribute',
  'relationship',
  ['single-line-function', 'multi-line-function'],
];

const ORDER_OF_ROUTE_PROPERTIES = [
  'service',
  'inherited-property',
  'property',
  ['single-line-function', 'multi-line-function'],
  'beforeModel',
  'model',
  'afterModel',
  'serialize',
  'redirect',
  'activate',
  'setupController',
  'renderTemplate',
  'resetController',
  'deactivate',
  'actions',
  'method',
  'empty-method',
];

module.exports = {
  ORDER_OF_COMPONENT_PROPERTIES,
  ORDER_OF_CONTROLLER_PROPERTIES,
  ORDER_OF_MODEL_PROPERTIES,
  ORDER_OF_ROUTE_PROPERTIES,
};
