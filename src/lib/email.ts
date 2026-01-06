import * as Brevo from "@getbrevo/brevo";
import { BREVO_API_KEY, EMAIL_USER } from "@/lib/env";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  BREVO_API_KEY
);

console.log("BREVO KEY LOADED:", !!BREVO_API_KEY);
console.log("EMAIL_USER:", EMAIL_USER);


// OTP email
export async function sendOtpEmail(email: string, otp: string) {
  await apiInstance.sendTransacEmail({
    sender: { name: "Bildare Auth", email: EMAIL_USER },
    to: [{ email }],
    subject: "🔐 Your Bildare Verification Code",
      htmlContent: `
      <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
        <h2>Welcome to <span style="color:#ff510d;">Bildare</span> 🎉</h2>
        <p>We are excited to have you on board! To complete your sign up, please verify your email using the OTP below:</p>
        <div style="margin:20px 0; padding:15px; background:#f4f4f4; border-radius:8px; text-align:center;">
          <h1 style="color:#182a4e; letter-spacing:5px;">${otp}</h1>
        </div>
        <p>This code will expire in <b>10 minutes</b>. If you did not request this, please ignore this email.</p>
        <p style="margin-top:30px;">Cheers,<br><b>The Bildare Team</b></p>
      </div>
    `,
  });
}

// Password reset
export async function sendTokenEmail(email: string, token: string) {
  await apiInstance.sendTransacEmail({
    sender: { name: "Bildare Auth", email: EMAIL_USER },
    to: [{ email }],
    subject: "Your Password Reset Token",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
        <h2>Hello User, Here is your Password Reset Token 🎉</h2>

        <div style="margin:20px 0; padding:15px; background:#f4f4f4; border-radius:8px; text-align:center;">
          <h1 style="color:#182a4e; letter-spacing:5px;">${token}</h1>
        </div>
        <p>This code will expire in <b>10 minutes</b>. If you did not request this, please ignore this email.</p>
        <p style="margin-top:30px;">Cheers,<br><b>The Bildare Team</b></p>
      </div>
    `,
  });
}

// Contact form
export async function sendContactEmail(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  await apiInstance.sendTransacEmail({
    sender: { name: "Bildare Contact", email: EMAIL_USER },
    to: [{ email: EMAIL_USER }],
    subject: `Contact Form: ${subject}`,
    htmlContent: `
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p>${message}</p>
    `,
  });
}
