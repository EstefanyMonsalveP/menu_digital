"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = require("./data/db");
const dishRouter_1 = __importDefault(require("./routes/dishRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    credentials: true
}));
//Obtiene el puerto desde la variable de entorno
const PORT = process.env.PORT;
//Si no esta definido el puerto, enviar el error y detener la ejecución.
if (!PORT)
    throw new Error("Se presentaron problemas para inicializar el puerto");
(0, db_1.conexionDB)(); //Se invoca la función para conectar la base de datos.
//Rutas relacionadas con los platos
app.use("/api/dishes", dishRouter_1.default);
//Rutas relacionadas con el usuario
app.use("/api/users", userRouter_1.default);
//Rutas relacionadas con la autenticacion de usuario
app.use("/api/auth", authRouter_1.default);
console.log("Configurando la ruta de autenticacion");
//Inicializa el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
//# sourceMappingURL=index.js.map