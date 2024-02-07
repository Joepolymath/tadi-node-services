export interface IEmailMessage {
  to: string;
  subject: string;
  text?: string;
  html: string;
  from?: string;
}

export enum EmailServices {
  SENDGRID = 'sendgrid',
}
