import { sendContactEmail } from "@/lib/email";

export const sendContactMessage = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const { name, email, subject, message } = data;

  if (!name || !email || !subject || !message) {
    throw new Error("ALL_FIELDS_REQUIRED");
  }

  await sendContactEmail(name, email, subject, message);

  return { message: "Your message has been sent successfully!" };
};
