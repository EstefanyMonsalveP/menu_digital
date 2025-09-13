import { Router } from "express";
import { login ,logout, resetPassword, confirmAccount} from "../controllers/authController";
import { recoveryPassoword } from "../controllers/emailController";

const authRouter = Router();

//Ruta para el login 
authRouter.post("/", login);

//Ruta para eliminar la cookie
authRouter.post("/logout", logout);

//Ruta para enviar correo de recuperracion de contraseña al email.
authRouter.post('/recover-password', recoveryPassoword);

//Ruta para actualizar contraseña.
authRouter.post('/reset-password', resetPassword);

//Ruta para confirmar la cuenta del usuario
authRouter.post('/confirm-account', confirmAccount);

export default authRouter;