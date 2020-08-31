import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  messages = [
    {
      avatarSrc:
        'https://gravatar.com/avatar/96c332a96737c6668906232e39cb16ef?s=200',
      sender: 'Lisa Huang-North',
      timestamp: new Date(2019, 1, 12, 7, 31, 14),
      messageBody: 'Would you like to join my professional network?',
    },
    {
      avatarSrc:
        'https://en.gravatar.com/userimage/4584631/86f74019598950f6efd7b1b8e493259a.jpeg',
      sender: 'Mike North',
      timestamp: new Date(2020, 11, 30, 12, 1, 54),
      messageBody:
        'Hello developer, I looked at your profile and am impressed by your 14 years of COBOL experience. Are you happy in your current role?',
    },
  ];
}
