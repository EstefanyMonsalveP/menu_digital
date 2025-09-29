"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const tokenUtils_1 = require("../utils/tokenUtils");
//Validar si el usuario existe en la base de datos
const authenticateUser = async (email, password) => {
    const user = await user_1.User.findOne({ email });
    //Si el usuario no existe envia el error
    if (!user)
        throw new Error("El usuario no existe");
    //Compara las contraseñas hasheadas.
    const isValidPassword = await bcrypt_1.default.compare(password, user.password);
    //Envia un error si las contraseñas no coinciden.
    if (!isValidPassword)
        throw new Error("El usuario o la contraseña es incorrecta");
    //Validar si el usuario está confirmado
    if (!user.isConfirmed) {
        throw new Error("Por favor, confirme su cuenta antes de iniciar sesión");
    }
    const token = await (0, tokenUtils_1.generateToken)({ id: user.id, username: user.name, });
    return { user, token };
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authService.js.map