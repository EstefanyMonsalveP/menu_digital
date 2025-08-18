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

export const sendRecoveryEmail = async (to: string, resetLink: string) => {
  try {
    await transporter.sendMail({
      from: `"Mi App" <${process.env.EMAIL_USER}>`,  
      to,                                            
      subject: 'Recuperación de contraseña',
      html: `
        <h1>Recupera tu contraseña</h1>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
      `
    });
    console.log('Correo de recuperación enviado a:', to);
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
};
