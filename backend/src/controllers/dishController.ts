import { Request, Response } from "express";
import { Dish } from "../models/dish";

//Funcion para crear un nuevo plato 
export const createDish = async (req: Request, res: Response) => {
    try{

        //Validar la sesion del usuario;
        const userId = req.user?.id;

        //Extrae las variables del cuerpo de la interfaz
        const {image, dishName, description, price} = req.body;

        //Crea una nueva instancia del modelo Dish con los datos recibidos
        const newDish =  new Dish ({
            image,
            dishName,
            description,
            price,
            user: userId, //Asociar los datos al usuario autenticado
        });

        //Guarda el nuevo plato en la base de datos.
        await newDish.save();

        //Envia la respuesta con el estado y los nuevos datos del plato
        return res.status(201).json({message: "Preparacion Creada", data: newDish})
    }catch(error){
        console.log("error al crear el plato", error)
        //Envia una respuesta del error con el mensaje
        return res.status(500).json({ error: "Error al crear el plato" });
    }
}

//Funcion para crear un nuevo plato 
export const getUserDishes = async (req: Request, res: Response) => {
    try{

        const userId = req.user?.id;
        //Busca todos los platos
        const dishes = await Dish.find({user: userId});

        //Envia la respuesta con el estado y la lista de los platos
        res.status(200).json({data: dishes})
    }catch(error){
        //Envia una respuesta del error con el mensaje
        res.status(500).json({ error: "Error al obtener los platos del usuario" });
    }
}

//Funcion para Actualizar un plato
export const updateDish = async (req: Request, res: Response) => {
    //Toma el id de la URL
    const {id} = req.params;
    //Obtiene los datos del cuerpo 
    const updateData = req.body;
    const userId = req.user?.id;
    try{

        //Buscar el plato por id
        const dish = await Dish.findById(id);

        //Si el plato no existe, enviar respuesta.
         if (!dish) 
            return res.status(404).json({ message: "Plato no encontrado" })
        
         //Validacion para verificar que el usuario de sesion es el mismo que creo el plato
        if (dish.user.toString() !== userId) {
        return res.status(403).json({ message: "No tienes permisos para modificar este plato" });
        }
        
        //Busca el id del plato, pasa los valores y lo actualiza.
        const updateDish =  await Dish.findByIdAndUpdate(
            id, 
            updateData,
            {new: true}
        );

        //Envia la respuesta con el estado y los nuevos datos del plato
        return res.status(200).json({ message: "Plato actualizado", data: updateDish });
    }catch(error){
        //Envia una respuesta del error con el mensaje
        return res.status(500).json({ error: "Error al actualizar los datos" });
    }
}

//Funcion para eliminar un plato
export const removeDish = async (req: Request, res: Response) => {
    //Toma el id de la URL
    const {id} = req.params;
    const userId = req.user?.id;
    try{

         //Buscar el plato por id
        const dish = await Dish.findById(id);

        //Si el plato no existe, enviar respuesta.
         if (!dish) 
            return res.status(404).json({ message: "Plato no encontrado" })
        
         //Validacion para verificar que el usuario de sesion es el mismo que creo el plato
        if (dish.user.toString() !== userId) {
        return res.status(403).json({ message: "No tienes permisos para modificar este plato" });
        }

        //Busca el id del plato, pasa los valores y lo actualiza.
        await Dish.findByIdAndDelete(id);

        //Envia la respuesta con el estado y los nuevos datos del plato
        return res.status(200).json({ message: "Plato eliminado de la carta"});
    }catch(error){
        //Envia una respuesta del error con el mensaje
    return res.status(500).json({ error: "Error al eliminar el plato" });
    }
}