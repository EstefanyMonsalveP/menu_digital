import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Dish } from "../models/dish";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DishService {
    private apiUrl = 'http://localhost:3000/api/dishes'

    constructor(private http: HttpClient){}

    //Obtener los platos
    getDishes(): Observable<Dish[]>{
        return this.http.get<Dish[]>(this.apiUrl, {withCredentials:true})
    }

    //Agregar un plato
    addDish(dish: Dish): Observable<Dish[]>{
        return this.http.post<Dish[]>(this.apiUrl, {withCredentials:true})
    }

    //Actualizar un plato
    updateDish(id: string, dish: Dish): Observable<Dish[]>{
        return this.http.put<Dish[]>(`${this.apiUrl}/${id}`, {withCredentials:true})
    }

    //Eliminar un plato
    deleteDish(id: string): Observable<Dish[]>{
        return this.http.delete<Dish[]>(`${this.apiUrl}/${id}`, {withCredentials:true})
    }
}