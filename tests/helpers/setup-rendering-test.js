import { setupRenderingTest } from 'ember-qunit';
import setupPageObject from './setup-page-object';
import setupStore from './setup-store';

export default function(hooks, page) {
  setupRenderingTest(hooks);
  setupPageObject(hooks, page);
  setupStore(hooks);
}
