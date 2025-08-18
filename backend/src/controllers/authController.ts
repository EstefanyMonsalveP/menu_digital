import { authenticateUser } from "../services/authService";
import { Request, Response } from "express";
import { resetPasswordSchema } from "../schema/resetPassword.schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET!;

//Función para manejar la validacion de las credenciales
export const login = async (req: Request, res:Response) => {
    const {username , password} = req.body;
    try {
        //Invoca la función para validar el usuario y contraseña
         const {user,token} = await authenticateUser(username ,password);

        // Coloca el token como cookie
        res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
        maxAge: 3600000, // 1 hora (igual que el tiempo del token)
        });

         //Envia la respuesta de la autenticacion exitosa con el token 
         //y datos basicos del usuario
        return res.status(200).json({message: 'Inicio de sesión exitoso',
            user: {
            id: user._id,
            username: user.username
      }});
    } catch (error) {
        console.log("Error al iniciar sesion")
        //Envia mensaje de error y codigo
        return res.status(500).json({message: "Error al iniciar sesion"});
    }
}

//Funcion para eliminar el token de la cookie.
export const logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res.status(200).json({ message: "Sesión cerrada correctamente"})
}

export const resetPassword = async (req: Request, res: Response) => {
    // Validar datos con Zod
  const validation = resetPasswordSchema.safeParse(req.body);

  if (!validation.success) {
    // Enviar errores de validación
    return res.status(400).json({ errors: validation.error.format() });
  }

  const { password, confirmPassword, token } = req.body;

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // Buscar usuario por id
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña del usuario
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    return res.status(400).json({ message: 'Token inválido o expirado' });
  }
}