import { Router } from "express";
import { login ,logout} from "../controllers/authController";
import { recoveryPassoword } from "../controllers/emailController";

const authRouter = Router();

//Ruta para el login 
authRouter.post("/", login);

//Ruta para eliminar la cookie
authRouter.post("/logout", logout);

//Ruta para enviar correo de recuperracion de contraseña al email.
authRouter.post('/recover-password', recoveryPassoword);

export default authRouter;