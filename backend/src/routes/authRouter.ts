import { Router } from "express";
import { login} from "../controllers/authController";

const authRouter = Router();

//Ruta para el login 
authRouter.post("/", login);