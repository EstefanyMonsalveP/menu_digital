import { Router } from "express";
import { createDish} from "../Controller/dishController";

const dishRouter = Router();

//Ruta para crear el plato
dishRouter.post("/", createDish);

export default dishRouter;