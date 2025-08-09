import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN || "e538340cdaa4d13a16066f686d700ae8";

export const client = new MailtrapClient({
  token: TOKEN as string,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Advanced Auth Inc",
};
// const recipients = [
//   {
//     email: "m.daniyal0201@gmail.com",
//   },
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
