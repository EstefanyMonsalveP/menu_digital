import { Router } from "express";
import { createDish, getUserDishes,updateDish, removeDish} from "../controllers/dishController";
import { authMiddleware } from "../middleware/authMiddleware";

const dishRouter = Router();

//Ruta para crear el plato
dishRouter.post("/", authMiddleware, createDish);

//Ruta para obtener todos los platos de la base de datos
dishRouter.get("/", authMiddleware, getUserDishes )

//Ruta para actualizar un plato
dishRouter.put("/:id", authMiddleware, updateDish )

//Ruta para eliminar el plato 
dishRouter.delete("/:id", authMiddleware, removeDish )

export default dishRouter;