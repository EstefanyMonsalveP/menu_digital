import { User} from "../src/models/user";

//Función para validar si existe el username y email
export const checkUserExists = async (username:string, email:string) => {
    //Busca en la base de datos el username
    const existingUsername = await User.findOne({username});
    //Si encuentra el mismo username devuelve el error
    if(existingUsername)
    throw new Error("El nombre de usuario ya existe");

    //Busca en la base de datos el email 
    const existingEmail = await User.findOne({email});
    //Si encuentra el mismo correo devuelve el error
    if(existingEmail)
    throw new Error("El email ya se encuentra registrado");
}