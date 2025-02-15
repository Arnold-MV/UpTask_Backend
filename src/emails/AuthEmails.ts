import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    await transporter.sendMail({
      from: "UpTask <admin@uptask.com>",
      to: user.email,
      subject: "UpTask - Confirma tu cuenta",
      text: "UpTask - Confirma tu cuenta",
      html: `<p>Hola: ${user.name}, acabas de crear tu cuenta en UpTask, ya casi estas todo listo, solo debes de confirmar tu cuenta</p>
      <p>Visita el siguiente enlace</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account"> Confirmar cuenta</a>
      <p>E ingresa en código: <b>${user.token}</b></p>
      <p>Este token espira en 10 minutos</p>
      `,
    });
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    await transporter.sendMail({
      from: "UpTask <admin@uptask.com>",
      to: user.email,
      subject: "UpTask - Restablece tu password",
      text: "UpTask - Restablece tu password",
      html: `<p>Hola: ${user.name}, has solicitado restablecer tu password.</p>
      <p>Visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/new-password"> Restablecer Password</a>
      <p>E ingresa en código: <b>${user.token}</b></p>
      <p>Este token espira en 10 minutos</p>
      `,
    });
  };
}
