import bad from './bad';
import forbidden from './forbidden';
import unauthorized from './unauthorized';

const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  'X-SMS-Authorization': true,
};

/**
 * - `camelcase` is used by `openbanking`
 */
export function required({ camelcase = false, now, later } = {}) {
  now = now || new Date();
  later = later || new Date(now.getTime() + 10 * 60 * 1000); // +10 minutes

  let data = {
    error: 'AUTHORIZATION_SMS_REQUIRED',
    error_description: 'SMS authorization is required', // this is not coming from `openbanking`
    [camelcase ? 'smsValidFrom' : 'sms_valid_from']: now.toISOString(),
    [camelcase ? 'smsValidTo' : 'sms_valid_to']: later.toISOString(),
  };

  return bad(data, headers);
}

export function authAttemptsExceeded(
  { userId, attempts, actionType, minDateForInvalidAuthsSearch } = {
    userId: '12324425',
    attempts: '666',
    actionType: 'not_set_type',
    minDateForInvalidAuthsSearch: new Date().toISOString(),
  }
) {
  return unauthorized(
    {
      error: 'SMS_AUTH_FAILED_ATTEMPTS_EXCEEDED',
      error_description: `SMS Auth check limit exceeded for user ${userId} and type ${actionType}. Found ${attempts} invalid sms auth checks modified after ${minDateForInvalidAuthsSearch}`,
    },
    401,
    headers
  );
}

/** This regards only authorizing SMS, for non authorizing see mirage/respones/sms-limit-exceeded.js */
export function sendNewSMSLimitExceeded() {
  return forbidden(
    {
      error: 'AUTHORIZATION_SMS_LIMIT_EXCEEDED',
      error_description:
        'SMS authorization failed: AUTHORIZATION_SMS_LIMIT_EXCEEDED',
    },
    headers
  );
}

export function failed() {
  return forbidden(
    {
      error: 'AUTHORIZATION_FAILED',
      error_description: 'SMS authorization failed: AUTHORIZATION_FAILED',
    },
    headers
  );
}
