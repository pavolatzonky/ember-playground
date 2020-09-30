import { create, visitable } from 'ember-cli-page-object';
import search from './components/search';

export default create({
  search,
  visit: visitable('/search'),
});
