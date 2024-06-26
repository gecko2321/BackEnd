import { createTransport } from "nodemailer";
import environment from "./env.util.js";
import __dirname from "../../utils.js";

const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment;

async function sendEmail(data) {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD },
    });
    await transport.verify();
    await transport.sendMail({
      from: `CERAMICA GLORIA <${GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Usuario Registrado</title>
      </head>
      <body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8f9fa; margin: 0;">
          <div style="text-align: center; padding: 20px; background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 5px; color: #155724;">
              <h1>USUARIO REGISTRADO EN EL SITIO!</h1>
              <h2>El próximo paso es validarlo en el siguiente enlace:</h2>
              <a href="http://localhost:8080/users/verify" style="font-size: 18px; color: #007bff;">http://localhost:8080/users/verify</a>
              <p style="font-size: 18px; margin-top: 10px;">Verification Code: <strong>${data.code}</strong></p>
          </div>
      </body>
      </html>
  `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;
