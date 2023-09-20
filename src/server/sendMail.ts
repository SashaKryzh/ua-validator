import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PSW,
  },
});

export interface Message extends Omit<Mail.Options, 'from' | 'bcc'> {}

export function sendMail(
  message: Message,
): Promise<SMTPTransport.SentMessageInfo | Error> {
  const bcc = process.env.NODEMAILER_EMAIL;

  const mail: Mail.Options = {
    ...message,
    from: process.env.NODEMAILER_EMAIL,
    bcc: bcc,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mail, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}
