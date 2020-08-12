import { required, failed } from 'ember-playground/mirage/responses/authorization';
import { hasCode, getCode } from '../utils/authorization';

const WRONG_SMS_CODE = '000000';

export default function smsAuthorizedRequest({ request, response }) {
  if (hasCode(request)) {
    if (getCode(request) === WRONG_SMS_CODE) {
      return failed();
    }

    return response();
  }

  return required();
}
