import { Router } from "express";
import { createDish, getAllDishes,updateDish, removeDish} from "../controllers/dishController";

const dishRouter = Router();

//Ruta para crear el plato
dishRouter.post("/", createDish);

//Ruta para obtener todos los platos de la base de datos
dishRouter.get("/", getAllDishes )

//Ruta para actualizar un plato
dishRouter.put("/:id", updateDish )

//Ruta para eliminar el plato 
dishRouter.delete("/:id", removeDish )

export default dishRouter;