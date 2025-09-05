import { verifyToken } from "../utils/tokenUtils";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/authRequest";

//Middleware para proteger las rutas de navegación
export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) =>{
    //Obtiene el token desde la cookie
    const token = req.cookies?.token;

    //Si no existe el header , se bloquea el acceso
    if(!token){
        return res.status(401).json({message: 'Token no autorizado'})
    }
    
    try {

        //Invoca la funcion para verificar el token.
        const verify =  verifyToken(token);

        //Asigna el token a la sesion del usuario 
        req.user = verify;

        //Continua navegando si el token es valido.
        next();

    } catch (error) {
         // Si el token es invalido o expiró, devuelve un error de autenticación
         return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}