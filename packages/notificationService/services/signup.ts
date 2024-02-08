import { SENDGRIDAPIKEY } from '../../shared/configs/env.config';
import { EmailServices, IEmailMessage } from '../../shared/types/email.types';
import EmailService from '../utils/email';

export async function signUpEmail(messageObj: any) {
  const emailService = new EmailService(SENDGRIDAPIKEY, EmailServices.SENDGRID);
  const renderedTemplate: any = await emailService.loadTemplate('signup', {});
  const { html } = renderedTemplate;
  const msg: IEmailMessage = {
    to: messageObj.email,
    subject: 'Welcome to Tadi',
    html,
  };
  await emailService.send(msg);
}
