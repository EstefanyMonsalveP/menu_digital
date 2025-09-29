"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const zod_1 = require("zod");
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[a-zA-Z]/, "Debe al menos una letra")
        .regex(/\d/, "Debe contener al menos un número")
        .regex(/[!@#$%^&*(),.?":{}|<>+-]/, "Debe contener un símbolo"),
    confirmPassword: zod_1.z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // Marca el error en el campo confirmPassword
});
//# sourceMappingURL=resetPassword.schema.js.map