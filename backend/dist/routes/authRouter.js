"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const emailController_1 = require("../controllers/emailController");
const authRouter = (0, express_1.Router)();
//Ruta para el login 
authRouter.post("/", authController_1.login);
//Ruta para eliminar la cookie
authRouter.post("/logout", authController_1.logout);
//Ruta para enviar correo de recuperracion de contraseña al email.
authRouter.post('/recover-password', emailController_1.recoveryPassoword);
//Ruta para actualizar contraseña.
authRouter.post('/reset-password', authController_1.resetPassword);
//Ruta para confirmar la cuenta del usuario
authRouter.post('/confirm-account', authController_1.confirmAccount);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map