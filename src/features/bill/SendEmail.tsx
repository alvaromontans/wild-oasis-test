import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { Email } from "./Email";

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: "my_user",
    pass: "my_password",
  },
});

const emailHtml = await render(<Email url="https://example.com" />);

const options = {
  from: "you@example.com",
  to: "keyehef703@bankrau.com",
  subject: "hello world",
  html: emailHtml,
};

await transporter.sendMail(options);
