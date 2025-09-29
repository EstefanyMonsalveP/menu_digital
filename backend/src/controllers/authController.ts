import { authenticateUser } from "../services/authService";
import { Request, Response } from "express";
import { resetPasswordSchema } from "../schema/resetPassword.schema";
import { User } from "../models/user";
import { verifyToken } from "../utils/tokenUtils";

const JWT_SECRET = process.env.JWT_SECRET!;

//Función para manejar la validacion de las credenciales
export const login = async (req: Request, res:Response) => {
    const {email , password} = req.body;
    try {
        //Invoca la función para validar el usuario y contraseña
         const {user,token} = await authenticateUser(email ,password);

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
            name: user.name
      }});
    } catch (error:any) {
        //Envia mensaje de error y codigo
        return res.status(400).json({message: error.message || "Error al iniciar sesion"});
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
    const decoded = verifyToken(token);

    // Buscar usuario por id
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Actualizar la contraseña del usuario
    user.password = password;
    await user.save();

    return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    return res.status(400).json({ message: 'Token inválido o expirado' });
  }
}

//Función para confirmar la cuenta del usuario
export const confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.query;

    //Si no encuentra el token o no es un string, enviar mensaje de error
    if(!token || typeof token !== 'string'){
      return res.status(400).json({message: "Token no proporcionado o inválido"});
    }

    try {
          //Verficar el token
      const decoded = verifyToken(token as string);

      //Tomar el id del usuario del token decodificado
      const user = decoded.userId ; 

      //Confirmar la cuenta del usuario
      user.isConfirmed = true;

      //Guardar los cambios en la base de datos
      await user.save();

      return res.status(200).json({message: "Cuenta confirmada correctamente, ya puede iniciar sesión"});
    }catch(error){
      console.log("Error al confirmar la cuenta", error);
      return res.status(400).json({message: "El token no es valido o ha expirado"});
    }
}