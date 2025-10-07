import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Dish } from "../models/dish";
import { Observable,map } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class DishService {
    readonly apiUrl = `${environment.apiUrl}/dishes`;
    constructor(private http: HttpClient){}

    //Obtener los platos
     getDishes(): Observable<Dish[]> {
    return this.http.get<{ data: Dish[] }>(`${environment.apiUrl}/dishes`, { withCredentials: true })
      .pipe(map(res => res.data)); // extrae directamente el array de platos
  }

    //Agregar un plato
    addDish(dish: Dish): Observable<Dish[]>{
        return this.http.post<Dish[]>(`${environment.apiUrl}/dishes`,dish, {withCredentials:true})
    }

    //Actualizar un plato
    updateDish(id: string, dish: Dish): Observable<Dish[]>{
        return this.http.put<Dish[]>(`${environment.apiUrl}/dishes/${id}`,dish, {withCredentials:true})
    }

    //Eliminar un plato
    deleteDish(id: string): Observable<Dish[]>{
        return this.http.delete<Dish[]>(`${environment.apiUrl}/dishes/${id}`, {withCredentials:true})
    }
}