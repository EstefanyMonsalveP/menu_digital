import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"});

import Express from "express";
import { conexionDB } from "./data/db";
import dishRouter from "./routes/dishRouter";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = Express();

app.use(Express.json());
app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));


//Obtiene el puerto desde la variable de entorno
const PORT = process.env.PORT;

//Si no esta definido el puerto, enviar el error y detener la ejecución.
if(!PORT)throw new Error("Se presentaron problemas para inicializar el puerto");

conexionDB(); //Se invoca la función para conectar la base de datos.

//Rutas relacionadas con los platos
app.use("/api/dishes", dishRouter)

//Rutas relacionadas con el usuario
app.use("/api/users", userRouter)

//Rutas relacionadas con la autenticacion de usuario
app.use("/api/auth", authRouter)
console.log("Configurando la ruta de autenticacion")

// Servir archivos estáticos del frontend Angular
const angularDistPath = path.join(__dirname, "../../frontend/dist/frontend/browser");
app.use(Express.static(angularDistPath));

// Redirigir cualquier ruta no reconocida al index.html de Angular
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(angularDistPath, "index.html"));
});


//Inicializa el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

