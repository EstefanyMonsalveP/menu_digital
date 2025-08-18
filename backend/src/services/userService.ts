import { User} from "../models/user";
import bcrypt from "bcrypt";

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

//Validar si el usuario existe en la base de datos
export const authenticateUser = async (username: string , password:string ) => {
    const user = await User.findOne({username});

    //Si el usuario no existe envia el error
    if(!user) throw new Error("El usuario no existe"); 

    //Compara las contraseñas hasheadas.
    const isValidPassword = await bcrypt.compare(password, user.password);

    //Envia un error si las contraseñas no coinciden.
    if(!isValidPassword) throw new Error("El usuario o la contraseña es incorrecta");

    return user;
    
}