import ok from '../responses/ok';

export default function(mirage) {
  mirage.get('/users/:id', ({ db }, request) => {
    return ok(db.users.find(request.params.id));
  });
  mirage.get('/users', ({ db }) => {
    return ok(db.users);
  });
}
