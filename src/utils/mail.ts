import nodemailer from 'nodemailer';
import { config } from '@config/config';

async function sendMail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const info = await transporter.sendMail({
    from: config.emailUser,
    to: 'pablomaurig@gmail.com',
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>',
  });

  console.log('Message sent: %s', info.messageId);
}

sendMail();
