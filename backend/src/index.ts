import Express from "express";
import { conexionDB } from "./data/db";

const app = Express();
//Obtiene el puerto desde la variable de entorno
const PORT = process.env.PORT;

//Si no esta definido el puerto, enviar el error y detener la ejecución.
if(!PORT)throw new Error("Se presentaron problemas para inicializar el puerto");

conexionDB(); //Se invoca la función para conectar la base de datos.

//Inicializa el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

