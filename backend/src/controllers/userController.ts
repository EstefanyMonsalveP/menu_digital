import { Request, Response } from "express";
import { User} from "../models/user";
import { checkUserExists } from "../../services/userService";

//Función para crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    const {name,username,email,password} = req.body;
    try {

        //Invoca la función para validar los datos del usuario
        await checkUserExists(username, email);

        //Despues de la validación, continua con la creación del usuario
        const newUser = new User({
            name,
            username,
            email,
            password
        })

        //Guarda el nuevo plato en la base de datos.
        await newUser.save();

        return res.status(201).json({message: "Usuario creado con exito", data: newUser})
    } catch (error) {
        //Envia respuesta de error con el mensaje
        return res.status(500).json({message: "Error al crear al usuario"})
    }
}

