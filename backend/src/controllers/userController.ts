import { Request, Response } from "express";
import { User} from "../models/user";
import { checkUserExists } from "../services/userService";
import { userRegisterSchema } from "../schema/user.schema";

//Función para crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    try {

            const validatedData = userRegisterSchema.parse(req.body);
        //Invoca la función para validar los datos del usuario
        await checkUserExists(validatedData.username, validatedData.email);

        //Despues de la validación, continua con la creación del usuario
        const newUser = new User({
            validatedData
        })

        //Guarda el nuevo plato en la base de datos.
        await newUser.save();

        return res.status(201).json({message: "Usuario creado con exito", data: newUser})
    } catch (error) {
        //Envia respuesta de error con el mensaje
        return res.status(500).json({message: "Error al crear al usuario"})
    }
}

