"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
const nodemailer_1 = require("../config/nodemailer");
class AuthEmail {
    static sendConfirmationEmail = async (user) => {
        await nodemailer_1.transporter.sendMail({
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
    static sendPasswordResetToken = async (user) => {
        await nodemailer_1.transporter.sendMail({
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
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmails.js.map