import ok from '../responses/ok';
import parseJSON from '../utils/parse-json';

export default function(mirage) {
  mirage.get('/messages', ({ db }, request) => {
    const channelId = request.queryParams.channelId;
    const messages = db.messages.where({ channelId }); // = channelId: channelId
    return ok(messages);
  });

  mirage.post('/messages', ({ db }, request) => {
    const data = parseJSON(request);
    const newMessage = db.messages.insert(data);
    return ok(newMessage);
  });
}
