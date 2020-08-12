export default function maskAndFormatPhone(phone) {
  let modified = phone.split('');
  modified.splice(8, 4, ...'*'.repeat(4).split(''));
  modified.splice(4, 0, ' ');
  modified.splice(8, 0, ' ');
  modified.splice(12, 0, ' ');

  return modified.join('');
}
