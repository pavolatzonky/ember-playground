import { collection } from 'ember-cli-page-object';
import message from './messages/message';

export default {
  messages: collection(message.scope, {
    ...message, //spread operátor, v JS to dělá Object.assign(biggerObject, smallerObject), který ty properties smaller Object migruje do biggerObject, vrací to nový obejkt, ale zmutuje to i ten target
    //pokud to chci do nového objektu, napíšu Object.assign({}, biggerOne, smallerOne) - to mi to hodí do nového objektu a nepřepíše starý, ten poslední má největší váhu a přepíše, když něco sdílí
    //ekvivalent je combined = {
    //  ...biggerOne
    //  ...smallerOne
    //}
  }),
};
