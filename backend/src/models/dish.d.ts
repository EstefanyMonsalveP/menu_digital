import mongoose, { Document } from "mongoose";
export interface IDish extends Document {
    image: String;
    dishName: String;
    description: String;
    price: number;
    user: mongoose.Types.ObjectId;
}
export declare const Dish: mongoose.Model<IDish, {}, {}, {}, mongoose.Document<unknown, {}, IDish, {}, {}> & IDish & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=dish.d.ts.map