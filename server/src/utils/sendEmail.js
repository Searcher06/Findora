import { resend } from "../config/resend.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    return await resend.emails.send({
      from: "Findora Support <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Email failed:", err);
    throw err;
  }
};
