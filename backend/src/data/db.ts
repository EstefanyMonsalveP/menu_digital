import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
//Variable de entorno para la conexión de la DB
const MONGO_URI = process.env.MONGO_URI;

//Si no existe la variable de conexión, lanzar el error.
if(!MONGO_URI) throw new Error("La variable de entorno MONGO_URI no esta definida");

//Conexion con la base de datos
export const conexionDB = async (): Promise <void> => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Conexion exitosa");
    }catch (error){
        console.log("Error en la conexion",error);
        process.exit(1); //Cerrar el proceso si se presenta error.
    }
}
