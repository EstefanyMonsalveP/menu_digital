import { authenticateUser } from "../services/authService";
import { Request, Response } from "express";

//Función para manejar la validacion de las credenciales
export const login = async (req: Request, res:Response) => {
    const {username , password} = req.body;
    try {
        //Invoca la función para validar el usuario y contraseña
         await authenticateUser(username ,password);

         //Envia la respuesta de la autenticacion exitosa
        return res.status(200).json({message: "Iniciando sesion"});
    } catch (error) {
        console.log("Error al iniciar sesion")
        //Envia mensaje de error y codigo
        return res.status(500).json({message: "Error al iniciar sesion"});
    }
}

