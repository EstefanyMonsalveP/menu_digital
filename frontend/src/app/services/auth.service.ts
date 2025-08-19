import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface LoginResponse{
    token:string;
    userName:string
}

@Injectable({providedIn: 'root'})
export class authService{
    private apiUrl = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient){}
    //Metodo para inciar la sesion
    //Llama el servicio para validar las credenciales del usuario
    login(email: string, password:string): Observable<{userName: string}>{
        return this.http.post<{userName: string}>(
            `${this.apiUrl}/login`,
            { email, password },
            { withCredentials: true }
        );
    }
    //Metodo para cerrar sesion
    //Llama el servicio para eliminar la cookie de sesion
    logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

}