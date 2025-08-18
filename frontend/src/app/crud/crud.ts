import { Component, signal, effect } from '@angular/core';
import { Dish } from '../models/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-crud',
  imports: [],
  templateUrl: './crud.html',
  styleUrl: './crud.css'
})
export class CrudComponent{

  //Lista de los platos
  dishes = signal<Dish[]>([]);
  //Plato que esta siendo creado o eliminado (Null si esta creando uno nuevo)
  editingDish = signal<Dish | null>(null);
  //Datos del formulario
  formDish = signal<Dish>({
    image: '',
    dishName: '',
    description: '',
    price: 0
  });

  //Inyectar el servicio en el constructor.
  constructor(private dishService: DishService) {
    // Al inicializar el componente se cargan los platos
    this.loadDishes();
  }

  //Metodo para cargar todos los platos
  loadDishes() {
    this.dishService.getDishes().subscribe(data => this.dishes.set(data));
  }

  //Rellena el formulario con los datos del plato seleccionado para editar
  selectDish(dish: Dish){
    this.editingDish.set(dish);
    this.formDish.set({...dish});
  }

  //Guarda el plato: Actualiza uno existente o crea uno nuevo
  saveDish(dish:Dish){
    if(this.editingDish()) {
      this.dishService.updateDish(this.editingDish()!._id!, dish).subscribe(() => {
        this.loadDishes();
      });
    } else {
      this.dishService.addDish(dish).subscribe(() => {
        this.loadDishes();
        });
    }
  }

  //Elimina un plato segun el id
  deleteDish(id: string) {
    this.dishService.deleteDish(id).subscribe(() => this.loadDishes());
  }

}
