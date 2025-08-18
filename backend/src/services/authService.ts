import bcrypt from "bcrypt";
import { User } from "../models/user";

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