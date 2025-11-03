import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',        
  port: 587,                     
  secure: false,                 
  auth: {
    user: process.env.EMAIL_USER,    
    pass: process.env.EMAIL_PASS   
  }
});

// Función para enviar el correo de recuperación de contraseña
export const sendRecoveryEmail = async (to: string, resetLink: string) => {
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
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
};

//Funcion para enviar correo de confirmación de cuenta
export const sendConfirmationUserEmail= async (email: string, token: string) => {
  try {
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4200";
    const confirmUrl = `${FRONTEND_URL}/confirm-account?token=${token}`;
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
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
};