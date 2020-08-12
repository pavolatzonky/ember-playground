import bad from './bad';

export default function() {
  return bad({
    error: 'CAPTCHA_REQUIRED',
    error_description: 'Captcha verification is required.',
  });
}
