"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmAccount = exports.resetPassword = exports.logout = exports.login = void 0;
const authService_1 = require("../services/authService");
const resetPassword_schema_1 = require("../schema/resetPassword.schema");
const user_1 = require("../models/user");
const tokenUtils_1 = require("../utils/tokenUtils");
//Función para manejar la validacion de las credenciales
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Invoca la función para validar el usuario y contraseña
        const { user, token } = await (0, authService_1.authenticateUser)(email, password);
        // Coloca el token como cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000, // 1 hora (igual que el tiempo del token)
        });
        //Envia la respuesta de la autenticacion exitosa con el token 
        //y datos basicos del usuario
        return res.status(200).json({ message: 'Inicio de sesión exitoso',
            user: {
                id: user._id,
                name: user.name
            } });
    }
    catch (error) {
        //Envia mensaje de error y codigo
        return res.status(400).json({ message: error.message || "Error al iniciar sesion" });
    }
};
exports.login = login;
//Funcion para eliminar el token de la cookie.
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return res.status(200).json({ message: "Sesión cerrada correctamente" });
};
exports.logout = logout;
const resetPassword = async (req, res) => {
    // Validar datos con Zod
    const validation = resetPassword_schema_1.resetPasswordSchema.safeParse(req.body);
    if (!validation.success) {
        // Enviar errores de validación
        return res.status(400).json({ errors: validation.error.format() });
    }
    const { password, confirmPassword, token } = req.body;
    try {
        // Verificar el token JWT
        const decoded = (0, tokenUtils_1.verifyToken)(token);
        // Buscar usuario por id
        const user = await user_1.User.findById(decoded.userId);
        if (!user)
            return res.status(404).json({ message: 'Usuario no encontrado' });
        // Actualizar la contraseña del usuario
        user.password = password;
        await user.save();
        return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    }
    catch (error) {
        console.error("Error al actualizar contraseña:", error);
        return res.status(400).json({ message: 'Token inválido o expirado' });
    }
};
exports.resetPassword = resetPassword;
//Función para confirmar la cuenta del usuario
const confirmAccount = async (req, res) => {
    const { token } = req.body;
    //Si no encuentra el token o no es un string, enviar mensaje de error
    if (!token || typeof token !== 'string') {
        return res.status(400).json({ message: "Token no proporcionado o inválido" });
    }
    try {
        //Verficar el token
        const decoded = (0, tokenUtils_1.verifyToken)(token);
        //Buscar el usuario en la BD
        const user = await user_1.User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        ;
        //Confirmar la cuenta del usuario
        user.isConfirmed = true;
        //Guardar los cambios en la base de datos
        await user.save();
        return res.status(200).json({ message: "Cuenta confirmada correctamente, ya puede iniciar sesión" });
    }
    catch (error) {
        console.log("Error al confirmar la cuenta", error);
        return res.status(400).json({ message: "El token no es valido o ha expirado" });
    }
};
exports.confirmAccount = confirmAccount;
//# sourceMappingURL=authController.js.map