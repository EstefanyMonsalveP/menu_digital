import { sendConfirmationUserEmail, sendRecoveryEmail } from "../services/emailService";
import { Request,Response } from "express";
import { generateToken } from "../utils/tokenUtils";
import { User } from "../models/user";


export const recoveryPassoword = async (req: Request, res: Response) => {
    const {email} = req.body;

    try {
        //Buscar usuario por email en la DB
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        //Crear token o link de recuperación (puedes usar JWT o un UUID)
        const resetToken = await generateToken({userId: user.id}); 
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        //Enviar correo con el link
        await sendRecoveryEmail(email, resetLink);

        return res.status(200).json({ message: 'Correo de recuperación enviado' });
    } catch (error) {
        console.log("Error al enviar el correo", error);
        return res.status(500).json({message: 'Se presentaron problemas al enviar el correo'})
    }
}