import { MailerSend, Sender, Recipient, EmailParams } from "mailersend";
import dotenv from "dotenv";
dotenv.config();

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});
export default mailerSend;

export const sendVerifyEmail = async (email, token) => {
  const sentFrom = new Sender(
    process.env.MAIL_FROM_EMAIL,
    process.env.MAIL_FROM_NAME,
  );

  const recipients = [new Recipient(email)];

  const verifyLink = `https://findora.com/verify-email?token=${token}`;

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Verify your email - Findora").setHtml(`
      <h2>Welcome to Findora</h2>
      <p>Click below to verify your account:</p>
      <a href="${verifyLink}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `);

  const response = await mailerSend.email.send(emailParams);
  console.log(response);
};
