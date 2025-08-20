import { Component, signal, effect } from '@angular/core';
import { Dish } from '../models/dish';
import { DishService } from '../services/dish.service';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-crud',
  standalone:true,
  imports: [FormsModule, Navbar],
  templateUrl: './crud.html',
  styleUrl: './crud.css'
})
export class CrudComponent{

   // Lista de platos 
  dishes = signal<Dish[]>([]);
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

  // Cargar platos desde la API
  loadDishes() {
    this.dishService.getDishes().subscribe({
      next: data => this.dishes.set(data), // data ya es un array gracias al map del servicio
      error: err => console.error('Error al cargar platos', err)
    });
  }

  openNewDishForm() {
  this.editingDish.set(null); // asegurarse de no editar otro
  this.formNewDish.set({ image:'', dishName:'', description:'', price:0 });
}

  //Guarda el plato: Actualiza uno existente o crea uno nuevo
  saveDish(dish:Dish){
      this.dishService.addDish(dish).subscribe({
        next: () => {
          this.loadDishes();
          this.formNewDish.set(null);
        },
        error: err => console.error('Error al guardar plato:', err)
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
  this.dishService.updateDish(this.editingDish()!._id!, this.formEditingDish()!).subscribe({
    next: () => {
      this.loadDishes();
      this.editingDish.set(null);
      this.formEditingDish.set(null);
    },
    error: err => console.error('Error al editar plato:', err)
  }
  )
}

  //Elimina un plato segun el id
  deleteDish(id: string) {
    this.dishService.deleteDish(id).subscribe({
      next: ()=>
        this.loadDishes(),
      error: err=> console.error('Error al eliminar el plato', err)
    });
  }
}
