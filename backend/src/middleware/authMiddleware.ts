import { verifyToken } from "../utils/tokenUtils";
import { Request, Response, NextFunction } from "express";

//Middleware para proteger las rutas de navegación
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) =>{
    //Obtiene el header de la solicitud.
    const authHeader = req.headers.authorization;

    //Si no existe el header , se bloquea el acceso
    if(!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({message: 'Token no proporcionado'})
    }

    //Extrae solamente el token
    const token = authHeader.split(' ')[1]!;

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