"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserExists = void 0;
const user_1 = require("../models/user");
//Función para validar si existe el username y email
const checkUserExists = async (username, email) => {
    //Busca en la base de datos el username
    const existingUsername = await user_1.User.findOne({ username });
    //Si encuentra el mismo username devuelve el error
    if (existingUsername)
        throw new Error("El nombre de usuario ya existe");
    //Busca en la base de datos el email 
    const existingEmail = await user_1.User.findOne({ email });
    //Si encuentra el mismo correo devuelve el error
    if (existingEmail)
        throw new Error("El email ya se encuentra registrado");
};
exports.checkUserExists = checkUserExists;
//# sourceMappingURL=userService.js.map