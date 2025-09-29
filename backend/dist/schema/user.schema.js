"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterSchema = void 0;
const zod_1 = require("zod");
//Validacion para crear el usuario
exports.userRegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "El nombre es obligatorio"), //El nombre no puede ser vacio
    email: zod_1.z.email(),
    //La contraseña debe tener minimo 8 caracteres, al menos 1 letra, 1 numero
    //y un simbolo especial
    password: zod_1.z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[a-zA-Z]/, "Debe contener letras ")
        .regex(/\d/, "Debe contener al menos un número")
        .regex(/[!@#$%^&*(),.?":{}|<>+-]/, "Debe contener un símbolo")
});
//# sourceMappingURL=user.schema.js.map