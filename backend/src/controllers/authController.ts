import { authenticateUser } from "../services/authService";
import { Request, Response } from "express";

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
            token,
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

