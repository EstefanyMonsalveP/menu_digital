import { Router } from "express";
import { login ,logout} from "../controllers/authController";

const authRouter = Router();

//Ruta para el login 
authRouter.post("/", login);

//Ruta para eliminar la cookie
authRouter.post("/logut", logout);

export default authRouter;