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
    data.timestamp = new Date().toISOString();
    const newMessage = db.messages.insert(data);
    return ok(newMessage);
  });
}

//v našich datech chybí timestamp, proto před uložením zprávy do pole musíme nastavit timestamp na datech
