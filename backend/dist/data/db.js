"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conexionDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
//Variable de entorno para la conexión de la DB
const MONGO_URI = process.env.MONGO_URI;
//Si no existe la variable de conexión, lanzar el error.
if (!MONGO_URI)
    throw new Error("La variable de entorno MONGO_URI no esta definida");
//Conexion con la base de datos
const conexionDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("Conexion exitosa");
    }
    catch (error) {
        console.log("Error en la conexion", error);
        process.exit(1); //Cerrar el proceso si se presenta error.
    }
};
exports.conexionDB = conexionDB;
//# sourceMappingURL=db.js.map