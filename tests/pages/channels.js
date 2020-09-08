import { create, visitable } from 'ember-cli-page-object';

import channels from './components/channels';

export default create({
  ...channels,
  visit: visitable('/channels'),
});
