import { Request, Response } from "express";
import { Dish } from "../models/dish";

//Funcion para crear un nuevo plato 
export const createDish = async (req: Request, res: Response) => {
    try{
        //Extrae las variables del cuerpo de la interfaz
        const {urlImage, dishName, description, price} = req.body;

        //Crea una nueva instancia del modelo Dish con los datos recibidos
        const newDish =  new Dish ({
            urlImage,
            dishName,
            description,
            price
        });

        //Guarda el nuevo plato en la base de datos.
        await newDish.save();

        //Envia la respuesta con el estado y los nuevos datos del plato
        res.status(201).json({message: "Preparacion Creada", data: newDish})
    }catch(error){
        //Envia una respuesta del error con el mensaje
        res.status(500).json({ error: "Error al crear la preparación" });
    }
}