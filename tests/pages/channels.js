import { create, visitable } from 'ember-cli-page-object';

import channels from './components/channels';
import error from './components/error';

export default create({
  ...channels,
  error,
  visit: visitable('/channels'),
});
