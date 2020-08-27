import { setupRenderingTest } from 'ember-qunit';
import setupPageObject from './setup-page-object';

export default function(hooks, page) {
  setupRenderingTest(hooks);
  setupPageObject(hooks, page);
}
