import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; 
const JWT_EXPIRES_IN = '1h';

if(!JWT_SECRET) throw new Error("La variable JWT no esta definida");

//Funcion para generar un nuevo token con tiempo de expieracion
export const generateToken = async(payload: object) =>{
    return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
};

//Función para verificar el token
export const verifyToken = (token:string) => {
    return jwt.verify(token, JWT_SECRET)
}