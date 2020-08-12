import RSVP, { allSettled } from 'rsvp';

export function initialize() {
  window.Promise = RSVP.Promise;
  window.Promise.allSettled = allSettled;
}

export default {
  initialize,
};
