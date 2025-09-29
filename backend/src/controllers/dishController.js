"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDish = exports.updateDish = exports.getUserDishes = exports.createDish = void 0;
const dish_1 = require("../models/dish");
//Funcion para crear un nuevo plato 
const createDish = async (req, res) => {
    try {
        //Validar la sesion del usuario;
        const userId = req.user?.id;
        //Extrae las variables del cuerpo de la interfaz
        const { image, dishName, description, price } = req.body;
        //Crea una nueva instancia del modelo Dish con los datos recibidos
        const newDish = new dish_1.Dish({
            image,
            dishName,
            description,
            price,
            user: userId, //Asociar los datos al usuario autenticado
        });
        //Guarda el nuevo plato en la base de datos.
        await newDish.save();
        //Envia la respuesta con el estado y los nuevos datos del plato
        return res.status(201).json({ message: "Preparacion Creada", data: newDish });
    }
    catch (error) {
        console.log("error al crear el plato", error);
        //Envia una respuesta del error con el mensaje
        return res.status(500).json({ error: "Error al crear el plato" });
    }
};
exports.createDish = createDish;
//Funcion para crear un nuevo plato 
const getUserDishes = async (req, res) => {
    try {
        const userId = req.user?.id;
        //Busca todos los platos
        const dishes = await dish_1.Dish.find({ user: userId });
        //Envia la respuesta con el estado y la lista de los platos
        res.status(200).json({ data: dishes });
    }
    catch (error) {
        //Envia una respuesta del error con el mensaje
        res.status(500).json({ error: "Error al obtener los platos del usuario" });
    }
};
exports.getUserDishes = getUserDishes;
//Funcion para Actualizar un plato
const updateDish = async (req, res) => {
    //Toma el id de la URL
    const { id } = req.params;
    //Obtiene los datos del cuerpo 
    const updateData = req.body;
    const userId = req.user?.id;
    try {
        //Buscar el plato por id
        const dish = await dish_1.Dish.findById(id);
        //Si el plato no existe, enviar respuesta.
        if (!dish)
            return res.status(404).json({ message: "Plato no encontrado" });
        //Validacion para verificar que el usuario de sesion es el mismo que creo el plato
        if (dish.user.toString() !== userId) {
            return res.status(403).json({ message: "No tienes permisos para modificar este plato" });
        }
        //Busca el id del plato, pasa los valores y lo actualiza.
        const updateDish = await dish_1.Dish.findByIdAndUpdate(id, updateData, { new: true });
        //Envia la respuesta con el estado y los nuevos datos del plato
        return res.status(200).json({ message: "Plato actualizado", data: updateDish });
    }
    catch (error) {
        //Envia una respuesta del error con el mensaje
        return res.status(500).json({ error: "Error al actualizar los datos" });
    }
};
exports.updateDish = updateDish;
//Funcion para eliminar un plato
const removeDish = async (req, res) => {
    //Toma el id de la URL
    const { id } = req.params;
    const userId = req.user?.id;
    try {
        //Buscar el plato por id
        const dish = await dish_1.Dish.findById(id);
        //Si el plato no existe, enviar respuesta.
        if (!dish)
            return res.status(404).json({ message: "Plato no encontrado" });
        //Validacion para verificar que el usuario de sesion es el mismo que creo el plato
        if (dish.user.toString() !== userId) {
            return res.status(403).json({ message: "No tienes permisos para modificar este plato" });
        }
        //Busca el id del plato, pasa los valores y lo actualiza.
        await dish_1.Dish.findByIdAndDelete(id);
        //Envia la respuesta con el estado y los nuevos datos del plato
        return res.status(200).json({ message: "Plato eliminado de la carta" });
    }
    catch (error) {
        //Envia una respuesta del error con el mensaje
        return res.status(500).json({ error: "Error al eliminar el plato" });
    }
};
exports.removeDish = removeDish;
//# sourceMappingURL=dishController.js.map