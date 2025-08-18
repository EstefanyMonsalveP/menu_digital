import { Request, Response } from "express";
import { User} from "../models/user";

//Función para crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    const {name,username,email,password} = req.body;
    try {
        //Extrae las variables del cuerpo de la interfaz
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

