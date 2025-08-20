import { Injectable, signal} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs";

interface LoginResponse{
    token:string;
    userName:string
}

@Injectable({providedIn: 'root'})
export class authService{
    private apiUrl = 'http://localhost:3000/api/auth';

     // Signal que mantiene el nombre del usuario
    currentUserName = signal<string>('');


    constructor(private http: HttpClient){}
    //Metodo para inciar la sesion
    //Llama el servicio para validar las credenciales del usuario
    login(email: string, password:string): Observable<{userName: string}>{
        return this.http.post<{userName: string}>(
            `${this.apiUrl}`,
            { email, password },
            { withCredentials: true }
        ).pipe(
            tap(response => {
                // Guardar el username en el signal
                this.currentUserName.set(response.userName);
            })
        );
    }
    //Metodo para cerrar sesion
    //Llama el servicio para eliminar la cookie de sesion
    logout():  Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
    .pipe(
        tap(() => this.currentUserName.set('')) // limpiar el signal al logout
    );
  }

  //Llama el servicio para enviar correo de recuperacion de email
  sendRecoveryEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recover-password`, { email }, { withCredentials: true });
}


  //Llama el servicio para actualizar la contraseña
    resetPassword(token: string, password: string, confirmPassword: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/reset-password`, 
        { token, password, confirmPassword }, 
        { withCredentials: true }
    );
    }

}