import { Request, Response } from "express";
import { User} from "../models/user";
import { checkUserExists, authenticateUser } from "../services/userService";
import { userRegisterSchema } from "../schema/user.schema";
import { ZodError } from "zod";

//Función para crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    try {
        //Se invoca la función para hacer las validaciones de los campos.
        const validatedData = userRegisterSchema.parse(req.body);

        //Invoca la función para validar el username y email.
        await checkUserExists(validatedData.username, validatedData.email);

        //Despues de la validación, continua con la creación del usuario
        const newUser = new User(validatedData)

        //Guarda el nuevo usuario en la base de datos.
        await newUser.save();

        return res.status(201).json({message: "Usuario creado con exito"})
    } catch (error) {
        //Envia los mensajes de error si provienen de Zod
        if (error instanceof ZodError) {
            // Devolver solo los mensajes de error
            const errores = error.issues.map((err) => err.message);
            return res.status(400).json({
            message: "Error en los datos",
            errors: errores,
      });
    }
        //Envia el error con el mensaje si proviene del servidor
        return res.status(500).json({message: "Error al crear al usuario"})
    }
}

export const login = async (req: Request, res:Response) => {
    const {username , password} = req.body;

    try {
         await authenticateUser(username ,password);

        res.status(200).json({message: "Iniciando sesion"});
    } catch (error) {
        console.log("Error al iniciar sesion")
        res.status(500).json({message: "Error al iniciar sesion"});
    }
}


