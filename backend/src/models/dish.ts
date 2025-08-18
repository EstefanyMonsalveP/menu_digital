import mongoose, {Schema, Document} from "mongoose";

//Interfaz para el plato
export interface IDish extends Document{
    image: String;
    dishName: String;
    description:String;
    price:number;
    user: mongoose.Types.ObjectId; //Asociar los datos a cada usuario
}

//Esquema para la colección del plato
const dishSchema : Schema<IDish> = new Schema({
    image: {type: String, required:true},
    dishName: {type:String, required:true},
    description: {type:String},
    price:{ type:Number, required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export const Dish = mongoose.model<IDish>( "Dish", dishSchema);