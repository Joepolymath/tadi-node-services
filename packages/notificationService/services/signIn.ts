import { SENDGRIDAPIKEY } from '../../shared/configs/env.config';
import { EmailServices, IEmailMessage } from '../../shared/types/email.types';
import EmailService from '../utils/email';

export async function signInEmail(messageObj: any) {
  const emailService = new EmailService(SENDGRIDAPIKEY, EmailServices.SENDGRID);
  const renderedTemplate: any = await emailService.loadTemplate('signin', {});
  const { html } = renderedTemplate;
  const msg: IEmailMessage = {
    to: messageObj.email,
    subject: 'NEW LOGIN ALERT',
    html,
  };
  await emailService.send(msg);
}
