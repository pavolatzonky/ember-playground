import ok from '../responses/ok';
import parseJSON from '../utils/parse-json';

export default function(mirage) {
  mirage.get('/messages', ({ db }, request) => {
    const channel = request.queryParams.channel;
    const messages = db.messages.where({ channel }); // = channel: channel
    return ok(messages);
  });

  mirage.post('/messages', ({ db }, request) => {
    const data = parseJSON(request);
    const newMessage = db.messages.insert(data);
    return ok(newMessage);
  });
}
