import ok from '../responses/ok';

export default function(mirage) {
  mirage.get('/messages', ({ db }, request) => {
    const channelId = request.queryParams.channelId;
    const messages = db.messages.where({ channelId }); // = channelId: channelId
    return ok(messages);
  });
}
