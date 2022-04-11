import nodemailer from 'nodemailer';
import { UserInstance } from '../types';

const { RESET_PASSWORD_URL = '' } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

function sendResetPasswordLink(user: UserInstance, token: string) {
  return transporter.sendMail({
    to: user.email,
    from: process.env.EMAIL,
    subject: 'Your reset password instruction',
    html: `<p>Dear ${user.name}, </p>
              <p>You have requested a password reset for your SIPCOT account. Please <a href="${RESET_PASSWORD_URL}?reset_token=c${token}">click here</a> to reset your password.</p>
              <p>If you don't wish to reset your password, disregard this email and no action will be taken.</p>
              <span>Regards,</span> <br /> <span>SIPCOT Team.</span>`
  });
}

function sendInvitationLink(user: UserInstance, token: string) {
  return transporter.sendMail({
    to: user.email,
    from: process.env.EMAIL,
    subject: ' Welcome to Library',
    html: `<p>Dear ${user.name}, </p>
            <p>You have requested a password reset for your SIPCOT account. Please <a href="${RESET_PASSWORD_URL}?reset_token=${token}">click here</a> to reset your password.</p>
            <p>If you don't wish to reset your password, disregard this email and no action will be taken.</p>
            <span>Regards,</span> <br /> <span>SIPCOT Team.</span>`
  });
}

export { sendInvitationLink,  sendResetPasswordLink };
