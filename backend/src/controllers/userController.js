"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_1 = require("../models/user");
const userService_1 = require("../services/userService");
const user_schema_1 = require("../schema/user.schema");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailService_1 = require("../services/emailService");
const JWT_SECRET = process.env.JWT_SECRET;
//Función para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        //Se invoca la función para hacer las validaciones de los campos.
        const validatedData = user_schema_1.userRegisterSchema.parse(req.body);
        //Invoca la función para validar el username y email.
        await (0, userService_1.checkUserExists)(validatedData.name, validatedData.email);
        //Despues de la validación, continua con la creación del usuario
        const newUser = new user_1.User(validatedData);
        //Guarda el nuevo usuario en la base de datos.
        await newUser.save();
        //Generar token de confirmación
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, JWT_SECRET, {
            expiresIn: '1h',
        });
        //Enviar email
        await (0, emailService_1.sendConfirmationUserEmail)(newUser.email, token);
        return res.status(201).json({ message: "Usuario creado con exito, por favor revisar su correo y confirmar la cuenta" });
    }
    catch (error) {
        console.log("Error al crear usuario", error);
        //Envia los mensajes de error si provienen de Zod
        if (error instanceof zod_1.ZodError) {
            // Devolver solo los mensajes de error
            const errores = error.issues.map((err) => err.message);
            return res.status(400).json({
                message: "Error en los datos",
                errors: errores,
            });
        }
        //Envia el error si proviene del servicio de creación de usuario
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message,
            });
        }
        //Envia el error con el mensaje si proviene del servidor
        return res.status(500).json({ message: "Error al crear al usuario" });
    }
};
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map