import {z} from "zod";

//Validacion para crear el usuario
export const userRegisterSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),//El nombre no puede ser vacio
    username: z.string().min(5 , "El usuariod debe contener minimo 5 caracteres"), //El username debe tener minimo 5 caracteres. 
    email: z.email(),
    //La contraseña debe tener minimo 8 caracteres, al menos 1 letra, 1 numero
    //y un simbolo especial
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres") 
    .regex(/[a-zA-Z]/, "Debe contener letras ")
    .regex(/\d/, "Debe contener al menos un número")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener un símbolo")

})