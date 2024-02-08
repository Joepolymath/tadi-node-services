import path from 'path';
import sg, { MailDataRequired } from '@sendgrid/mail';
import Email from 'email-templates';
import previewEmail from 'preview-email';
import { MAILER_FROM_OPTION } from '../../shared/configs/env.config';
import { EmailServices, IEmailMessage } from '../../shared/types/email.types';

export default class EmailService {
  private APIKEY: string;
  private from: string = MAILER_FROM_OPTION;
  private service: string;
  constructor(apiKey: string, service: string) {
    this.APIKEY = apiKey;
    this.service = service;
    sg.setApiKey(this.APIKEY);
  }

  public async send(mailObj: IEmailMessage) {
    mailObj.from = this.from;
    switch (this.service) {
      case EmailServices.SENDGRID:
        const sgResponse = await sg.send(<MailDataRequired>mailObj, false);
        console.log({ sgResponse });
        return sgResponse;

      default:
        throw new Error('Mailing service not selected');
    }
  }

  public loadTemplate = (templateName: string, context: any) => {
    const dir = path.resolve(__dirname, '../email-templates', templateName);
    const email = new Email({
      views: {
        options: {
          extension: 'ejs', // <---- HERE template engine
        },
      },
    });

    return new Promise((resolve, reject) => {
      email
        .renderAll(dir, {
          ...context,
        })
        .then((template) => {
          previewEmail(template).then(console.log).catch(console.error); //preview email in browser, comment in production
          resolve(template);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
