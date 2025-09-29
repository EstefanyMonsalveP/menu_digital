"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationUserEmail = exports.sendRecoveryEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// Función para enviar el correo de recuperación de contraseña
const sendRecoveryEmail = async (to, resetLink) => {
    try {
        await transporter.sendMail({
            from: `"Mi App Menu Digital" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Recuperación de contraseña',
            html: `
        <h1>Recupera tu contraseña</h1>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
      `
        });
        console.log('Correo de recuperación enviado a:', to);
    }
    catch (error) {
        console.error('Error enviando correo:', error);
    }
};
exports.sendRecoveryEmail = sendRecoveryEmail;
//Funcion para enviar correo de confirmación de cuenta
const sendConfirmationUserEmail = async (email, token) => {
    try {
        const confirmUrl = `http://localhost:4200/confirm-account?token=${token}`;
        await transporter.sendMail({
            from: `"Mi App Menu Digital" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Confirmar usuario',
            html: `
        <h1>Confirmar usuario en Menu Digital</h1>
        <p>Si usted desconoce el motivo de este correo, hacer caso omiso</p>
        <p>Si desea confirmar su usuario en Mi App haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${confirmUrl}">${confirmUrl}</a>
      `
        });
    }
    catch (error) {
        console.error('Error enviando correo:', error);
    }
};
exports.sendConfirmationUserEmail = sendConfirmationUserEmail;
//# sourceMappingURL=emailService.js.map