export interface Dish {
  _id?: string; //Id de la base de datos        
  image: string;
  dishName: string;
  description?: string;
  price: number;
  user?: string;        
}
