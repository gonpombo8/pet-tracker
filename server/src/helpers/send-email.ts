import preMailgun from 'mailgun-js';
import config from 'dos-config';

const { apiKey, domain } = config.mailgun;
const mailgun = preMailgun({ apiKey, domain });
const FROM = 'Pet Tracker <noreply@pettracker.com>';

export default (to: string, subject: string, html: string) => {
  if (!apiKey) {
    return Promise.resolve();
  }

  return mailgun.messages().send({
    html,
    subject,
    to,
    from: FROM,
  });
};
