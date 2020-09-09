import ok from '../responses/ok';

export default function(mirage) {
  mirage.get('/channels', ({ db }) => {
    return ok(db.channels);
  });
}
