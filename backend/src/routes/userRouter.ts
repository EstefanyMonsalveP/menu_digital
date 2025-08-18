import { createUser } from "../controllers/userController";
import { Router } from "express";

const userRouter = Router();

//Ruta para crear un nuevo usuario
userRouter.post("/", createUser);

//Ruta para el login

export default userRouter;