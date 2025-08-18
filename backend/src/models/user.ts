import mongoose, {Schema,Document} from "mongoose";
import bcrypt from "bcrypt";

//Define la interfaz para un usuario
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise <boolean>;
}

//Esquema para la colección de usuarios
const userSchema : Schema<IUser>  = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

//Middleware para hashear la contraseña antes de insertarla
userSchema.pre("save", async function (next){
    if(!this.isModified("password"))return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

//Metodo para comparar la contraseña en el Login
userSchema.methods.comparePassword = async function(
    password: string
): Promise <boolean> {
    return bcrypt.compare(password, this.password)
};

export const User = mongoose.model<IUser>("User", userSchema);