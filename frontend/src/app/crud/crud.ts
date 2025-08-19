import { Component, signal, effect } from '@angular/core';
import { Dish } from '../models/dish';
import { DishService } from '../services/dish.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './crud.html',
  styleUrl: './crud.css'
})
export class CrudComponent{

  //Lista de los platos
  dishes = signal<Dish[]>([
     { _id: '1', image: 'https://picsum.photos/200', dishName: 'Pizza', description: 'Pizza con queso', price: 20000 },
    { _id: '2', image: 'https://picsum.photos/200', dishName: 'Hamburguesa', description: 'Con doble carne', price: 18000 }
  ]);

  //Datos del formulario
  formNewDish = signal<Dish| null>(null);
    //Plato que esta siendo editado o eliminado (Null si esta creando uno nuevo)
  editingDish = signal<Dish | null>(null);
  //Formulario que se esta editando
  formEditingDish = signal<Dish| null>(null);

  //Inyectar el servicio en el constructor.
  constructor(private dishService: DishService) {
    // Al inicializar el componente se cargan los platos
    this.loadDishes();
  }

  //Metodo para cargar todos los platos
  loadDishes() {
    this.dishService.getDishes().subscribe(data => this.dishes.set(data));
  }

  openNewDishForm() {
  this.editingDish.set(null); // asegurarse de no editar otro
  this.formNewDish.set({ image:'', dishName:'', description:'', price:0 });
}

  //Guarda el plato: Actualiza uno existente o crea uno nuevo
  saveDish(dish:Dish){
      this.dishService.addDish(dish).subscribe(() => {
        this.loadDishes();
        this.formNewDish.set(null);
      }
  )}

  //Rellena el formulario con los datos del plato seleccionado para editar
  selectDish(dish: Dish){
    this.editingDish.set(dish);
    this.formEditingDish.set({...dish});
  }

  // Actualizar un plato existente
  editDish() {
  if (!this.editingDish()) return;
  this.dishService.updateDish(this.editingDish()!._id!, this.formEditingDish()!).subscribe(() => {
    this.loadDishes();//Refresca los datos
    this.editingDish.set(null); //Sale del modo de edición
    this.formEditingDish.set(null); //Limpia el formulario
  });
}

  //Elimina un plato segun el id
  deleteDish(id: string) {
    this.dishService.deleteDish(id).subscribe(() => this.loadDishes());
  }

}
