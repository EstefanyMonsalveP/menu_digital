import Express from "express";
import { conexionDB } from "./data/db";
import dishRouter from "./routes/dishRouter";
import userRouter from "./routes/userRouter";

const app = Express();

app.use(Express.json());

//Obtiene el puerto desde la variable de entorno
const PORT = process.env.PORT;

//Si no esta definido el puerto, enviar el error y detener la ejecución.
if(!PORT)throw new Error("Se presentaron problemas para inicializar el puerto");

conexionDB(); //Se invoca la función para conectar la base de datos.

//Rutas relacionadas con los platos
app.use("/api/dishes", dishRouter)
app.use("/api/users", userRouter)
console.log("Leyendo la ruta dishes")

//Inicializa el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

