import ok from '../responses/ok';
//import serviceUnavailable from '../responses/service-unavailable';
import parseJSON from '../utils/parse-json';

export default function(mirage) {
  mirage.get(
    '/messages',
    ({ db }, { queryParams: { channel, searchTerm } }) => {
      const messages = db.messages.filter(message => {
        return (
          message.channel === channel ||
          message.messageBody.indexOf(searchTerm) > -1
        );
      });
      return ok(messages);
    }
  );

  mirage.post('/messages', ({ db }, request) => {
    //return serviceUnavailable();
    const data = parseJSON(request);
    data.timestamp = new Date().toISOString();
    const newMessage = db.messages.insert(data);
    return ok(newMessage);
    //v našich datech chybí timestamp, proto před uložením zprávy do pole musíme nastavit timestamp na datech
  });

  mirage.delete('/messages/:id', ({ db }, request) => {
    db.messages.remove(request.params.id);
    return ok();
  });
}
