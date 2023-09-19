import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PSW,
  },
});

export interface Message extends Omit<Mail.Options, 'from' | 'bcc'> {}

export function sendMail(message: Message) {
  const bcc = process.env.NODEMAILER_EMAIL;

  const mail: Mail.Options = {
    ...message,
    from: process.env.NODEMAILER_EMAIL,
    bcc: bcc,
  };

  transporter.sendMail(mail, (err, info) => {
    console.log(err);
    console.log(info);
  });
}
