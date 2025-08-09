import { client, sender } from "../config/mailtrap.config";
import { VERIFICATION_EMAIL_TEMPLATE } from "../config/templates/email.template";

export const sendVerficationEmail = async (
  recipientEmail: string,
  verificationToken: string
) => {
  const recipient = [
    {
      email: recipientEmail,
    },
  ];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Email Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export const sendWelcomeEmail = async (
  recipientEmail: string,
  userName: string
) => {
  const recipient = [
    {
      email: recipientEmail,
    },
  ];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "a9da6663-db82-489a-a5e5-a65fc34c1a49",
      template_variables: {
        company_info_name: "Advanced Auth Inc",
        name: userName,
      },
    });
    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
