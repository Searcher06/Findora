import { resend } from "../config/resend.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const send = await resend.emails.send({
      from: "Findora Support <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
    console.log(send);
    return send;
  } catch (err) {
    console.error("Email failed:", err);
    throw err;
  }
};
