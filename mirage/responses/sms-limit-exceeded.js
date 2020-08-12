import Mirage from 'ember-cli-mirage';

/**
 * This is used for non-authorizing sms limit error (eg. login through sms)
 * For authorization-sms exceeded error see authorization.js
 */
export default function(expiresAt = new Date()) {
  return new Mirage.Response(
    403,
    { 'x-request-possible-at': expiresAt },
    { error: 'SMS_LIMIT_EXCEEDED' }
  );
}
